(function () {
  'use strict';

  // ────────────────────────────────────────────────────────────────────────
  // Config
  // ────────────────────────────────────────────────────────────────────────
  const DEFAULT_LANG = 'pt';
  const CONTENT_TIMEOUT_MS = 4000;

  // ────────────────────────────────────────────────────────────────────────
  // Data (fallback: the live content comes from Supabase, edited in admin.html)
  // ────────────────────────────────────────────────────────────────────────
  const PORTFOLIO_DATA = {
    personal: {
      name: 'Wellington Luiz',
      title: { pt: 'Desenvolvedor de Software', en: 'Software Developer' },
      bio: {
        pt: 'Olá! Sou o Wellington, tenho 21 anos, sou desenvolvedor na ILYSYN Systems e estudante de Análise e Desenvolvimento de Sistemas (ADS) no IFRO. No trabalho, crio sites para clientes e cuido de documentação e apresentações. Fora dele, estudo engenharia de software e construo side projects para aplicar conceitos e testar novas tecnologias, usando IA de forma estratégica para acelerar o aprendizado e o meu fluxo de desenvolvimento. Sou movido por disciplina diária e evolução contínua, buscando dominar clean code e lógica de programação para alcançar meu maior objetivo: atuar no setor aeroespacial.',
        en: "Hi! I'm Wellington, 21, a developer at ILYSYN Systems and a Systems Analysis and Development student at IFRO. At work I build websites for clients and handle documentation and presentations. Outside work I study software engineering and build side projects to apply concepts and test new technologies, using AI strategically to speed up learning and my workflow. Driven by daily discipline and continuous growth, I'm working to master clean code and programming logic toward my long-term goal: the aerospace industry.",
      },
      education: { pt: 'Análise e Desenvolvimento de Sistemas — IFRO Ariquemes', en: 'Systems Analysis and Development — IFRO Ariquemes' },
      languages: { pt: 'Português (nativo) · Inglês (iniciante)', en: 'Portuguese (native) · English (beginner)' },
      location: 'Ariquemes — RO, Brasil',
      github: 'https://github.com/WellingtonPereiraLuiz',
      email: 'wellingtonpereiraluiz89@gmail.com',
      quote: { pt: '"A evolução é o único caminho no vazio."', en: '"Evolution is the only path through the void."' },
    },
    techStack: [
      { category: { pt: 'Núcleo', en: 'Core' }, items: ['Flutter', 'Dart', 'Python'] },
      { category: { pt: 'Ambientes', en: 'Environments' }, items: ['VS Code', 'Android Studio'] },
      { category: { pt: 'IA & Automação', en: 'AI & Automation' }, items: ['Gemini Pro', 'Antigravity CLI', 'Base44'] },
      { category: { pt: 'Arquitetura & Design', en: 'Architecture & Design' }, items: ['MVC', 'MVVM', 'Git', 'Tailwind CSS'] },
    ],
    roadmap: [
      { title: { pt: 'Sistemas & Baixo Nível', en: 'Systems & Low Level' }, desc: { pt: 'Domínio de Python para projetos autônomos; especialização em Rust, Ruby, Redes e Linux.', en: 'Python mastery for autonomous projects; specialization in Rust, Ruby, Networks and Linux.' } },
      { title: { pt: 'Hardware & Automação', en: 'Hardware & Automation' }, desc: { pt: 'Integração e desenvolvimento com Robótica básica e Arduino.', en: 'Integration and development with basic Robotics and Arduino.' } },
      { title: { pt: 'Carreira Internacional', en: 'International Career' }, desc: { pt: 'Fluência em inglês com foco no mercado do Canadá ou Finlândia.', en: 'English fluency targeting the Canadian or Finnish tech market.' } },
    ],
    projects: [
      {
        id: 3, title: 'CustoDoce', badge: { pt: '1º LUGAR — HACKATHON IFRO', en: '1ST PLACE — IFRO HACKATHON' },
        tags: ['Flutter', 'Dart', 'Firebase', 'Riverpod', 'SQLite'],
        shortDesc: { pt: 'Calculadora de custos definitiva para confeiteiros e padeiros artesanais.', en: 'The definitive cost calculator for artisanal bakers and confectioners.' },
        longDesc: { pt: 'Aplicativo multiplataforma (Android e Web) que resolve a precificação artesanal de ponta a ponta: cadastro de ingredientes, receitas inteligentes com cálculo em tempo real, gestão de custos invisíveis e assistente de IA integrado (Google Gemini). 1º Lugar na categoria "Desafio Livre de Impacto Regional" na Hackathon Extensionista IFRO Ariquemes 2026/1.', en: 'Cross-platform app (Android and Web) that solves artisanal pricing end to end: ingredient registry, smart recipes with real-time cost calculation, hidden-cost management and an integrated AI assistant (Google Gemini). 1st place in the "Regional Impact Open Challenge" at the IFRO Ariquemes Extension Hackathon 2026/1.' },
        links: [{ label: 'Live MVP', url: 'https://custodoce-b07ce.web.app' }, { label: 'GitHub', url: 'https://github.com/WellingtonPereiraLuiz/CustoDoce' }],
      },
      {
        id: 7, title: 'TRIRREME', badge: { pt: 'PROJETO DE FACULDADE', en: 'COLLEGE PROJECT' },
        tags: ['Web', 'APIs', 'Open source', 'Vercel'],
        shortDesc: { pt: 'Empresa de software criada por três colegas de ADS como projeto de faculdade. Hoje é nosso espaço para jogos, APIs e projetos open source.', en: 'A software company three Systems Analysis classmates started as a college project. Today it is our space for games, APIs and open-source projects.' },
        longDesc: { pt: 'A TRIRREME nasceu como projeto de faculdade: um grupo de três colegas de ADS do IFRO montou uma empresa de desenvolvimento de software com o objetivo de gerar renda, oferecendo sistemas sob medida, sites e automações. Concluímos a tarefa da faculdade em menos de quatro meses e encerramos as atividades comerciais. Hoje a TRIRREME segue como hobby: quando temos tempo, usamos o nome para criar jogos, APIs e projetos open source.', en: 'TRIRREME started as a college project: three Systems Analysis classmates at IFRO set up a software development company to earn income, offering custom systems, websites and automation. We finished the college assignment in under four months and then closed the commercial side. Today TRIRREME lives on as a hobby: when we have time, we use the name to build games, APIs and open-source projects.' },
        links: [{ label: 'Site', url: 'https://trirreme.com/' }],
      },
      {
        id: 1, title: 'Nossos Kitutes', badge: '',
        tags: ['React', 'TypeScript', 'Tailwind CSS', 'React Query', 'Base44'],
        shortDesc: { pt: 'Plataforma de venda de quitutes artesanais integrada ao WhatsApp, com catálogo interativo e painel administrativo.', en: 'Artisanal treats storefront integrated with WhatsApp, featuring an interactive catalog and admin panel.' },
        longDesc: { pt: 'Vitrine digital elegante com experiência de compra fluida: landing page que comunica os valores da marca (Rafa & Well), cardápio interativo segmentado por categorias com controle de estoque e carrinho flutuante persistente. Ao finalizar a compra, o pedido é formatado automaticamente e enviado via WhatsApp. Um painel administrativo integrado ao Base44 permite gerenciar catálogo, preços e disponibilidade em tempo real.', en: 'An elegant digital storefront with a fluid shopping experience: an engaging landing page, an interactive menu segmented by category with stock control and a persistent floating cart. On checkout, the order is formatted automatically and sent via WhatsApp. A Base44-integrated admin panel manages catalog, prices and availability in real time.' },
        links: [{ label: 'Live Demo', url: 'https://kitutes-artesanais-delivery.base44.app' }],
      },
      {
        id: 2, title: 'Doni Assados Delivery', badge: '',
        tags: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Base44'],
        shortDesc: { pt: 'Plataforma de delivery para assados desenvolvida com React e Vite sobre a infraestrutura Base44.', en: 'Roasted-food delivery platform built with React and Vite on the Base44 infrastructure.' },
        longDesc: { pt: 'Aplicação moderna de entrega de assados integrada à plataforma Base44, projetada para execução local eficiente com Vite e sincronização contínua com o Base44 Builder. Suporte a variáveis de ambiente centralizadas para App ID e URL da API, garantindo flexibilidade, deploy contínuo via GitHub e uma experiência de compra robusta e ágil.', en: 'A modern roasted-food delivery app integrated with Base44, designed for efficient local development with Vite and continuous sync with the Base44 Builder. Centralized environment variables for App ID and API URL enable flexible continuous deployment via GitHub and a robust, fast shopping experience.' },
        links: [{ label: 'Live Demo', url: 'https://doni-assados-delivery.base44.app' }],
      },
      {
        id: 4, title: 'Anne Ilustradora', badge: '',
        tags: ['HTML5', 'CSS3', 'JavaScript', 'Supabase', 'Vercel'],
        shortDesc: { pt: 'Site de portfólio e encomendas para uma ilustradora, com calculadora de orçamento, página da webcomic e painel administrativo.', en: 'Portfolio and commissions site for an illustrator, with a quote calculator, a webcomic page and an admin panel.' },
        longDesc: { pt: 'Plataforma para a ilustradora Anne apresentar seu trabalho e receber encomendas. A página inicial reúne central de links, avatar e galeria. A calculadora monta um pedido com vários itens (personagens ou cenários), combina estilo, enquadramento e acabamento, aplica desconto por volume e mostra faixa de preço quando há cenário; o pedido fecha direto pelo WhatsApp ou pela DM do Instagram. Uma página dedicada à webcomic "Fim Anti-Herói" traz sinopse, personagens, galeria e links de leitura. Todo o conteúdo fica no Supabase (Postgres, Storage e Auth, com Row Level Security) e é editado por um painel administrativo com login, onde a Anne altera preços, cenários, galeria, links, personagens e até o fundo do site. Front-end em HTML/CSS/JS puro, com tema claro/escuro, hospedado na Vercel sem build step.', en: 'A platform for illustrator Anne to showcase her work and take commissions. The home page gathers a link hub, avatar and gallery. The calculator builds a multi-item order (characters or backgrounds), combining style, framing and finish, applying volume discounts and showing a price range when backgrounds are included; the order is sent straight to WhatsApp or Instagram DM. A dedicated page for the webcomic "Fim Anti-Herói" features the synopsis, characters, gallery and reading links. All content lives in Supabase (Postgres, Storage and Auth, with Row Level Security) and is edited through a login-protected admin panel where Anne manages prices, backgrounds, gallery, links, characters and even the site background. Vanilla HTML/CSS/JS front-end with light/dark theme, hosted on Vercel with no build step.' },
        links: [{ label: 'Live MVP', url: 'https://anne-ilustradora.vercel.app/' }],
      },
      {
        id: 5, title: 'Casa Nossa Imobiliária', badge: '',
        tags: ['React', 'Supabase', 'Vercel'],
        shortDesc: { pt: 'Site de imobiliária com catálogo de imóveis para compra, venda e aluguel, com filtros de busca.', en: 'Real estate agency website with a property catalog for buying, selling and renting, plus search filters.' },
        longDesc: { pt: 'Modelo de site para imobiliárias: catálogo de imóveis para compra, venda e aluguel com filtros avançados de busca, apresentação dos serviços da imobiliária (como avaliação técnica de imóveis) e foco em atendimento próximo ao cliente. Construído com React e Supabase e hospedado na Vercel, serve como vitrine para oferecer o serviço a imobiliárias locais.', en: 'A website template for real estate agencies: a property catalog for buying, selling and renting with advanced search filters, a presentation of the agency services (such as technical property appraisal) and a focus on close customer service. Built with React and Supabase and hosted on Vercel, it works as a showcase to offer the service to local agencies.' },
        links: [{ label: 'Live Demo', url: 'https://template-site-imobiliaria.vercel.app/' }],
      },
      {
        id: 6, title: 'Barbearia Clube', badge: '',
        tags: ['Vercel'],
        shortDesc: { pt: 'Site de barbearia no modelo de clube de assinatura, com corte e barba ilimitados.', en: 'Barbershop website built around a subscription club with unlimited haircuts and beard trims.' },
        longDesc: { pt: 'Modelo de site para barbearias que trabalham com assinatura mensal: apresenta o clube com corte e barba ilimitados, a equipe de profissionais e as unidades da rede. Hospedado na Vercel, serve como vitrine para oferecer o serviço a barbearias da região.', en: 'A website template for barbershops running a monthly subscription: it presents the club with unlimited haircuts and beard trims, the professional team and the shop locations. Hosted on Vercel, it works as a showcase to offer the service to local barbershops.' },
        links: [{ label: 'Live Demo', url: 'https://template-site-barbearia-wellingtons-projects-cebf7f37.vercel.app/' }],
      },
    ],
    certifications: [
      {
        id: 1,
        name: { pt: '1º Lugar — Hackathon Extensionista IFRO Ariquemes 2026/1', en: '1st Place — IFRO Ariquemes Extension Hackathon 2026/1' },
        issuer: { pt: 'IFRO Campus Ariquemes (Categoria: Impacto Regional)', en: 'IFRO Ariquemes Campus (Category: Regional Impact)' },
        description: { pt: 'Participação e vitória na Hackathon Extensionista IFRO 2026/1 com a equipe CoreMetrics. O evento focou em soluções tecnológicas para problemas reais da região, unindo IFRO, Sebrae e comunidade. Desenvolvemos o CustoDoce, app de precificação para microempreendedores, conquistando o 1º Lugar na categoria "Desafio Livre de Impacto Regional" com um MVP funcional e uso documentado de IA.', en: 'Victory with team CoreMetrics at the IFRO 2026/1 Extension Hackathon, focused on tech solutions for real regional problems together with IFRO, Sebrae and the community. We built CustoDoce, a pricing app for micro-entrepreneurs, winning 1st place in the "Regional Impact Open Challenge" with a working MVP and documented use of AI.' },
        startDate: { pt: 'Semestre 2026/1', en: 'Semester 2026/1' },
        endDate: { pt: 'Culminância 2026/1', en: 'Final showcase 2026/1' },
        hours: 40,
        institution: { pt: 'Centro de Empreendedorismo e Inovação — IFRO Ariquemes', en: 'Entrepreneurship and Innovation Center — IFRO Ariquemes' },
        links: [{ label: 'MVP CustoDoce', url: 'https://custodoce-b07ce.web.app' }, { label: 'GitHub', url: 'https://github.com/WellingtonPereiraLuiz/CustoDoce' }, { label: 'Edital', url: 'https://hackathon-ifro.bolt.host/' }],
      },
      {
        id: 2,
        name: { pt: 'IV Webinar de Empreendedorismo, Ciência, Inovação e Tecnologia (WECIT)', en: '4th Webinar on Entrepreneurship, Science, Innovation and Technology (WECIT)' },
        issuer: { pt: 'Instituto Federal de Rondônia — Campus Ariquemes', en: 'Federal Institute of Rondônia — Ariquemes Campus' },
        description: { pt: 'Participação e apresentação de projeto no IV WECIT 2025, evento que discutiu Cidades Inteligentes sob a ótica da tecnologia e inovação. Envolveu a apresentação de trabalhos dos acadêmicos de ADS (Curricularização da Extensão), conectando teoria a demandas reais da comunidade e do mercado. Concluído com êxito em dezembro de 2025.', en: 'Participation and project presentation at IV WECIT 2025, discussing Smart Cities through the lens of technology and innovation. Involved presenting work built by Systems Analysis students, connecting classroom theory to real community and market demands. Successfully concluded in December 2025.' },
        startDate: { pt: '09 Dez 2025', en: 'Dec 09, 2025' },
        endDate: { pt: '11 Dez 2025', en: 'Dec 11, 2025' },
        hours: 20,
        institution: { pt: 'IFRO Campus Ariquemes (Transmissão via YouTube)', en: 'IFRO Ariquemes Campus (streamed on YouTube)' },
        links: [{ label: 'Site WECIT', url: 'http://www.wecit.com.br' }],
      },
    ],
    career: [
      {
        id: 3, company: 'ILYSYN Systems',
        role: { pt: 'Desenvolvedor', en: 'Developer' },
        period: { pt: 'Set 2026 — Presente', en: 'Sep 2026 — Present' },
        shortDesc: { pt: 'Desenvolvimento de sites para clientes, documentação e apresentações, com apoio de IA.', en: 'Building websites for clients, writing documentation and preparing presentations, with AI support.' },
        description: { pt: 'Entrei em setembro de 2026 para um período de avaliação e fui efetivado como desenvolvedor. No dia a dia, desenvolvo sites para clientes, escrevo documentação técnica, preparo apresentações, cuido das tarefas diárias da equipe e falo com clientes por ligação, seguindo boas práticas de engenharia de software com apoio de IA.', en: 'I joined in September 2026 for a trial period and was hired as a developer. Day to day, I build websites for clients, write technical documentation, prepare presentations, handle the team\'s daily tasks and talk to clients on calls, following software engineering best practices with AI support.' },
        achievements: { pt: ['Sites para clientes', 'Documentação', 'Desenvolvimento com IA'], en: ['Client websites', 'Documentation', 'AI-Assisted Development'] },
      },
      {
        id: 1, company: 'Prefeitura de Ariquemes',
        role: { pt: 'Estagiário de TI', en: 'IT Intern' },
        period: { pt: 'Abr 2026 — Nov 2026', en: 'Apr 2026 — Nov 2026' },
        shortDesc: { pt: 'Infraestrutura de TI e suporte a redes públicas municipais.', en: 'IT infrastructure and public network support.' },
        description: { pt: 'Atuação no suporte e manutenção da infraestrutura de TI da prefeitura: administração de redes locais, configuração de roteadores e switches, gerenciamento de servidores públicos e manutenção preventiva de hardware, garantindo conectividade das secretarias municipais e suporte técnico avançado aos usuários de sistemas corporativos.', en: "Support and maintenance of the city hall's IT infrastructure: local network administration, router and switch configuration, public server management and preventive hardware maintenance, ensuring connectivity across municipal departments and advanced technical support for corporate system users." },
        achievements: { pt: ['Infraestrutura de TI', 'Redes & Conectividade', 'Suporte Público'], en: ['IT Infrastructure', 'Networks & Connectivity', 'Public Support'] },
      },
      {
        id: 2, company: 'Grupo Novalar',
        role: { pt: 'Estoquista', en: 'Stock Clerk' },
        period: { pt: 'Ago 2023 — Abr 2025', en: 'Aug 2023 — Apr 2025' },
        shortDesc: { pt: 'Organização e controle de estoque, com suporte à assistência técnica.', en: 'Stock organization and control, plus product technical assistance.' },
        description: { pt: 'Responsável pela organização e bom funcionamento do estoque, evitando faltas ou excessos de produtos. Atendimento a demandas de assistência técnica com soluções rápidas e eficazes para clientes e equipe interna, com atuação proativa no aprimoramento de processos e otimização das operações.', en: 'Responsible for stock organization and flow, preventing shortages and overstock. Handled technical-assistance demands with fast, effective solutions for customers and the internal team, proactively improving processes and optimizing operations.' },
        achievements: { pt: ['Organização de Estoque', 'Assistência Técnica', 'Otimização de Processos'], en: ['Stock Organization', 'Technical Assistance', 'Process Optimization'] },
      },
    ],
  };

  const LABELS = {
    pt: {
      nav: { sobre: 'Sobre', carreira: 'Carreira', projetos: 'Projetos', certificacoes: 'Certificações' },
      ring: 'Desenvolvedor de software ✦ Ariquemes, Rondônia ✦ Anno MMXXVI ✦ ',
      ctaProjects: 'Ver projetos', github: 'GitHub', email: 'E-mail',
      eduLabel: 'Estudo', langLabel: 'Idiomas', locLabel: 'Onde moro',
      hAbout: 'Sobre mim', stackLabel: 'Arsenal', roadmapLabel: 'Próximos passos',
      hCareer: 'Carreira', sCareer: 'Onde trabalhei e o que fiz em cada lugar.',
      hProjects: 'Projetos', sProjects: 'Sites, apps e produtos que construí, sozinho ou em equipe.',
      hCerts: 'Certificações', sCerts: 'Prêmios e eventos de que participei.',
      readMore: 'Ler mais', close: 'Fechar',
      mStart: 'Início', mEnd: 'Conclusão', mHours: 'Carga horária', mInst: 'Instituição',
      modalProject: 'Projeto', modalCareer: 'Carreira',
      colophon: 'Composto em Jacquard 24 e EB Garamond. Imagens em dithering geradas no navegador.',
      footer: '© 2026 Wellington Pereira Luiz',
      emailCopied: 'E-mail copiado: ', emailCopyFail: 'Meu e-mail: ',
      toDark: 'Mudar para o modo escuro', toLight: 'Mudar para o modo claro',
    },
    en: {
      nav: { sobre: 'About', carreira: 'Career', projetos: 'Projects', certificacoes: 'Certifications' },
      ring: 'Software developer ✦ Ariquemes, Rondônia ✦ Anno MMXXVI ✦ ',
      ctaProjects: 'See projects', github: 'GitHub', email: 'Email',
      eduLabel: 'Studies', langLabel: 'Languages', locLabel: 'Based in',
      hAbout: 'About me', stackLabel: 'Arsenal', roadmapLabel: 'Next steps',
      hCareer: 'Career', sCareer: 'Where I have worked and what I did there.',
      hProjects: 'Projects', sProjects: 'Websites, apps and products I have built, alone or with a team.',
      hCerts: 'Certifications', sCerts: 'Awards and events I took part in.',
      readMore: 'Read more', close: 'Close',
      mStart: 'Start', mEnd: 'End', mHours: 'Total hours', mInst: 'Institution',
      modalProject: 'Project', modalCareer: 'Career',
      colophon: 'Set in Jacquard 24 and EB Garamond. Dithered images drawn in the browser.',
      footer: '© 2026 Wellington Pereira Luiz',
      emailCopied: 'Email copied: ', emailCopyFail: 'My email: ',
      toDark: 'Switch to dark mode', toLight: 'Switch to light mode',
    },
  };

  const SECTION_IDS = ['sobre', 'carreira', 'projetos', 'certificacoes'];
  const ROMAN = ['I', 'II', 'III', 'IV'];

  // ────────────────────────────────────────────────────────────────────────
  // Helpers
  // ────────────────────────────────────────────────────────────────────────
  function esc(s) {
    return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function tr(v, lang) {
    return (v && typeof v === 'object' && !Array.isArray(v)) ? (v[lang] ?? v.pt ?? '') : (v ?? '');
  }
  // localStorage throws when storage is blocked (private mode, disabled cookies)
  function storeGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function storeSet(key, value) {
    try { localStorage.setItem(key, value); return true; } catch (e) { return false; }
  }
  function defaultData() {
    return JSON.parse(JSON.stringify(PORTFOLIO_DATA));
  }

  // Content comes from Supabase (edited in admin.html); PORTFOLIO_DATA above is the
  // fallback when Supabase is not configured, unreachable, slow or returns a bad shape.
  async function loadContent() {
    if (!supabaseConfigured()) return defaultData();
    try {
      const row = await fetchPortfolioContent({ timeoutMs: CONTENT_TIMEOUT_MS });
      const err = portfolioDataError(row.data);
      if (err) throw new Error('formato inválido: ' + err);
      return row.data;
    } catch (e) {
      console.warn('Conteúdo do Supabase indisponível; usando o PORTFOLIO_DATA do app.js.', e);
      return defaultData();
    }
  }

  // ────────────────────────────────────────────────────────────────────────
  // State
  // ────────────────────────────────────────────────────────────────────────
  const state = {
    lang: ['pt', 'en'].includes(storeGet('wl_lang')) ? storeGet('wl_lang') : DEFAULT_LANG,
    theme: document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
    active: 'sobre',
    data: null,
    modal: null,
    openCert: null,
  };

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const smallScreen = window.matchMedia('(max-width: 720px)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  // ────────────────────────────────────────────────────────────────────────
  // Dithering: ordered (Bayer 8×8) dithering of shaded shapes, drawn small on a
  // canvas in the ink color and scaled up with hard pixel edges (CSS).
  // ────────────────────────────────────────────────────────────────────────
  const BAYER = (function build(n) {
    let m = [[0]];
    while (m.length < n) {
      const s = m.length;
      const next = [];
      for (let y = 0; y < s * 2; y++) {
        next.push([]);
        for (let x = 0; x < s * 2; x++) {
          const q = [[0, 2], [3, 1]][Math.floor(y / s)][Math.floor(x / s)];
          next[y].push(4 * m[y % s][x % s] + q);
        }
      }
      m = next;
    }
    return m.map((row) => row.map((v) => (v + 0.5) / (n * n)));
  })(8);

  // smooth value noise, for surface texture
  function hash(x, y) {
    const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
    return s - Math.floor(s);
  }
  function noise(x, y) {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = x - xi, yf = y - yi;
    const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }
  function fbm(x, y) {
    return noise(x, y) * 0.55 + noise(x * 2.1, y * 2.1) * 0.3 + noise(x * 4.3, y * 4.3) * 0.15;
  }
  const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

  // Each shape maps a point (u right, v down, both in -1..1; the frame's aspect is
  // `ar` = width/height so u spans -ar..ar) to a "darkness" 0..1, or -1 for blank
  // paper. `L` is the light direction {x, y, z} (normalized).
  function lambert(nx, ny, nz, L) {
    return Math.max(0, nx * L.x + ny * L.y + nz * L.z);
  }
  const SHAPES = {
    // the hero orb: a lit sphere with a mottled, moon-like surface and a cast shadow
    orb(u, v, L, o) {
      const R = 0.8;
      const x = u / R, y = v / R, r2 = x * x + y * y;
      if (r2 <= 1) {
        const z = Math.sqrt(1 - r2);
        const tex = fbm(x * 3 + 7, y * 3 + 3) - 0.5;
        const d = lambert(x, y, z, L);
        return clamp01(1 - (0.05 + 0.95 * d) + tex * 0.35 + (r2 > 0.93 ? 0.25 : 0));
      }
      if (!o.dark) {
        // shadow on the ground, opposite the light
        const sx = (u + L.x * 0.5) / 0.75, sy = (v - 0.93) / 0.07;
        const s = sx * sx + sy * sy;
        if (s < 1) return (1 - s) * 0.7;
      }
      return -1;
    },
    // a gothic window: pointed arch, light falling through it, a mullion and a rose
    arch(u, v) {
      const w = 0.5, top = 0.02;
      const inside = Math.abs(u) <= w && v <= 0.85 && (v >= top ||
        (Math.hypot(u + w, v - top) <= 2 * w && Math.hypot(u - w, v - top) <= 2 * w));
      if (!inside) return v > 0.85 && v < 0.95 && Math.abs(u) < 0.9 ? 0.9 : -1;
      const edge = Math.abs(u) > w - 0.06 || v > 0.79 ||
        (v < top && (Math.hypot(u + w, v - top) > 2 * w - 0.07 || Math.hypot(u - w, v - top) > 2 * w - 0.07));
      if (edge || Math.abs(u) < 0.025) return 1;
      const rose = Math.hypot(u, v + 0.32);
      if (rose < 0.19) return rose > 0.15 ? 1 : 0.15 + 0.5 * (0.5 + 0.5 * Math.cos(Math.atan2(v + 0.32, u) * 6));
      return clamp01(0.12 + (v + 1) * 0.42 + (fbm(u * 4, v * 4) - 0.5) * 0.3);
    },
    // a heraldic shield, split per pale, with a cross
    shield(u, v, L) {
      if (Math.abs(u) > 0.62 || v < -0.78 || v > 0.86) return -1;
      if (v > 0.18) { const k = (v - 0.18) / 0.68; if (Math.abs(u) > 0.62 * Math.sqrt(Math.max(0, 1 - k * k))) return -1; }
      if (Math.abs(u) < 0.08 || Math.abs(v + 0.12) < 0.08) return 0.95;
      const bulge = lambert(u * 0.7, v * 0.4, 0.6, L);
      return u < 0 ? clamp01(0.85 - bulge * 0.4) : clamp01(0.55 - bulge * 0.5);
    },
    // a medieval sun: shaded disk with alternating straight rays
    sun(u, v, L) {
      const r = Math.hypot(u, v), a = Math.atan2(v, u);
      if (r < 0.36) {
        const z = Math.sqrt(Math.max(0, 1 - (r / 0.36) ** 2));
        return clamp01(1 - lambert(u / 0.36, v / 0.36, z, L) * 0.9);
      }
      const ray = Math.cos(a * 12);
      const len = ray > 0 ? 0.92 : 0.68;
      if (r < len && Math.abs(Math.sin(a * 12) * r) < 0.05 + (len - r) * 0.12) return clamp01(0.95 - (r - 0.36) * 0.9);
      return -1;
    },
    // interference waves fading out at the edges
    waves(u, v) {
      const r = Math.hypot(u * 0.8, v);
      if (r > 1) return -1;
      const w = 0.5 + 0.5 * Math.sin(u * 9 + Math.sin(v * 3.4) * 2.6);
      return clamp01(w * (1 - r * 0.9));
    },
    // a torus seen from above, lit from one side
    ring(u, v, L) {
      const R = 0.55, t = 0.24;
      const d = Math.hypot(u, v) - R;
      if (Math.abs(d) > t) return -1;
      const nz = Math.sqrt(1 - (d / t) ** 2), k = d / t / Math.max(Math.hypot(u, v), 1e-6);
      return clamp01(1 - lambert(u * k, v * k, nz, L) * 0.95);
    },
    // layered mountain ridges under a sky of lines
    ridges(u, v) {
      for (let i = 0; i < 4; i++) {
        const h = 0.05 + i * 0.22 - fbm(u * 1.6 + i * 3.1, i * 2.3) * 0.5;
        if (v > h) return clamp01(0.3 + i * 0.2 - (v - h) * 0.35);
      }
      return -1;
    },
    // a fluted column, shaded as a cylinder
    column(u, v, L) {
      if (v < -0.78 || v > 0.84) return -1;
      if (v < -0.66 || v > 0.72) return Math.abs(u) < 0.48 ? 0.9 : -1;
      if (Math.abs(u) > 0.34) return -1;
      const x = u / 0.34, z = Math.sqrt(1 - x * x);
      const flute = Math.abs(Math.sin(x * 9)) < 0.18 ? 0.3 : 0;
      return clamp01(1 - lambert(x, 0, z, L) * 0.95 + flute);
    },
  };
  const POSTER_SHAPES = ['sun', 'shield', 'arch', 'ring', 'waves', 'column', 'ridges'];

  function readInk() {
    const css = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() || '#1e34d6';
    const hex = css.replace('#', '');
    const full = hex.length === 3 ? hex.split('').map((c) => c + c).join('') : hex;
    const n = parseInt(full, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  // Draws `shape` on `canvas` (already sized). `dev` 0..1 "develops" the print:
  // below 1 the lighter tones are still missing, appearing in Bayer order.
  function drawDither(canvas, shape, opt) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    const img = ctx.createImageData(w, h);
    const px = img.data;
    const [r, g, b] = opt.ink;
    const ar = w / h, fn = SHAPES[shape];
    const dark = opt.dark, dev = opt.dev == null ? 1 : opt.dev;
    const L = opt.light;
    const flip = shape === 'orb';
    const lift = (1 - dev) * 1.05;
    for (let y = 0; y < h; y++) {
      const v = (y + 0.5) / h * 2 - 1;
      const row = BAYER[y & 7];
      for (let x = 0; x < w; x++) {
        let d = fn(((x + 0.5) / w * 2 - 1) * ar, v, L, opt);
        if (d < 0) continue;
        // dark theme: on the orb the ink becomes the light, so its tones flip (kept
        // below solid so the surface stays dotted); posters keep their tones
        if (dark && flip) d = (1 - d) * 0.86;
        if (d - lift > row[x & 7]) {
          const i = (y * w + x) * 4;
          px[i] = r; px[i + 1] = g; px[i + 2] = b; px[i + 3] = 255;
        }
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  function lightFrom(ax, ay) {
    const z = 0.72;
    const len = Math.hypot(ax, ay, z);
    return { x: ax / len, y: ay / len, z: z / len };
  }

  // a strip that fades from solid ink to blank paper, used as the band between sections
  function makeBandImage(ink) {
    const c = document.createElement('canvas');
    c.width = 64; c.height = 14;
    const ctx = c.getContext('2d');
    const img = ctx.createImageData(c.width, c.height);
    for (let y = 0; y < c.height; y++) {
      const t = 1 - y / (c.height - 1);
      for (let x = 0; x < c.width; x++) {
        if (t * 0.9 > BAYER[y & 7][x & 7]) {
          const i = (y * c.width + x) * 4;
          img.data[i] = ink[0]; img.data[i + 1] = ink[1]; img.data[i + 2] = ink[2]; img.data[i + 3] = 255;
        }
      }
    }
    ctx.putImageData(img, 0, 0);
    return `url(${c.toDataURL()})`;
  }

  // ── the hero orb: light follows the pointer, or drifts slowly on its own ──
  const orb = { canvas: null, ink: null, ax: -0.55, ay: -0.5, tx: -0.55, ty: -0.5, dev: 1, raf: 0, visible: true, pointer: false };

  function orbFrame(now) {
    orb.raf = 0;
    if (!orb.canvas || !orb.canvas.isConnected) return;
    const still = reducedMotion.matches;
    if (!orb.pointer && !still) {
      const t = now / 5200;
      orb.tx = Math.cos(t) * 0.7;
      orb.ty = -0.35 + Math.sin(t * 0.8) * 0.35;
    }
    orb.ax += (orb.tx - orb.ax) * 0.08;
    orb.ay += (orb.ty - orb.ay) * 0.08;
    drawDither(orb.canvas, 'orb', { ink: orb.ink, dark: state.theme === 'dark', dev: orb.dev, light: lightFrom(orb.ax, orb.ay) });
    if (!still && orb.visible && !document.hidden) orb.raf = requestAnimationFrame(orbFrame);
  }
  function orbKick() {
    if (!orb.raf && orb.canvas) orb.raf = requestAnimationFrame(orbFrame);
  }
  function initOrb(ink) {
    const canvas = document.querySelector('.hero-art canvas');
    if (!canvas) return;
    const res = smallScreen.matches ? 132 : 168;
    canvas.width = res; canvas.height = res;
    orb.canvas = canvas;
    orb.ink = ink;
    if (!heroObserver) {
      heroObserver = new IntersectionObserver((entries) => {
        orb.visible = entries[0].isIntersecting;
        if (orb.visible) orbKick();
      });
    }
    heroObserver.disconnect();
    heroObserver.observe(canvas);
    orbKick();
  }
  let heroObserver;

  // the first load develops the orb from blank paper
  function developOrb() {
    if (reducedMotion.matches) return;
    const start = performance.now();
    orb.dev = 0;
    (function step(now) {
      orb.dev = Math.min(1, (now - start) / 1600);
      orbKick();
      if (orb.dev < 1) requestAnimationFrame(step);
    })(start);
  }

  window.addEventListener('pointermove', (e) => {
    if (!finePointer.matches || !orb.canvas || reducedMotion.matches) return;
    const r = orb.canvas.getBoundingClientRect();
    if (r.bottom < 0) return;
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const span = Math.max(window.innerWidth, 600) * 0.45;
    orb.pointer = true;
    orb.tx = Math.max(-1.4, Math.min(1.4, (e.clientX - cx) / span));
    orb.ty = Math.max(-1.4, Math.min(1.4, (e.clientY - cy) / span));
    orbKick();
  }, { passive: true });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) orbKick(); });

  // ── posters: each develops once, the first time it scrolls into view ──
  let posterObserver;
  function initPosters(ink) {
    const dark = state.theme === 'dark';
    if (!posterObserver) {
      posterObserver = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          posterObserver.unobserve(en.target);
          developPoster(en.target);
        });
      }, { threshold: 0.25 });
    }
    posterObserver.disconnect();
    document.querySelectorAll('canvas[data-shape]').forEach((c) => {
      const rect = c.parentElement.getBoundingClientRect();
      const wide = c.dataset.wide === '1';
      c.width = wide ? 160 : 112;
      c.height = Math.round(c.width * (rect.height / rect.width || 0.75));
      c._opt = { ink, dark, light: lightFrom(-0.6, -0.55), dev: 1 };
      const seen = developed.has(c.dataset.key);
      if (reducedMotion.matches || seen) {
        drawDither(c, c.dataset.shape, c._opt);
      } else {
        c._opt.dev = 0;
        drawDither(c, c.dataset.shape, c._opt);
        posterObserver.observe(c);
      }
    });
  }
  const developed = new Set();
  function developPoster(c) {
    developed.add(c.dataset.key);
    const start = performance.now();
    (function step(now) {
      if (!c.isConnected) return;
      c._opt.dev = Math.min(1, (now - start) / 900);
      drawDither(c, c.dataset.shape, c._opt);
      if (c._opt.dev < 1) requestAnimationFrame(step);
    })(start);
  }

  // blackletter capitals are hard to read, so an all-caps title is set in Garamond
  function isCaps(s) {
    return /[A-ZÀ-Ý]{3,}/.test(s) && s === s.toUpperCase();
  }

  function shapeFor(projectIndex) {
    return POSTER_SHAPES[projectIndex % POSTER_SHAPES.length];
  }

  // ────────────────────────────────────────────────────────────────────────
  // Rendering: main app (nav + sections + footer)
  // ────────────────────────────────────────────────────────────────────────
  // If the loaded content still breaks rendering, fall back to PORTFOLIO_DATA so the
  // page never ends up blank.
  function renderApp() {
    try {
      renderPage();
    } catch (err) {
      console.error('Falha ao renderizar o conteúdo; usando o PORTFOLIO_DATA do app.js.', err);
      state.data = defaultData();
      renderPage();
    }
  }

  function renderPage() {
    document.documentElement.lang = state.lang === 'en' ? 'en' : 'pt-BR';
    const t = LABELS[state.lang] || LABELS.pt;
    const data = state.data;
    const p = data.personal;
    const bioFull = tr(p.bio, state.lang);
    const heroBioShort = bioFull.length > 190 ? bioFull.slice(0, (bioFull.indexOf('.', 120) + 1) || 190) : bioFull;

    document.getElementById('app').innerHTML =
      renderNav(t) +
      '<main>' +
      renderHero(t, p, heroBioShort) +
      renderAbout(t, data, p, bioFull) +
      renderCareer(t, data) +
      renderProjects(t, data) +
      renderCertifications(t, data) +
      '</main>' +
      renderFooter(t, p);

    const ink = readInk();
    document.documentElement.style.setProperty('--dither-band', makeBandImage(ink));
    initOrb(ink);
    initPosters(ink);
    initCertHeights();
    updateNavActive();
  }

  function renderNav(t) {
    const navLinks = SECTION_IDS.map((id) =>
      `<a href="#${id}" data-action="goto" data-id="${id}" data-nav-id="${id}">${esc(t.nav[id])}</a>`
    ).join('');
    const dark = state.theme === 'dark';
    const icon = dark
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.6M12 18.9v2.6M2.5 12h2.6M18.9 12h2.6M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M20 14.6A8.2 8.2 0 0 1 9.4 4a8.2 8.2 0 1 0 10.6 10.6z"/></svg>';
    return `
    <nav class="navbar" aria-label="${state.lang === 'en' ? 'Main' : 'Principal'}">
      <button class="navbar-brand" data-action="goto" data-id="sobre" aria-label="Wellington Luiz">W. Luiz</button>
      <div class="navbar-right">
        <div class="navbar-nav">${navLinks}</div>
        <div class="navbar-tools">
          <div class="navbar-lang">
            ${langButton('pt')}<span aria-hidden="true">/</span>${langButton('en')}
          </div>
          <button class="theme-toggle" data-action="theme" aria-label="${esc(dark ? t.toLight : t.toDark)}" title="${esc(dark ? t.toLight : t.toDark)}">${icon}</button>
        </div>
      </div>
    </nav>`;
  }

  function langButton(lang) {
    const on = state.lang === lang;
    return `<button class="${on ? 'active' : ''}" aria-pressed="${on}" data-action="lang" data-lang="${lang}" lang="${lang}">${lang}</button>`;
  }

  function renderHero(t, p, heroBioShort) {
    const ring = esc(t.ring.repeat(2));
    return `
    <section id="sobre" aria-label="${esc(t.hAbout)}">
      <div class="hero">
        <div class="hero-main">
          <p class="hero-kicker">${esc(tr(p.title, state.lang))}</p>
          <h1 class="hero-name">${splitName(p.name)}</h1>
          <p class="hero-bio">${esc(heroBioShort)}</p>
          <div class="hero-cta">
            <button class="btn-solid" data-action="goto" data-id="projetos">${esc(t.ctaProjects)}</button>
            <a class="btn-outline" href="${esc(p.github)}" target="_blank" rel="noopener noreferrer">${esc(t.github)}</a>
            <a class="btn-outline" href="mailto:${esc(p.email)}" data-action="email">${esc(t.email)}</a>
          </div>
          <dl class="hero-facts">
            <div><dt>${esc(t.eduLabel)}</dt><dd>${esc(tr(p.education, state.lang))}</dd></div>
            <div><dt>${esc(t.locLabel)}</dt><dd>${esc(p.location)}</dd></div>
            <div><dt>${esc(t.langLabel)}</dt><dd>${esc(tr(p.languages, state.lang))}</dd></div>
          </dl>
        </div>
        <div class="hero-art" aria-hidden="true">
          <svg class="hero-ring" viewBox="0 0 200 200">
            <defs><path id="ringPath" d="M100,100 m-92,0 a92,92 0 1,1 184,0 a92,92 0 1,1 -184,0"/></defs>
            <g><text><textPath href="#ringPath" textLength="574" lengthAdjust="spacing">${ring}</textPath></text></g>
          </svg>
          <canvas class="dither"></canvas>
        </div>
      </div>
  `;
  }

  // One span per letter for the opening; one line per word. Screen readers get the
  // plain name.
  function splitName(name) {
    let i = 0;
    const words = String(name || '').split(' ').filter(Boolean).map((w) =>
      `<span class="hn-word">${[...w].map((ch) => `<span class="hn-ch" style="--i:${i++}">${esc(ch)}</span>`).join('')}</span>`
    );
    return `<span class="sr-only">${esc(name)}</span><span aria-hidden="true">${words.join('')}</span>`;
  }

  function sectionHead(n, title, sub) {
    return `
      <header class="section-head">
        <span class="section-num" aria-hidden="true">${ROMAN[n]}</span>
        <h2 class="section-title">${esc(title)}</h2>
        ${sub ? `<p class="section-sub">${esc(sub)}</p>` : ''}
      </header>`;
  }

  function renderAbout(t, data, p, bioFull) {
    const stackGroups = data.techStack.map((g) => `
      <div class="stack-group">
        <h4>${esc(tr(g.category, state.lang))}</h4>
        <ul>${g.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
      </div>`).join('');

    const roadmapItems = data.roadmap.map((r, i) => `
      <li>
        <span class="roadmap-n" aria-hidden="true">${ROMAN[i] || i + 1}</span>
        <span class="roadmap-title">${esc(tr(r.title, state.lang))}</span>
        <span class="roadmap-desc">${esc(tr(r.desc, state.lang))}</span>
      </li>`).join('');

    // illuminated initial: the first letter set apart on a block of ink
    const first = [...bioFull][0] || '';
    const rest = bioFull.slice(first.length);
    const quote = tr(p.quote, state.lang).replace(/^["“]|["”]$/g, '');

    return `
      <div class="dither-band" aria-hidden="true"></div>
      <div class="section-inner">
        ${sectionHead(0, t.hAbout)}
        <div class="about">
          <p class="about-bio"><span class="dropcap" aria-hidden="true">${esc(first)}</span><span class="sr-only">${esc(first)}</span>${esc(rest)}</p>
          <blockquote class="about-quote">
            <span class="fleuron" aria-hidden="true">❦</span>
            <p>${esc(quote)}</p>
            <span class="fleuron" aria-hidden="true">✠</span>
          </blockquote>
          <div>
            <h3 class="about-h">${esc(t.stackLabel)}</h3>
            <div class="stack-groups">${stackGroups}</div>
          </div>
          <div>
            <h3 class="about-h">${esc(t.roadmapLabel)}</h3>
            <ol class="roadmap">${roadmapItems}</ol>
          </div>
        </div>
      </div>
    </section>`;
  }

  function renderCareer(t, data) {
    const items = data.career.map((job) => {
      const chips = (job.achievements && (job.achievements[state.lang] || job.achievements.pt)) || [];
      return `
      <li class="job" data-action="open-job" data-id="${esc(job.id)}" role="button" tabindex="0" aria-haspopup="dialog">
        <div class="job-period">${esc(tr(job.period, state.lang))}</div>
        <div>
          <h3 class="job-role">${esc(tr(job.role, state.lang))}</h3>
          <p class="job-company">${esc(job.company)}</p>
          <p class="job-short">${esc(tr(job.shortDesc, state.lang))}</p>
          <ul class="job-tags">${chips.map((c) => `<li class="tag">${esc(c)}</li>`).join('')}</ul>
          <span class="job-more">${esc(t.readMore)}</span>
        </div>
      </li>`;
    }).join('');

    return `
    <section id="carreira" aria-labelledby="h-carreira">
      <div class="dither-band" aria-hidden="true"></div>
      <div class="section-inner">
        ${sectionHead(1, t.hCareer, t.sCareer).replace('<h2 class="section-title"', '<h2 class="section-title" id="h-carreira"')}
        <ol class="timeline">${items}</ol>
      </div>
    </section>`;
  }

  function renderProjects(t, data) {
    const items = data.projects.map((pj, i) => {
      const badgeText = tr(pj.badge, state.lang);
      const badge = badgeText ? `<span class="poster-badge">${esc(badgeText)}</span>` : '';
      return `
      <article class="poster" data-action="open-project" data-id="${esc(pj.id)}" role="button" tabindex="0" aria-haspopup="dialog" aria-label="${esc(pj.title)}">
        <div class="poster-art"><canvas class="dither" data-shape="${shapeFor(i)}" data-key="p${esc(pj.id)}" aria-hidden="true"></canvas></div>
        <div class="poster-body">
          ${badge}
          <h3 class="poster-title${isCaps(pj.title) ? ' caps' : ''}">${esc(pj.title)}</h3>
          <p class="poster-short">${esc(tr(pj.shortDesc, state.lang))}</p>
          <p class="poster-tags">${esc(pj.tags.join(', '))}</p>
        </div>
      </article>`;
    }).join('');

    return `
    <section id="projetos" aria-labelledby="h-projetos">
      <div class="dither-band" aria-hidden="true"></div>
      <div class="section-inner">
        ${sectionHead(2, t.hProjects, t.sProjects).replace('<h2 class="section-title"', '<h2 class="section-title" id="h-projetos"')}
        <div class="project-grid">${items}</div>
      </div>
    </section>`;
  }

  function renderCertifications(t, data) {
    const items = data.certifications.map((c) => {
      const metas = [
        { label: t.mStart, value: tr(c.startDate, state.lang) },
        { label: t.mEnd, value: tr(c.endDate, state.lang) },
        { label: t.mHours, value: c.hours != null ? c.hours + 'h' : '' },
        { label: t.mInst, value: tr(c.institution, state.lang) },
      ].filter((m) => m.value);
      const links = (c.links || []).map((lk) =>
        `<a class="cert-link" href="${esc(lk.url)}" target="_blank" rel="noopener noreferrer">${esc(lk.label)} ↗</a>`
      ).join('');
      return `
      <li class="cert-card" data-cert-id="${esc(c.id)}">
        <div class="cert-head" data-action="toggle-cert" data-id="${esc(c.id)}" role="button" tabindex="0" aria-expanded="false" aria-controls="cert-body-${esc(c.id)}">
          <div>
            <h3 class="cert-name">${esc(tr(c.name, state.lang))}</h3>
            <p class="cert-issuer">${esc(tr(c.issuer, state.lang))}</p>
          </div>
          <span class="cert-chev" aria-hidden="true">+</span>
        </div>
        <div class="cert-collapse" id="cert-body-${esc(c.id)}">
          <div class="cert-body">
            <p class="cert-desc">${esc(tr(c.description, state.lang))}</p>
            <dl class="cert-metas">
              ${metas.map((m) => `<div><dt>${esc(m.label)}</dt><dd>${esc(m.value)}</dd></div>`).join('')}
            </dl>
            ${links ? `<div class="cert-links">${links}</div>` : ''}
          </div>
        </div>
      </li>`;
    }).join('');

    return `
    <section id="certificacoes" aria-labelledby="h-certificacoes">
      <div class="dither-band" aria-hidden="true"></div>
      <div class="section-inner">
        ${sectionHead(3, t.hCerts, t.sCerts).replace('<h2 class="section-title"', '<h2 class="section-title" id="h-certificacoes"')}
        <ul class="cert-list">${items}</ul>
      </div>
    </section>`;
  }

  function renderFooter(t, p) {
    return `
    <footer class="site-footer">
      <span class="footer-mark" aria-hidden="true">W. Luiz</span>
      <div>
        <p class="footer-colophon">${esc(t.colophon)}</p>
        <p class="footer-colophon">${esc(t.footer)}</p>
      </div>
      <div class="footer-links">
        <a href="${esc(p.github)}" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="mailto:${esc(p.email)}" data-action="email">${esc(p.email)}</a>
      </div>
    </footer>`;
  }

  // ────────────────────────────────────────────────────────────────────────
  // Certification accordion
  // ────────────────────────────────────────────────────────────────────────
  function setCertOpen(id, open) {
    const card = document.querySelector(`.cert-card[data-cert-id="${CSS.escape(String(id))}"]`);
    if (!card) return;
    const collapse = card.querySelector('.cert-collapse');
    const body = card.querySelector('.cert-body');
    card.classList.toggle('open', open);
    card.querySelector('.cert-head').setAttribute('aria-expanded', String(open));
    collapse.style.maxHeight = open ? body.scrollHeight + 'px' : '0px';
    // keep links in a closed card out of the Tab order
    collapse.inert = !open;
  }
  function initCertHeights() {
    document.querySelectorAll('.cert-card').forEach((card) => {
      const id = card.getAttribute('data-cert-id');
      setCertOpen(id, String(state.openCert) === id);
    });
  }
  function toggleCert(id) {
    const willOpen = String(state.openCert) !== String(id);
    const prev = state.openCert;
    state.openCert = willOpen ? id : null;
    if (prev != null && String(prev) !== String(id)) setCertOpen(prev, false);
    setCertOpen(id, willOpen);
  }

  // ────────────────────────────────────────────────────────────────────────
  // Nav active state / scrollspy
  // ────────────────────────────────────────────────────────────────────────
  function updateNavActive() {
    document.querySelectorAll('[data-nav-id]').forEach((a) => {
      const on = a.getAttribute('data-nav-id') === state.active;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
    // phones: the link row scrolls sideways; keep the active link in view
    const nav = document.querySelector('.navbar-nav');
    const activeLink = nav && nav.querySelector('a.active');
    if (activeLink && nav.scrollWidth > nav.clientWidth) {
      nav.scrollTo({ left: activeLink.offsetLeft - (nav.clientWidth - activeLink.offsetWidth) / 2 });
    }
  }

  // phones: hide the (two-row) navbar while scrolling down, bring it back on scroll up
  let lastScrollY = window.scrollY;
  function autoHideNav() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    const y = window.scrollY;
    const delta = y - lastScrollY;
    lastScrollY = y;
    if (!smallScreen.matches || y < 140) { navbar.classList.remove('nav-hidden'); return; }
    if (delta > 6) navbar.classList.add('nav-hidden');
    else if (delta < -6) navbar.classList.remove('nav-hidden');
  }

  let suppressSpy = false;
  let spyTimer;
  let rafId;
  function onScroll() {
    if (rafId) return;
    rafId = requestAnimationFrame(() => { rafId = null; autoHideNav(); spy(); });
  }
  function spy() {
    if (suppressSpy) return;
    const mid = window.innerHeight * 0.35;
    let active = 'sobre';
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= mid) active = id;
    }
    if (active !== state.active) {
      state.active = active;
      updateNavActive();
    }
  }

  function scrollBehavior() {
    return reducedMotion.matches ? 'auto' : 'smooth';
  }
  function goto(id) {
    suppressSpy = true;
    clearTimeout(spyTimer);
    state.active = id;
    updateNavActive();
    if (id === 'sobre') {
      window.scrollTo({ top: 0, behavior: scrollBehavior() });
    } else {
      const el = document.getElementById(id);
      // stop just below the fixed navbar, whose height changes on phones (two rows)
      const navHeight = document.querySelector('.navbar').offsetHeight;
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - navHeight + 30, behavior: scrollBehavior() });
    }
    spyTimer = setTimeout(() => { suppressSpy = false; spy(); }, 1200);
  }

  // ────────────────────────────────────────────────────────────────────────
  // Language and theme
  // ────────────────────────────────────────────────────────────────────────
  function setLang(lang) {
    if (lang !== 'pt' && lang !== 'en') return;
    storeSet('wl_lang', lang);
    state.lang = lang;
    closeModal();
    renderApp();
  }

  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0e0f1a' : '#edebe4');
  }
  function toggleTheme() {
    const next = state.theme === 'dark' ? 'light' : 'dark';
    storeSet('wl_theme', next);
    applyTheme(next);
    const y = window.scrollY;
    renderApp();
    window.scrollTo(0, y);
    const btn = document.querySelector('.theme-toggle');
    if (btn) btn.focus({ preventScroll: true });
  }

  // ────────────────────────────────────────────────────────────────────────
  // Modal
  // ────────────────────────────────────────────────────────────────────────
  let modalOpener = null;
  function openModal(m) {
    modalOpener = document.activeElement;
    state.modal = m;
    renderModal();
    document.documentElement.classList.add('modal-open');
    // a history entry so the phone's Back button closes the modal instead of leaving the site
    if (!(history.state && history.state.wlModal)) history.pushState({ wlModal: true }, '');
    document.querySelector('#modalRoot .modal-close').focus({ preventScroll: true });
  }
  function closeModal(fromHistory) {
    if (!state.modal) return;
    state.modal = null;
    document.getElementById('modalRoot').innerHTML = '';
    document.documentElement.classList.remove('modal-open');
    // closed by ✕ / Esc / overlay: drop the entry openModal pushed
    if (fromHistory !== true && history.state && history.state.wlModal) history.back();
    // return focus to the card that opened the modal
    if (modalOpener && modalOpener.isConnected) modalOpener.focus({ preventScroll: true });
    modalOpener = null;
  }
  // keep Tab / Shift+Tab cycling inside the open modal
  function trapModalFocus(e) {
    const box = document.querySelector('#modalRoot .modal-box');
    if (!box) return;
    const focusables = [...box.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])')];
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (!box.contains(document.activeElement)) {
      e.preventDefault(); first.focus();
    } else if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }
  function renderModal() {
    const root = document.getElementById('modalRoot');
    const m = state.modal;
    if (!m) { root.innerHTML = ''; return; }
    const t = LABELS[state.lang] || LABELS.pt;
    const tags = (m.chips || []).map((c) => `<span class="tag">${esc(c)}</span>`).join('');
    const links = (m.links || []).map((lk, i) =>
      `<a class="modal-link ${i === 0 ? 'btn-solid' : 'btn-outline'}" href="${esc(lk.url)}" target="_blank" rel="noopener noreferrer">${esc(lk.label || '')} ↗</a>`
    ).join('');
    root.innerHTML = `
      <div class="modal-overlay" data-action="close-modal-overlay">
        <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
          <button type="button" class="modal-close" data-action="close-modal">✕ ${esc(t.close)}</button>
          ${m.shape ? `<div class="modal-art"><canvas class="dither" aria-hidden="true"></canvas></div>` : ''}
          <div class="modal-content">
            <p class="modal-kicker">${esc(m.kicker)}</p>
            <h2 class="modal-title${isCaps(m.title) ? ' caps' : ''}" id="modalTitle">${esc(m.title)}</h2>
            ${m.sub ? `<p class="modal-sub">${esc(m.sub)}</p>` : ''}
            ${tags ? `<div class="modal-tags">${tags}</div>` : ''}
            <p class="modal-desc">${esc(m.desc)}</p>
            ${links ? `<div class="modal-links">${links}</div>` : ''}
          </div>
        </div>
      </div>`;
    const c = root.querySelector('.modal-art canvas');
    if (c) {
      c.width = 192; c.height = 84;
      drawDither(c, m.shape, { ink: readInk(), dark: state.theme === 'dark', light: lightFrom(-0.6, -0.55) });
    }
  }

  function openJobModal(id) {
    const t = LABELS[state.lang] || LABELS.pt;
    const job = state.data.career.find((j) => String(j.id) === String(id));
    if (!job) return;
    const chips = (job.achievements && (job.achievements[state.lang] || job.achievements.pt)) || [];
    openModal({
      kicker: t.modalCareer, title: tr(job.role, state.lang),
      sub: job.company + ', ' + tr(job.period, state.lang),
      chips, desc: tr(job.description, state.lang), links: [],
    });
  }
  function openProjectModal(id) {
    const t = LABELS[state.lang] || LABELS.pt;
    const index = state.data.projects.findIndex((p) => String(p.id) === String(id));
    const pj = state.data.projects[index];
    if (!pj) return;
    openModal({
      kicker: t.modalProject, title: pj.title, sub: '',
      chips: pj.tags, desc: tr(pj.longDesc, state.lang),
      links: pj.links || [], shape: shapeFor(index),
    });
  }

  // ────────────────────────────────────────────────────────────────────────
  // Toast + clipboard
  // ────────────────────────────────────────────────────────────────────────
  let toastTimer;
  function showToast(msg) {
    const root = document.getElementById('toastRoot');
    root.innerHTML = `<div class="toast" role="status">${esc(msg)}</div>`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { root.innerHTML = ''; }, 3200);
  }
  function copyEmail() {
    const t = LABELS[state.lang] || LABELS.pt;
    const email = state.data.personal.email;
    copyText(email, t.emailCopied + email, t.emailCopyFail + email);
  }
  function copyText(text, okMsg, failMsg) {
    const done = () => showToast(okMsg);
    const fail = () => showToast(failMsg);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, () => (copyFallback(text) ? done() : fail()));
    } else {
      copyFallback(text) ? done() : fail();
    }
  }
  function copyFallback(text) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (e) { return false; }
  }

  // ────────────────────────────────────────────────────────────────────────
  // Event delegation
  // ────────────────────────────────────────────────────────────────────────
  document.addEventListener('click', (e) => {
    const overlay = e.target.closest('[data-action="close-modal-overlay"]');
    if (overlay && e.target === overlay) { closeModal(); return; }

    const target = e.target.closest('[data-action]');
    if (!target) return;
    const action = target.dataset.action;
    const id = target.dataset.id;

    switch (action) {
      case 'goto': e.preventDefault(); goto(id); break; // keep the URL hash unchanged
      case 'email': copyEmail(); break; // mailto still opens; copy covers visitors without a mail app
      case 'lang': setLang(target.dataset.lang); break;
      case 'theme': toggleTheme(); break;
      case 'open-job': openJobModal(id); break;
      case 'open-project': openProjectModal(id); break;
      case 'toggle-cert': toggleCert(id); break;
      case 'close-modal': closeModal(); break;
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.modal) { closeModal(); return; }
    if (e.key === 'Tab' && state.modal) { trapModalFocus(e); return; }
    // div-based buttons (cards, accordion headers) respond to Enter/Space like real buttons
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[role="button"][data-action]')) {
      e.preventDefault();
      e.target.click();
    }
  });

  window.addEventListener('popstate', () => { if (state.modal) closeModal(true); });
  window.addEventListener('scroll', onScroll, { passive: true });
  let resizeTimer;
  window.addEventListener('resize', () => {
    if (state.openCert != null) setCertOpen(state.openCert, true);
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { if (state.data) initPosters(readInk()); }, 200);
  });

  // ────────────────────────────────────────────────────────────────────────
  // Init
  // ────────────────────────────────────────────────────────────────────────
  // Opening (first load only, skipped with reduced motion): the name sets in letter by
  // letter while the orb develops from blank paper.
  function playIntro() {
    if (reducedMotion.matches || window.scrollY > 40) return;
    const root = document.documentElement;
    root.classList.add('intro');
    developOrb();
    setTimeout(() => root.classList.remove('intro'), 2600); // a later re-render won't replay it
  }

  applyTheme(state.theme);
  const appRoot = document.getElementById('app');
  appRoot.setAttribute('aria-busy', 'true');
  loadContent().then((data) => {
    state.data = data;
    renderApp();
    playIntro();
    appRoot.removeAttribute('aria-busy');
    spy();
  });
})();
