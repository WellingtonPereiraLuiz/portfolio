-- ════════════════════════════════════════════════════════════════════════
-- Portfólio — schema do Supabase
--
-- Rode este arquivo inteiro no SQL Editor do Supabase (uma vez), DEPOIS de
-- trocar o UUID em is_portfolio_owner() pelo id do seu usuário
-- (Authentication → Users → clique no usuário → "User UID").
--
--   portfolio_content  uma única linha (id = 1) com todo o conteúdo do site
--                      em "data" (mesmo formato do PORTFOLIO_DATA do app.js)
--   portfolio_history  cópia automática de cada versão anterior, para
--                      desfazer um salvamento errado (guarda as 50 últimas)
--
-- Quem pode o quê (RLS):
--   visitante (anon)   lê portfolio_content
--   você (dono)        lê portfolio_content, altera "data" e lê o histórico
--   ninguém pela API   cria ou apaga linhas (só pelo SQL Editor)
-- ════════════════════════════════════════════════════════════════════════

-- ── quem é o dono ───────────────────────────────────────────────────────
-- Troque o UUID abaixo pelo "User UID" do seu usuário.
create or replace function public.is_portfolio_owner()
returns boolean
language sql
stable
as $$
  select auth.uid() = '00000000-0000-0000-0000-000000000000'::uuid
$$;

-- ── conteúdo ────────────────────────────────────────────────────────────
create table public.portfolio_content (
  id         int primary key default 1 check (id = 1),
  data       jsonb not null check (
               jsonb_typeof(data) = 'object'
               and jsonb_typeof(data -> 'personal') = 'object'
               and jsonb_typeof(data -> 'techStack') = 'array'
               and jsonb_typeof(data -> 'roadmap') = 'array'
               and jsonb_typeof(data -> 'projects') = 'array'
               and jsonb_typeof(data -> 'certifications') = 'array'
               and jsonb_typeof(data -> 'career') = 'array'
             ),
  updated_at timestamptz not null default now()
);

-- ── histórico ───────────────────────────────────────────────────────────
create table public.portfolio_history (
  id       bigint generated always as identity primary key,
  data     jsonb not null,
  saved_at timestamptz not null  -- quando essa versão tinha sido salva
);

-- Antes de cada alteração: guarda a versão atual no histórico, atualiza
-- updated_at e mantém só as 50 versões mais recentes. "security definer"
-- deixa o trigger gravar no histórico mesmo sem política de INSERT nele.
create or replace function public.portfolio_content_before_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.data is distinct from old.data then
    insert into public.portfolio_history (data, saved_at) values (old.data, old.updated_at);
    delete from public.portfolio_history
      where id not in (select id from public.portfolio_history order by id desc limit 50);
  end if;
  new.updated_at := now();
  return new;
end
$$;

revoke execute on function public.portfolio_content_before_update() from public, anon, authenticated;

create trigger portfolio_content_history
  before update on public.portfolio_content
  for each row execute function public.portfolio_content_before_update();

-- ── permissões ──────────────────────────────────────────────────────────
-- O Supabase dá acesso total a tabelas novas por padrão; aqui liberamos só
-- o necessário e o RLS abaixo decide quais linhas.
revoke all on public.portfolio_content, public.portfolio_history from anon, authenticated;
grant select on public.portfolio_content to anon, authenticated;
grant update (data) on public.portfolio_content to authenticated;
grant select on public.portfolio_history to authenticated;

alter table public.portfolio_content enable row level security;
alter table public.portfolio_history enable row level security;

create policy "conteudo: leitura publica"
  on public.portfolio_content for select
  to anon, authenticated
  using (true);

create policy "conteudo: so o dono altera"
  on public.portfolio_content for update
  to authenticated
  using (public.is_portfolio_owner())
  with check (public.is_portfolio_owner());

create policy "historico: so o dono le"
  on public.portfolio_history for select
  to authenticated
  using (public.is_portfolio_owner());
