-- Registra no banco as duas decisões que o verificador de segurança do Supabase aponta como aviso.
comment on table public.admins is
  'Lista de administradores. RLS ativo SEM políticas de propósito: nenhum acesso pela API; usada só por private.is_admin().';
comment on function public.admin_listar_contatos() is
  'Painel do dono: retorna SOMENTE nome, e-mail, status e data. SECURITY DEFINER de propósito; bloqueia quem não é admin (errcode 42501).';
