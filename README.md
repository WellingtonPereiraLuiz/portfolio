# Wellington Luiz — Portfólio

Portfólio profissional de Wellington Luiz, desenvolvedor de software. Site estático em HTML/CSS/JS puro, com identidade visual inspirada em souls-like (Mortal Shell) tratada de forma limpa e profissional: fundo escuro, névoa e brasas sutis, tipografia serifada para títulos e monoespaçada para rótulos, tudo em tons de ciano.

🔗 **Site no ar:** https://wellingtonpereiraluiz.github.io/portfolio/

## Recursos

- **Navegação híbrida**: scroll contínuo com navbar fixa que acompanha a seção ativa (scrollspy)
- **PT / EN**: alternância de idioma no header, com preferência salva no navegador
- **Seções**: Sobre (bio, arsenal técnico, rota de ascensão), Carreira (linha do tempo), Projetos (grid com modal de detalhes) e Certificações (acordeão fluido)
- **Animações**: elementos revelam-se suavemente ao rolar a página, com névoa que "pulsa" a cada troca de seção
- **Painel** (`/admin.html`): página com login para editar todo o conteúdo do site sem tocar em código; as mudanças aparecem na hora para todos os visitantes

## Estrutura

```
index.html          site público
admin.html          painel (login + formulários)
css/style.css       estilo do site
css/admin.css       estilo do painel
js/app.js           site público: PORTFOLIO_DATA (reserva), renderização e interações
js/supabase.js      URL e chave pública do Supabase + chamadas à API (site e painel)
js/validate.js      checagem do formato dos dados (site e painel)
js/auth.js          login do painel (Supabase Auth)
js/admin.js         painel: formulários, validação, salvar, histórico
supabase/schema.sql tabelas, histórico e políticas de acesso (RLS)
supabase/seed.sql   conteúdo inicial (o PORTFOLIO_DATA atual)
assets/             favicon e imagem de prévia para links (og-image.jpg)
```

Não há build step — é HTML/CSS/JS servido diretamente. Quem visita o site não baixa nada do painel (`admin.html`, `css/admin.css`, `js/auth.js` e `js/admin.js` só carregam no painel).

## Como editar o conteúdo

Pelo **Painel**: https://wellingtonpereiraluiz.github.io/portfolio/admin.html

Entre com o seu e-mail e senha do Supabase. Há um formulário para os dados pessoais e para cada seção (arsenal técnico, rota de ascensão, carreira, projetos e certificações), com os campos em português e inglês lado a lado. Dá para adicionar, remover e reordenar itens (↑ ↓). Nada muda no site até você clicar em **SALVAR**; antes de salvar, o painel confere os campos obrigatórios, os links e o e-mail, e lista o que precisa ser corrigido.

- **Histórico**: cada salvamento guarda a versão anterior (até 50). Em "Histórico", **CARREGAR ESTA VERSÃO** traz uma versão antiga para o formulário; ela só vai para o site se você salvar.
- **Campos em inglês** são opcionais: se ficarem vazios, o site mostra o texto em português.

### De onde o site lê o conteúdo

O site busca o conteúdo no Supabase ao abrir. Se o Supabase não estiver configurado, estiver fora do ar, demorar mais de 4 segundos ou devolver dados em formato errado, o site usa o `PORTFOLIO_DATA` de `js/app.js` como reserva. Por isso vale mantê-lo atualizado de vez em quando: no painel, **COPIAR PORTFOLIO_DATA** copia a versão publicada pronta para colar no lugar do `PORTFOLIO_DATA` em `js/app.js`.

## Painel e Supabase: configuração (uma vez)

1. **Crie um projeto** em https://supabase.com/dashboard (New project). Use um projeto só para o portfólio, separado do site da Anne.
2. **Crie o seu usuário**: *Authentication → Users → Add user → Create new user*. Informe e-mail e senha e marque **Auto Confirm User**. Depois clique no usuário e copie o **User UID**.
3. **Feche o cadastro público**: *Authentication → Sign In / Providers* → desligue **Allow new users to sign up**. (As políticas já só deixam o seu usuário alterar o conteúdo; isto é uma camada extra.)
4. **Crie as tabelas**: *SQL Editor → New query*, cole o conteúdo de `supabase/schema.sql`, troque o UUID `00000000-0000-0000-0000-000000000000` pelo seu **User UID** e clique em **Run**.
5. **Popule o banco**: em outra query, cole `supabase/seed.sql` e clique em **Run**.
6. **Conecte o site**: em *Project Settings*, copie a **Project URL** (em *Data API*) e a **publishable key** (em *API Keys*; nos projetos antigos, a chave `anon`). Cole as duas em `js/supabase.js`, em `SUPABASE_URL` e `SUPABASE_ANON_KEY`.
7. Faça commit e push. Abra `.../portfolio/admin.html` e entre.

**Sobre as chaves:** a URL e a chave pública podem ficar no código, porque só enxergam o que as políticas de RLS liberam (ler o conteúdo). A **secret key / service_role** dá acesso total ao banco: nunca coloque em nenhum arquivo do site.

**Projetos gratuitos** do Supabase podem ser pausados depois de uma semana sem atividade. Enquanto estiver pausado, o site continua no ar usando a reserva do `js/app.js`; para voltar, clique em *Restore project* no dashboard.

## Rodando localmente

Qualquer servidor estático funciona, por exemplo:

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Deploy

Publicado via GitHub Pages a partir da branch `main`.
