-- Catálogo de aulas e progresso dos alunos.
-- IMPORTANTE: o CONTEÚDO das aulas pagas fica SÓ no banco, nunca neste repositório (que é público).

create table public.modules (
  id smallint generated always as identity primary key,
  slug text not null unique check (slug ~ '^[a-z0-9-]{2,80}$'),
  title text not null,
  description text not null default '',
  position smallint not null,
  published boolean not null default false
);

create table public.lessons (
  id integer generated always as identity primary key,
  module_id smallint not null references public.modules (id) on delete cascade,
  slug text not null unique check (slug ~ '^[a-z0-9-]{2,80}$'),
  title text not null,
  summary text not null default '',
  position smallint not null,
  duration_min smallint,
  is_free boolean not null default false,
  published boolean not null default false
);
create index lessons_module_id_idx on public.lessons (module_id);

-- Conteúdo separado do catálogo: o título aparece para todos, o conteúdo só para quem tem acesso.
create table public.lesson_contents (
  lesson_id integer primary key references public.lessons (id) on delete cascade,
  content_md text not null,
  video_url text check (video_url is null or video_url ~ '^https://')
);

create table public.lesson_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_id integer not null references public.lessons (id) on delete cascade,
  completed_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);
create index lesson_progress_lesson_id_idx on public.lesson_progress (lesson_id);

alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.lesson_contents enable row level security;
alter table public.lesson_progress enable row level security;

create policy "alunos veem módulos publicados" on public.modules
  for select to authenticated using (published);

create policy "alunos veem o catálogo de aulas publicadas" on public.lessons
  for select to authenticated using (published);

-- Conteúdo: aula gratuita OU assinatura ativa do próprio aluno.
create policy "conteúdo liberado: grátis ou assinatura ativa" on public.lesson_contents
  for select to authenticated using (
    exists (
      select 1 from public.lessons l
      where l.id = lesson_contents.lesson_id
        and l.published
        and (
          l.is_free
          or exists (
            select 1 from public.subscriptions s
            where s.user_id = (select auth.uid()) and s.status = 'ativa'
          )
        )
    )
  );

create policy "aluno vê o próprio progresso" on public.lesson_progress
  for select to authenticated using ((select auth.uid()) = user_id);

-- Só marca como concluída uma aula que o aluno consegue acessar (a RLS do conteúdo vale dentro da checagem).
create policy "aluno marca aulas que pode acessar" on public.lesson_progress
  for insert to authenticated with check (
    (select auth.uid()) = user_id
    and exists (select 1 from public.lesson_contents c where c.lesson_id = lesson_progress.lesson_id)
  );

create policy "aluno desmarca o próprio progresso" on public.lesson_progress
  for delete to authenticated using ((select auth.uid()) = user_id);

revoke all on public.modules, public.lessons, public.lesson_contents, public.lesson_progress from anon, authenticated;
grant select on public.modules, public.lessons, public.lesson_contents to authenticated;
grant select, insert, delete on public.lesson_progress to authenticated;
