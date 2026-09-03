# Wellington Luiz — Portfólio

Portfólio profissional de Wellington Luiz, desenvolvedor de software. Site estático em HTML/CSS/JS puro, com identidade visual inspirada em souls-like (Mortal Shell) tratada de forma limpa e profissional: fundo escuro, névoa e brasas sutis, tipografia serifada para títulos e monoespaçada para rótulos, tudo em tons de ciano.

🔗 **Site no ar:** https://wellingtonpereiraluiz.github.io/portfolio/

## Recursos

- **Navegação híbrida**: scroll contínuo com navbar fixa que acompanha a seção ativa (scrollspy)
- **PT / EN**: alternância de idioma no header, com preferência salva no navegador
- **Seções**: Sobre (bio, arsenal técnico, rota de ascensão), Carreira (linha do tempo), Projetos (grid com modal de detalhes) e Certificações (acordeão fluido)
- **Animações**: elementos revelam-se suavemente ao rolar a página, com névoa que "pulsa" a cada troca de seção
- **Painel administrativo oculto** (`/#forge`): rota secreta protegida por senha para editar todo o conteúdo do site sem tocar em código

## Estrutura

```
index.html          shell da página
css/style.css        todo o estilo visual
js/app.js             dados do portfólio (PORTFOLIO_DATA), renderização e interações
assets/img/           imagens de apoio (logo etc.)
```

Não há build step — é HTML/CSS/JS servido diretamente.

## Como editar o conteúdo

Duas formas:

1. **Direto no código**: edite o objeto `PORTFOLIO_DATA` no topo de `js/app.js` (nome, bio, stack, roadmap, projetos, certificações, carreira — cada texto aceita `{ pt, en }` para os dois idiomas).
2. **Pela Forja** (`seusite/#forge`, senha padrão `vigilante` — troque assim que possível): um painel visual para editar os mesmos dados. As alterações feitas ali ficam salvas no `localStorage` do navegador que você estiver usando para pré-visualizar; use o botão **COPIAR PORTFOLIO_DATA** para gerar o bloco atualizado e colar de volta em `js/app.js`, depois faça commit normalmente. Não é um backend — é um editor/preview local.

## Rodando localmente

Qualquer servidor estático funciona, por exemplo:

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Deploy

Publicado via GitHub Pages a partir da branch `main`.
