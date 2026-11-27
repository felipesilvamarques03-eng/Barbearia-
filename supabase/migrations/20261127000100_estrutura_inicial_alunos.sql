-- =====================================================================
-- NEXORA: estrutura inicial de alunos e assinaturas
-- Aplicada no projeto Supabase "nexora" (sa-east-1, São Paulo).
--
-- Princípio: guardar o MÍNIMO.
--  * Senhas ficam no Supabase Auth como hash bcrypt (irreversível).
--  * CPF, telefone, endereço e cartão NUNCA entram neste banco: ficam no Mercado Pago.
--  * Cada aluno só lê a própria linha (RLS). O dono só vê contato via admin_listar_contatos().
-- =====================================================================

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create type public.subscription_status as enum ('pendente', 'ativa', 'pausada', 'cancelada', 'inadimplente');

-- Perfil: somente dados de contato.
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  nome text not null check (char_length(nome) between 2 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table public.profiles is
  'Somente contato (nome). E-mail e senha ficam no Supabase Auth. NÃO adicionar CPF, telefone, endereço ou dados de pagamento.';

-- Assinatura: só status e referência do Mercado Pago. Escrita apenas pelo servidor (webhook).
create table public.subscriptions (
  user_id uuid primary key references auth.users (id) on delete cascade,
  status public.subscription_status not null default 'pendente',
  mp_preapproval_id text unique,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table public.subscriptions is
  'Status da assinatura. Dados de pagamento ficam no Mercado Pago; aqui só o ID da assinatura (preapproval).';

-- Administradores da NEXORA.
create table public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

-- RLS: cada aluno só enxerga a própria linha. Admin NÃO lê as tabelas.
alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.admins enable row level security;

create policy "aluno lê o próprio perfil" on public.profiles
  for select to authenticated using ((select auth.uid()) = id);

create policy "aluno atualiza o próprio perfil" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy "aluno lê a própria assinatura" on public.subscriptions
  for select to authenticated using ((select auth.uid()) = user_id);

-- Permissões mínimas: anônimos não acessam nada; alunos só leem e só alteram o nome.
revoke all on public.profiles, public.subscriptions, public.admins from anon, authenticated;
grant select on public.profiles to authenticated;
grant update (nome) on public.profiles to authenticated;
grant select on public.subscriptions to authenticated;

-- Funções internas (schema private, não exposto pela API)
create function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins a where a.user_id = (select auth.uid()));
$$;

create function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- Cria perfil e assinatura "pendente" quando alguém se cadastra.
create function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_nome text := left(trim(coalesce(new.raw_user_meta_data ->> 'nome', '')), 100);
begin
  if char_length(v_nome) < 2 then
    v_nome := 'Aluno';
  end if;
  insert into public.profiles (id, nome) values (new.id, v_nome);
  insert into public.subscriptions (user_id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function private.handle_new_user();

create trigger profiles_updated_at before update on public.profiles
  for each row execute function private.set_updated_at();
create trigger subscriptions_updated_at before update on public.subscriptions
  for each row execute function private.set_updated_at();

revoke all on all functions in schema private from public, anon, authenticated;

-- Painel do dono: SOMENTE contato e status. Nenhum outro dado pessoal.
create function public.admin_listar_contatos()
returns table (nome text, email text, status public.subscription_status, inscrito_em timestamptz)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not private.is_admin() then
    raise exception 'Acesso negado' using errcode = '42501';
  end if;
  return query
    select p.nome, u.email::text, coalesce(s.status, 'pendente'::public.subscription_status), p.created_at
    from public.profiles p
    join auth.users u on u.id = p.id
    left join public.subscriptions s on s.user_id = p.id
    order by p.created_at desc;
end;
$$;

revoke all on function public.admin_listar_contatos() from public, anon;
grant execute on function public.admin_listar_contatos() to authenticated;
