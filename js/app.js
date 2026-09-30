(function () {
  'use strict';

  // ────────────────────────────────────────────────────────────────────────
  // Config (mirrors the DC prototype's editor props, hardcoded for the site)
  // ────────────────────────────────────────────────────────────────────────
  const EMBER_COUNT = 14;
  const FOG_INTENSITY = 0.55;
  const DEFAULT_LANG = 'pt';
  const FORGE_DEFAULT_PASS = 'vigilante';

  // ────────────────────────────────────────────────────────────────────────
  // Data
  // ────────────────────────────────────────────────────────────────────────
  const PORTFOLIO_DATA = {
    personal: {
      name: 'Wellington Luiz',
      title: { pt: 'Desenvolvedor de Software', en: 'Software Developer' },
      bio: {
        pt: 'Olá! Sou o Wellington, tenho 21 anos, estudante de Análise e Desenvolvimento de Sistemas (ADS) no IFRO e estagiário na Prefeitura de Ariquemes. Meu foco está em estudar engenharia de software e construir side projects práticos para aplicar conceitos e testar novas tecnologias. Utilizo IA de forma estratégica para acelerar o aprendizado e otimizar meu fluxo de desenvolvimento. Sou movido por disciplina diária e evolução contínua, buscando dominar clean code e lógica de programação para alcançar meu maior objetivo: atuar no setor aeroespacial.',
        en: "Hi! I'm Wellington, 21, a Systems Analysis and Development student at IFRO and an intern at Ariquemes City Hall. I focus on software engineering and practical side projects to apply concepts and test new technologies, using AI strategically to speed up learning and optimize my workflow. Driven by daily discipline and continuous evolution, mastering clean code and programming logic toward my long-term goal: the aerospace industry.",
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
        id: 7, title: 'TRIRREME', badge: 'SÓCIO-FUNDADOR',
        tags: ['Sistemas sob medida', 'Web', 'Automação', 'Vercel'],
        shortDesc: { pt: 'Empresa de desenvolvimento de software que fundei com dois sócios: sistemas sob medida, sites e automações para empresas.', en: 'Software development company I co-founded with two partners: custom systems, websites and automation for businesses.' },
        longDesc: { pt: 'Sou sócio-fundador da TRIRREME, empresa de tecnologia criada com dois colegas de ADS do IFRO. Desenvolvemos sistemas sob medida (gestão de pedidos e estoque em tempo real), sites e catálogos digitais integrados ao WhatsApp, automações e integrações com planilhas e ERPs, além de consultoria, suporte e hospedagem. Trabalhamos com escopo, prazo e preço fechados, metodologia em etapas e entregas quinzenais.', en: 'I am a co-founder of TRIRREME, a tech company started with two fellow Systems Analysis students from IFRO. We build custom systems (real-time order and inventory management), websites and digital catalogs integrated with WhatsApp, automations and integrations with spreadsheets and ERPs, plus consulting, support and hosting. We work with fixed scope, timeline and price, a staged methodology and bi-weekly deliveries.' },
        links: [{ label: 'Site', url: 'https://trirreme.com/' }],
      },
      {
        id: 3, title: 'CustoDoce', badge: '1º LUGAR — HACKATHON IFRO',
        tags: ['Flutter', 'Dart', 'Firebase', 'Riverpod', 'SQLite'],
        shortDesc: { pt: 'Calculadora de custos definitiva para confeiteiros e padeiros artesanais.', en: 'The definitive cost calculator for artisanal bakers and confectioners.' },
        longDesc: { pt: 'Aplicativo multiplataforma (Android e Web) que resolve a precificação artesanal de ponta a ponta: cadastro de ingredientes, receitas inteligentes com cálculo em tempo real, gestão de custos invisíveis e assistente de IA integrado (Google Gemini). 1º Lugar na categoria "Desafio Livre de Impacto Regional" na Hackathon Extensionista IFRO Ariquemes 2026/1.', en: 'Cross-platform app (Android and Web) that solves artisanal pricing end to end: ingredient registry, smart recipes with real-time cost calculation, hidden-cost management and an integrated AI assistant (Google Gemini). 1st place in the "Regional Impact Open Challenge" at the IFRO Ariquemes Extension Hackathon 2026/1.' },
        links: [{ label: 'Live MVP', url: 'https://custodoce-b07ce.web.app' }, { label: 'GitHub', url: 'https://github.com/WellingtonPereiraLuiz/CustoDoce' }],
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
        id: 1, name: '1º Lugar — Hackathon Extensionista IFRO Ariquemes 2026/1',
        issuer: 'IFRO Campus Ariquemes (Categoria: Impacto Regional)',
        description: { pt: 'Participação e vitória na Hackathon Extensionista IFRO 2026/1 com a equipe CoreMetrics. O evento focou em soluções tecnológicas para problemas reais da região, unindo IFRO, Sebrae e comunidade. Desenvolvemos o CustoDoce, app de precificação para microempreendedores, conquistando o 1º Lugar na categoria "Desafio Livre de Impacto Regional" com um MVP funcional e uso documentado de IA.', en: 'Victory with team CoreMetrics at the IFRO 2026/1 Extension Hackathon, focused on tech solutions for real regional problems together with IFRO, Sebrae and the community. We built CustoDoce, a pricing app for micro-entrepreneurs, winning 1st place in the "Regional Impact Open Challenge" with a working MVP and documented use of AI.' },
        startDate: 'Semestre 2026/1', endDate: 'Culminância 2026/1', hours: 40,
        institution: 'Centro de Empreendedorismo e Inovação — IFRO Ariquemes',
        links: [{ label: 'MVP CustoDoce', url: 'https://custodoce-b07ce.web.app' }, { label: 'GitHub', url: 'https://github.com/WellingtonPereiraLuiz/CustoDoce' }, { label: 'Edital', url: 'https://hackathon-ifro.bolt.host/' }],
      },
      {
        id: 2, name: 'IV Webinar de Empreendedorismo, Ciência, Inovação e Tecnologia (WECIT)',
        issuer: 'Instituto Federal de Rondônia — Campus Ariquemes',
        description: { pt: 'Participação e apresentação de projeto no IV WECIT 2025, evento que discutiu Cidades Inteligentes sob a ótica da tecnologia e inovação. Envolveu a apresentação de trabalhos dos acadêmicos de ADS (Curricularização da Extensão), conectando teoria a demandas reais da comunidade e do mercado. Concluído com êxito em dezembro de 2025.', en: 'Participation and project presentation at IV WECIT 2025, discussing Smart Cities through the lens of technology and innovation. Involved presenting work built by Systems Analysis students, connecting classroom theory to real community and market demands. Successfully concluded in December 2025.' },
        startDate: '09 Dez 2025', endDate: '11 Dez 2025', hours: 20,
        institution: 'IFRO Campus Ariquemes (Transmissão via YouTube)',
        links: [{ label: 'Site WECIT', url: 'http://www.wecit.com.br' }],
      },
    ],
    career: [
      {
        id: 3, company: 'ILYSYN Systems',
        role: { pt: 'Desenvolvedor — Período de Avaliação', en: 'Developer — Trial Period' },
        period: { pt: 'Set 2026 — Presente', en: 'Sep 2026 — Present' },
        shortDesc: { pt: 'Período de avaliação de 3 meses para contratação como desenvolvedor: desenvolvimento assistido por IA e prospecção de clientes.', en: '3-month trial period toward a developer position: AI-assisted development and client prospecting.' },
        description: { pt: 'Desenvolvimento de sistemas e sites, prospecção de clientes no mercado dos EUA e participação em análises técnicas, seguindo boas práticas de engenharia de software com apoio de IA.' },
        achievements: { pt: ['Desenvolvimento com IA', 'Front-end', 'Prospecção Outbound'], en: ['AI-Assisted Development', 'Front-end', 'Outbound Prospecting'] },
      },
      {
        id: 1, company: 'Prefeitura de Ariquemes',
        role: { pt: 'Estagiário de TI', en: 'IT Intern' },
        period: { pt: 'Abr 2026 — Presente', en: 'Apr 2026 — Present' },
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
      nav: { sobre: 'SOBRE', carreira: 'CARREIRA', projetos: 'PROJETOS', certificacoes: 'CERTIFICAÇÕES' },
      heroKicker: '// DESENVOLVEDOR DE SOFTWARE',
      ctaProjects: 'VER PROJETOS', scrollHint: 'ROLE PARA EXPLORAR',
      chAbout: 'CAPÍTULO 01 — A ALMA', hAbout: 'Sobre mim',
      bioLabel: '◈ QUEM SOU', eduLabel: 'EDUCAÇÃO', langLabel: 'IDIOMAS', locLabel: 'LOCALIZAÇÃO',
      stackLabel: '◈ ARSENAL TÉCNICO', roadmapLabel: '◈ ROTA DE ASCENSÃO',
      chCareer: 'CAPÍTULO 02 — REGISTROS', hCareer: 'Carreira', sCareer: 'Cada posição, um fragmento de experiência gravado no vazio.',
      chProjects: 'CAPÍTULO 03 — ARTEFATOS', hProjects: 'Projetos', sProjects: 'Obras forjadas com engenharia de precisão.',
      chCerts: 'CAPÍTULO 04 — SELOS', hCerts: 'Certificações', sCerts: 'Credenciais conquistadas com dedicação.',
      viewDetails: 'VER DETALHES', close: 'FECHAR',
      mStart: 'INÍCIO', mEnd: 'CONCLUSÃO', mHours: 'CARGA HORÁRIA', mInst: 'INSTITUIÇÃO',
      modalProject: '◈ ARTEFATO', modalCareer: '◈ REGISTRO DE CARREIRA',
      footer: '© 2026 WELLINGTON PEREIRA LUIZ. TODOS OS DIREITOS RESERVADOS.',
      emailCopied: 'E-mail copiado: ', emailCopyFail: 'Meu e-mail: ',
    },
    en: {
      nav: { sobre: 'ABOUT', carreira: 'CAREER', projetos: 'PROJECTS', certificacoes: 'CERTIFICATIONS' },
      heroKicker: '// SOFTWARE DEVELOPER',
      ctaProjects: 'VIEW PROJECTS', scrollHint: 'SCROLL TO EXPLORE',
      chAbout: 'CHAPTER 01 — THE SOUL', hAbout: 'About me',
      bioLabel: '◈ WHO I AM', eduLabel: 'EDUCATION', langLabel: 'LANGUAGES', locLabel: 'LOCATION',
      stackLabel: '◈ TECH ARSENAL', roadmapLabel: '◈ ASCENSION PATH',
      chCareer: 'CHAPTER 02 — RECORDS', hCareer: 'Career', sCareer: 'Each position, a fragment of experience etched into the void.',
      chProjects: 'CHAPTER 03 — ARTIFACTS', hProjects: 'Projects', sProjects: 'Works forged with precision engineering.',
      chCerts: 'CHAPTER 04 — SEALS', hCerts: 'Certifications', sCerts: 'Credentials earned through dedication.',
      viewDetails: 'VIEW DETAILS', close: 'CLOSE',
      mStart: 'START', mEnd: 'END', mHours: 'TOTAL HOURS', mInst: 'INSTITUTION',
      modalProject: '◈ ARTIFACT', modalCareer: '◈ CAREER RECORD',
      footer: '© 2026 WELLINGTON PEREIRA LUIZ. ALL RIGHTS RESERVED.',
      emailCopied: 'Email copied: ', emailCopyFail: 'My email: ',
    },
  };

  const SECTION_IDS = ['sobre', 'carreira', 'projetos', 'certificacoes'];

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
  function storeRemove(key) {
    try { localStorage.removeItem(key); } catch (e) {}
  }

  const DATA_KEY = 'wl_portfolio_data';
  function defaultData() {
    return JSON.parse(JSON.stringify(PORTFOLIO_DATA));
  }

  const isObj = (v) => v != null && typeof v === 'object' && !Array.isArray(v);
  const isText = (v) => typeof v === 'string' || (isObj(v) && typeof v.pt === 'string');
  const isStrList = (v) => Array.isArray(v) && v.every((s) => typeof s === 'string');
  const isLinks = (v) => v === undefined || (Array.isArray(v) && v.every((l) => isObj(l) && typeof l.url === 'string'));
  const isChips = (v) => v === undefined || (isObj(v) && isStrList(v.pt) && (v.en === undefined || isStrList(v.en)));

  // Returns '' when the data has the shape the renderers expect, else a description of the first problem.
  function dataError(d) {
    if (!isObj(d)) return 'os dados não são um objeto';
    const p = d.personal;
    if (!isObj(p)) return '"personal" ausente';
    for (const k of ['name', 'location', 'github', 'email']) {
      if (typeof p[k] !== 'string') return `personal.${k} deve ser texto`;
    }
    for (const k of ['title', 'bio', 'education', 'languages', 'quote']) {
      if (!isText(p[k])) return `personal.${k} deve ser texto ou { pt, en }`;
    }
    const itemChecks = {
      techStack: (g) => isText(g.category) && isStrList(g.items),
      roadmap: (r) => isText(r.title) && isText(r.desc),
      projects: (x) => x.id != null && typeof x.title === 'string' && isStrList(x.tags)
        && isText(x.shortDesc) && isText(x.longDesc) && isLinks(x.links),
      certifications: (c) => c.id != null && typeof c.name === 'string' && isText(c.description) && isLinks(c.links),
      career: (j) => j.id != null && typeof j.company === 'string' && isText(j.role) && isText(j.period)
        && isText(j.shortDesc) && isText(j.description) && isChips(j.achievements),
    };
    for (const [key, ok] of Object.entries(itemChecks)) {
      if (!Array.isArray(d[key])) return `"${key}" deve ser uma lista`;
      const bad = d[key].findIndex((item) => !isObj(item) || !ok(item));
      if (bad !== -1) return `${key}[${bad}] tem campos faltando ou com formato errado`;
    }
    return '';
  }

  function loadData() {
    let raw = null;
    try { raw = JSON.parse(storeGet(DATA_KEY)); } catch (e) {}
    if (!raw) return defaultData();
    // fill fields added to PORTFOLIO_DATA after this copy was saved
    const defaults = defaultData();
    const merged = { ...defaults, ...raw, personal: { ...defaults.personal, ...raw.personal } };
    const err = dataError(merged);
    if (err) {
      console.warn('Dados salvos no navegador descartados:', err);
      storeRemove(DATA_KEY);
      return defaults;
    }
    return merged;
  }
  function saveData(data) {
    return storeSet(DATA_KEY, JSON.stringify(data));
  }

  // ────────────────────────────────────────────────────────────────────────
  // State
  // ────────────────────────────────────────────────────────────────────────
  const state = {
    lang: ['pt', 'en'].includes(storeGet('wl_lang')) ? storeGet('wl_lang') : DEFAULT_LANG,
    active: 'sobre',
    data: loadData(),
    modal: null,
    openCert: null,
    route: window.location.hash === '#forge' ? 'forge' : 'site',
    authed: false,
    authError: '',
  };
  let adminEdits = {};
  let adminJsonEdits = {};
  let passTry = '';
  let newPass = '';

  // ────────────────────────────────────────────────────────────────────────
  // Atmosphere: fog + embers (built once)
  // ────────────────────────────────────────────────────────────────────────
  const fogEl = document.getElementById('fogLayer');
  fogEl.style.opacity = String(FOG_INTENSITY);

  function buildEmbers() {
    const layer = document.getElementById('embersLayer');
    const colors = ['#00dbe7', '#e5e2e1', '#00dbe7', '#ffb1c4'];
    const frag = document.createDocumentFragment();
    for (let i = 0; i < EMBER_COUNT; i++) {
      const span = document.createElement('span');
      const size = (1 + Math.random() * 2.2).toFixed(1) + 'px';
      const dur = (8 + Math.random() * 14).toFixed(1) + 's';
      const delay = (Math.random() * 12).toFixed(1) + 's';
      span.className = 'ember';
      span.style.left = (Math.random() * 98 + 1).toFixed(1) + '%';
      span.style.width = size;
      span.style.height = size;
      span.style.background = colors[i % colors.length];
      span.style.animationDuration = dur;
      span.style.animationDelay = delay;
      frag.appendChild(span);
    }
    layer.appendChild(frag);
  }

  let surging = false;
  function fogSurge() {
    if (surging) return;
    surging = true;
    fogEl.classList.add('surge');
    setTimeout(() => { fogEl.classList.remove('surge'); surging = false; }, 1700);
  }

  // ────────────────────────────────────────────────────────────────────────
  // Rendering: main app (nav + sections + footer)
  // ────────────────────────────────────────────────────────────────────────
  // If saved data still breaks rendering, fall back to PORTFOLIO_DATA so the page
  // (and the editor at #forge) never ends up blank.
  function renderApp() {
    try {
      renderPage();
    } catch (err) {
      console.error('Falha ao renderizar os dados salvos; voltando aos dados padrão.', err);
      storeRemove(DATA_KEY);
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
      renderHero(t, p, heroBioShort) +
      renderAbout(t, data, p, bioFull) +
      renderCareer(t, data) +
      renderProjects(t, data) +
      renderCertifications(t, data) +
      renderFooter(t, p);

    initReveal();
    initCertHeights();
    updateNavActive();
  }

  function renderNav(t) {
    const navLinks = SECTION_IDS.map((id) =>
      `<a href="#${id}" data-action="goto" data-id="${id}" data-nav-id="${id}">${esc(t.nav[id])}</a>`
    ).join('');
    return `
    <nav class="navbar">
      <button class="navbar-brand" data-action="goto" data-id="sobre">◆ W.LUIZ</button>
      <div class="navbar-right">
        <div class="navbar-nav">${navLinks}</div>
        <div class="navbar-lang">
          ${langButton('pt')}
          <span>·</span>
          ${langButton('en')}
        </div>
      </div>
    </nav>`;
  }

  function langButton(lang) {
    const on = state.lang === lang;
    return `<button class="${on ? 'active' : ''}" aria-pressed="${on}" data-action="lang" data-lang="${lang}">${lang.toUpperCase()}</button>`;
  }

  function renderHero(t, p, heroBioShort) {
    return `
    <section id="sobre" data-screen-label="Sobre">
      <div class="hero">
        <div class="hero-watermark">W</div>
        <div class="corner corner-tl"></div>
        <div class="corner corner-tr"></div>
        <div class="hero-content">
          <div class="hero-main">
            <div class="hero-kicker" data-reveal>${esc(t.heroKicker)}</div>
            <div class="hero-name" data-reveal>${esc(p.name)}</div>
            <div class="hero-bio" data-reveal>${esc(heroBioShort)}</div>
            <div class="hero-cta" data-reveal>
              <button class="btn-solid" data-action="goto" data-id="projetos">${esc(t.ctaProjects)}</button>
              <a class="btn-outline" href="${esc(p.github)}" target="_blank" rel="noopener noreferrer">GITHUB</a>
              <a class="btn-outline" href="mailto:${esc(p.email)}" data-action="email">E-MAIL</a>
            </div>
          </div>
          <div class="hero-panel" data-reveal>
            <div class="hero-panel-label">${esc(t.eduLabel)}</div>
            <div class="hero-panel-value">${esc(tr(p.education, state.lang))}</div>
            <div class="hero-panel-label">${esc(t.locLabel)}</div>
            <div class="hero-panel-value">${esc(p.location)}</div>
            <div class="hero-panel-label">${esc(t.langLabel)}</div>
            <div class="hero-panel-value">${esc(tr(p.languages, state.lang))}</div>
          </div>
        </div>
        <div class="scroll-hint">
          <span>${esc(t.scrollHint)}</span>
          <span class="arrow">▾</span>
        </div>
        <div class="corner corner-bl"></div>
        <div class="corner corner-br"></div>
      </div>
  `;
  }

  function renderAbout(t, data, p, bioFull) {
    const stackGroups = data.techStack.map((g) => `
      <div class="stack-group">
        <div class="stack-group-title">${esc(tr(g.category, state.lang))}</div>
        <div class="stack-items">
          ${g.items.map((i) => `<span class="stack-chip">● ${esc(i)}</span>`).join('')}
        </div>
      </div>`).join('');

    const roadmapItems = data.roadmap.map((r) => `
      <div class="roadmap-item">
        <div class="roadmap-title">${esc(tr(r.title, state.lang))}</div>
        <div class="roadmap-desc">${esc(tr(r.desc, state.lang))}</div>
      </div>`).join('');

    return `
      <div class="about-inner">
        <div class="about-head" data-reveal>
          <div class="section-kicker">${esc(t.chAbout)}</div>
          <div class="section-title">${esc(t.hAbout)}</div>
        </div>
        <div class="bento">
          <div class="card card-bio" data-reveal>
            <div class="card-label">${esc(t.bioLabel)}</div>
            <div class="card-bio-text">${esc(bioFull)}</div>
          </div>
          <div class="card card-quote" data-reveal>
            <div class="quote-mark">◆</div>
            <div class="quote-text">${esc(tr(p.quote, state.lang))}</div>
            <div class="quote-line"></div>
          </div>
          <div class="card card-stack" data-reveal>
            <div class="card-label">${esc(t.stackLabel)}</div>
            <div class="stack-groups">${stackGroups}</div>
          </div>
          <div class="card card-roadmap" data-reveal>
            <div class="card-label">${esc(t.roadmapLabel)}</div>
            ${roadmapItems}
          </div>
        </div>
      </div>
    </section>`;
  }

  function renderCareer(t, data) {
    const items = data.career.map((job) => {
      const chips = (job.achievements && (job.achievements[state.lang] || job.achievements.pt)) || [];
      return `
      <div class="job-card" data-reveal data-action="open-job" data-id="${esc(job.id)}" role="button" tabindex="0" aria-haspopup="dialog">
        <div class="job-dot"></div>
        <div class="job-period">${esc(tr(job.period, state.lang))}</div>
        <div class="job-role">${esc(tr(job.role, state.lang))}</div>
        <div class="job-company">${esc(job.company)}</div>
        <div class="job-short">${esc(tr(job.shortDesc, state.lang))}</div>
        <div class="chip-row">${chips.map((c) => `<span class="chip">${esc(c)}</span>`).join('')}</div>
        <div class="view-details">${esc(t.viewDetails)} →</div>
      </div>`;
    }).join('');

    return `
    <section id="carreira" data-screen-label="Carreira">
      <div class="section-inner">
        <div class="section-head" data-reveal>
          <div class="section-kicker">${esc(t.chCareer)}</div>
          <div class="section-title">${esc(t.hCareer)}</div>
          <div class="section-sub">${esc(t.sCareer)}</div>
        </div>
        <div class="timeline">
          <div class="timeline-line"></div>
          ${items}
        </div>
      </div>
    </section>`;
  }

  function renderProjects(t, data) {
    const items = data.projects.map((pj, i) => {
      const n = String(i + 1).padStart(2, '0');
      const badge = pj.badge ? `<span class="project-badge">${esc(pj.badge)}</span>` : '';
      return `
      <div class="project-card" data-reveal data-action="open-project" data-id="${esc(pj.id)}" role="button" tabindex="0" aria-haspopup="dialog">
        <div class="project-topline"></div>
        <div class="project-index" aria-hidden="true">${n}</div>
        <div class="project-kicker">◆ Nº ${n}</div>
        <div class="project-head-row">
          <div class="project-title">${esc(pj.title)}</div>
          ${badge}
        </div>
        <div class="project-short">${esc(tr(pj.shortDesc, state.lang))}</div>
        <div class="project-tags">${pj.tags.map((tg) => `<span class="tag">${esc(tg)}</span>`).join('')}</div>
        <div class="view-details">${esc(t.viewDetails)} →</div>
      </div>`;
    }).join('');

    return `
    <section id="projetos" data-screen-label="Projetos">
      <div class="section-inner">
        <div class="section-head" data-reveal>
          <div class="section-kicker">${esc(t.chProjects)}</div>
          <div class="section-title">${esc(t.hProjects)}</div>
          <div class="section-sub">${esc(t.sProjects)}</div>
        </div>
        <div class="project-grid">${items}</div>
      </div>
    </section>`;
  }

  function renderCertifications(t, data) {
    const items = data.certifications.map((c) => {
      const metas = [
        { label: t.mStart, value: c.startDate },
        { label: t.mEnd, value: c.endDate },
        { label: t.mHours, value: c.hours + 'h' },
        { label: t.mInst, value: c.institution },
      ];
      const links = (c.links || []).map((lk) =>
        `<a class="cert-link" href="${esc(lk.url)}" target="_blank" rel="noopener noreferrer">${esc(lk.label)} ↗</a>`
      ).join('');
      return `
      <div class="cert-card" data-reveal data-cert-id="${esc(c.id)}">
        <div class="cert-topline"></div>
        <div class="cert-head" data-action="toggle-cert" data-id="${esc(c.id)}" role="button" tabindex="0" aria-expanded="false" aria-controls="cert-body-${esc(c.id)}">
          <div>
            <div class="cert-name">${esc(c.name)}</div>
            <div class="cert-issuer">${esc(c.issuer)}</div>
          </div>
          <div class="cert-chev">+</div>
        </div>
        <div class="cert-collapse" id="cert-body-${esc(c.id)}">
          <div class="cert-body">
            <div class="cert-line"></div>
            <div class="cert-desc">${esc(tr(c.description, state.lang))}</div>
            <div class="cert-metas">
              ${metas.map((m) => `<div class="cert-meta"><div class="cert-meta-label">${esc(m.label)}</div><div class="cert-meta-value">${esc(m.value)}</div></div>`).join('')}
            </div>
            <div class="cert-links">${links}</div>
          </div>
        </div>
      </div>`;
    }).join('');

    return `
    <section id="certificacoes" data-screen-label="Certificações">
      <div class="section-inner">
        <div class="section-head" data-reveal>
          <div class="section-kicker">${esc(t.chCerts)}</div>
          <div class="section-title">${esc(t.hCerts)}</div>
          <div class="section-sub">${esc(t.sCerts)}</div>
        </div>
        <div class="cert-list">${items}</div>
      </div>
    </section>`;
  }

  function renderFooter(t, p) {
    return `
    <footer class="site-footer">
      <div class="footer-copy">${esc(t.footer)}</div>
      <div class="footer-links">
        <a href="${esc(p.github)}" target="_blank" rel="noopener noreferrer">GITHUB</a>
        <a href="mailto:${esc(p.email)}" data-action="email">${esc(p.email)}</a>
      </div>
    </footer>`;
  }

  // ────────────────────────────────────────────────────────────────────────
  // Reveal-on-scroll
  // ────────────────────────────────────────────────────────────────────────
  let io;
  function initReveal() {
    if (!io) {
      io = new IntersectionObserver((entries) => {
        const batch = entries.filter((en) => en.isIntersecting);
        batch.forEach((en, i) => {
          const el = en.target;
          const delay = Math.min(i * 110, 440);
          el.style.setProperty('--rv-delay', delay + 'ms');
          el.classList.add('revealed');
          io.unobserve(el);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    }
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9) {
        el.classList.add('revealed-instant');
        return;
      }
      io.observe(el);
    });
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
      a.classList.toggle('active', a.getAttribute('data-nav-id') === state.active);
    });
  }

  let suppressSpy = false;
  let spyTimer;
  let rafId;
  function onScroll() {
    if (rafId) return;
    rafId = requestAnimationFrame(() => { rafId = null; spy(); });
  }
  function spy() {
    if (state.route === 'forge' || suppressSpy) return;
    const mid = window.innerHeight * 0.35;
    let active = 'sobre';
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= mid) active = id;
    }
    if (active !== state.active) {
      state.active = active;
      updateNavActive();
      fogSurge();
    }
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
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
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: scrollBehavior() });
    }
    fogSurge();
    spyTimer = setTimeout(() => { suppressSpy = false; spy(); }, 1200);
  }

  // ────────────────────────────────────────────────────────────────────────
  // Language
  // ────────────────────────────────────────────────────────────────────────
  function setLang(lang) {
    if (lang !== 'pt' && lang !== 'en') return;
    storeSet('wl_lang', lang);
    state.lang = lang;
    closeModal();
    renderApp();
  }

  // ────────────────────────────────────────────────────────────────────────
  // Modal
  // ────────────────────────────────────────────────────────────────────────
  let modalOpener = null;
  function openModal(m) {
    modalOpener = document.activeElement;
    state.modal = m;
    renderModal();
    document.querySelector('#modalRoot .modal-close').focus();
  }
  function closeModal() {
    if (!state.modal) return;
    state.modal = null;
    document.getElementById('modalRoot').innerHTML = '';
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
    const chips = (m.chips || []).map((c) => `<span class="chip">${esc(c)}</span>`).join('');
    const links = (m.links || []).map((lk, i) =>
      `<a class="modal-link ${i === 0 ? 'primary' : 'secondary'}" href="${esc(lk.url)}" target="_blank" rel="noopener noreferrer">${esc((lk.label || '').toUpperCase())} ↗</a>`
    ).join('');
    root.innerHTML = `
      <div class="modal-overlay" data-action="close-modal-overlay">
        <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
          <div class="modal-topline"></div>
          <div class="modal-corner modal-corner-tl"></div>
          <div class="modal-corner modal-corner-br"></div>
          <button type="button" class="modal-close" data-action="close-modal">✕ ${esc(t.close)}</button>
          <div class="modal-kicker">${esc(m.kicker)}</div>
          <div class="modal-title" id="modalTitle">${esc(m.title)}</div>
          <div class="modal-line"></div>
          ${m.sub ? `<div class="modal-sub">${esc(m.sub)}</div>` : ''}
          <div class="modal-chips">${chips}</div>
          <div class="modal-desc">${esc(m.desc)}</div>
          <div class="modal-links">${links}</div>
        </div>
      </div>`;
  }

  function openJobModal(id) {
    const t = LABELS[state.lang] || LABELS.pt;
    const job = state.data.career.find((j) => String(j.id) === String(id));
    if (!job) return;
    const chips = (job.achievements && (job.achievements[state.lang] || job.achievements.pt)) || [];
    openModal({
      kicker: t.modalCareer, title: tr(job.role, state.lang),
      sub: job.company + '  ·  ' + tr(job.period, state.lang),
      chips, desc: tr(job.description, state.lang), links: [],
    });
  }

  function openProjectModal(id) {
    const t = LABELS[state.lang] || LABELS.pt;
    const pj = state.data.projects.find((p) => String(p.id) === String(id));
    if (!pj) return;
    openModal({
      kicker: t.modalProject, title: pj.title, sub: '',
      chips: pj.tags, desc: tr(pj.longDesc, state.lang),
      links: pj.links || [],
    });
  }

  // ────────────────────────────────────────────────────────────────────────
  // Toast
  // ────────────────────────────────────────────────────────────────────────
  let toastTimer;
  function showToast(msg) {
    const root = document.getElementById('toastRoot');
    root.innerHTML = `<div class="toast">${esc(msg)}</div>`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { root.innerHTML = ''; }, 3200);
  }

  // ────────────────────────────────────────────────────────────────────────
  // Forge (hidden admin at #forge)
  // ────────────────────────────────────────────────────────────────────────
  function passKey() { return storeGet('wl_forge_pass') || FORGE_DEFAULT_PASS; }

  function checkHash() {
    const forge = window.location.hash === '#forge';
    state.route = forge ? 'forge' : 'site';
    if (forge) { adminEdits = {}; adminJsonEdits = {}; passTry = ''; newPass = ''; }
    renderForge();
  }

  const ADMIN_SECTIONS = [
    { key: 'techStack', label: 'ARSENAL TÉCNICO (JSON)', hint: 'Lista de grupos: { category: {pt,en}, items: ["..."] }' },
    { key: 'roadmap', label: 'ROTA DE ASCENSÃO (JSON)', hint: 'Lista de metas: { title: {pt,en}, desc: {pt,en} }' },
    { key: 'projects', label: 'PROJETOS (JSON)', hint: 'Campos: id, title, badge, tags[], shortDesc{pt,en}, longDesc{pt,en}, links[{label,url}]' },
    { key: 'certifications', label: 'CERTIFICAÇÕES (JSON)', hint: 'Campos: id, name, issuer, description{pt,en}, startDate, endDate, hours, institution, links[]' },
    { key: 'career', label: 'CARREIRA (JSON)', hint: 'Campos: id, role{pt,en}, company, period{pt,en}, shortDesc{pt,en}, description{pt,en}, achievements{pt[],en[]}' },
  ];

  function renderForge() {
    const root = document.getElementById('forgeRoot');
    if (state.route !== 'forge') { root.innerHTML = ''; return; }
    if (!state.authed) {
      root.innerHTML = `
      <div class="forge-overlay">
        <div class="forge-gate">
          <div class="forge-gate-box">
            <div class="forge-kicker">◆ A FORJA</div>
            <div class="forge-title">Acesso restrito</div>
            <div class="forge-hint">Somente o ferreiro conhece a palavra que acende esta chama.</div>
            <input type="password" class="forge-input" placeholder="Senha" id="forgePassInput" autocomplete="off">
            ${state.authError ? `<div class="forge-error">${esc(state.authError)}</div>` : ''}
            <button class="forge-btn-solid" data-action="forge-login">ENTRAR</button>
            <button class="forge-btn-ghost" data-action="forge-exit">← VOLTAR AO PORTFÓLIO</button>
          </div>
        </div>
      </div>`;
      const input = document.getElementById('forgePassInput');
      if (input) {
        input.addEventListener('input', (e) => { passTry = e.target.value; });
        input.addEventListener('keydown', (e) => { if (e.key === 'Enter') forgeLogin(); });
        input.focus();
      }
      return;
    }

    const p = state.data.personal;
    const fields = [
      { field: 'name', label: 'NOME', value: p.name, area: false },
      { field: 'location', label: 'LOCALIZAÇÃO', value: p.location, area: false },
      { field: 'title_pt', label: 'TÍTULO (PT)', value: p.title.pt, area: false },
      { field: 'title_en', label: 'TÍTULO (EN)', value: p.title.en, area: false },
      { field: 'bio_pt', label: 'BIO (PT)', value: p.bio.pt, area: true },
      { field: 'bio_en', label: 'BIO (EN)', value: p.bio.en, area: true },
      { field: 'education_pt', label: 'EDUCAÇÃO (PT)', value: p.education.pt, area: false },
      { field: 'education_en', label: 'EDUCAÇÃO (EN)', value: p.education.en, area: false },
      { field: 'languages_pt', label: 'IDIOMAS (PT)', value: p.languages.pt, area: false },
      { field: 'languages_en', label: 'IDIOMAS (EN)', value: p.languages.en, area: false },
      { field: 'quote_pt', label: 'CITAÇÃO (PT)', value: p.quote.pt, area: false },
      { field: 'quote_en', label: 'CITAÇÃO (EN)', value: p.quote.en, area: false },
      { field: 'github', label: 'GITHUB (URL)', value: p.github, area: false },
      { field: 'email', label: 'E-MAIL', value: p.email, area: false },
    ];
    const fieldsHtml = fields.map((f) => `
      <div class="forge-field ${f.area ? 'span-full' : ''}">
        <div class="forge-field-label">${esc(f.label)}</div>
        ${f.area
          ? `<textarea rows="4" class="forge-input" data-field="${esc(f.field)}">${esc(f.value)}</textarea>`
          : `<input class="forge-input" data-field="${esc(f.field)}" value="${esc(f.value)}">`}
      </div>`).join('');

    const sectionsHtml = ADMIN_SECTIONS.map((s) => `
      <div class="forge-section">
        <div class="forge-section-title">▸ ${esc(s.label)}</div>
        <div class="forge-section-hint">${esc(s.hint)}</div>
        <textarea rows="12" class="forge-json" data-section="${esc(s.key)}" spellcheck="false">${esc(JSON.stringify(state.data[s.key], null, 2))}</textarea>
      </div>`).join('');

    root.innerHTML = `
    <div class="forge-overlay">
      <div class="forge-panel">
        <div class="forge-panel-head">
          <div>
            <div class="forge-kicker">◆ A FORJA</div>
            <div class="forge-panel-title">Painel do Ferreiro</div>
          </div>
          <div class="forge-actions">
            <button class="forge-btn forge-btn-primary" data-action="forge-save">SALVAR</button>
            <button class="forge-btn forge-btn-outline" data-action="forge-copy">COPIAR PORTFOLIO_DATA</button>
            <button class="forge-btn forge-btn-outline" data-action="forge-download">BAIXAR JSON</button>
            <button class="forge-btn forge-btn-danger" data-action="forge-reset">RESTAURAR PADRÃO</button>
            <button class="forge-btn forge-btn-muted" data-action="forge-exit">SAIR</button>
          </div>
        </div>
        <div class="forge-note">As alterações salvas ficam neste navegador (localStorage) e o site já reflete tudo na hora. Use <code>COPIAR PORTFOLIO_DATA</code> para gerar o bloco pronto e colar no <code>js/app.js</code> do seu repositório.</div>

        <div class="forge-section">
          <div class="forge-section-title">▸ DADOS PESSOAIS</div>
          <div class="forge-fields">${fieldsHtml}</div>
        </div>

        ${sectionsHtml}

        <div class="forge-security">
          <div class="forge-section-title">▸ SEGURANÇA</div>
          <div class="forge-security-row">
            <input type="password" class="forge-input" placeholder="Nova senha" id="forgeNewPass" autocomplete="off">
            <button class="forge-btn forge-btn-outline" data-action="forge-changepass">ALTERAR SENHA</button>
          </div>
        </div>
      </div>
    </div>`;

    const newPassInput = document.getElementById('forgeNewPass');
    if (newPassInput) newPassInput.addEventListener('input', (e) => { newPass = e.target.value; });

    root.querySelectorAll('[data-field]').forEach((el) => {
      el.addEventListener('change', (e) => { adminEdits[e.target.dataset.field] = e.target.value; });
    });
    root.querySelectorAll('[data-section]').forEach((el) => {
      el.addEventListener('change', (e) => { adminJsonEdits[e.target.dataset.section] = e.target.value; });
    });
  }

  function forgeLogin() {
    if ((passTry || '') === passKey()) {
      state.authed = true;
      state.authError = '';
    } else {
      state.authError = 'Senha incorreta. A chama não acendeu.';
    }
    renderForge();
  }

  function forgeExit() {
    state.authed = false;
    state.authError = '';
    window.location.hash = '';
  }

  function forgeSave() {
    const data = JSON.parse(JSON.stringify(state.data));
    Object.entries(adminEdits).forEach(([f, v]) => {
      if (f.endsWith('_pt') || f.endsWith('_en')) {
        const key = f.slice(0, -3), lang = f.slice(-2);
        if (data.personal[key] && typeof data.personal[key] === 'object') data.personal[key][lang] = v;
      } else {
        data.personal[f] = v;
      }
    });
    for (const [key, raw] of Object.entries(adminJsonEdits)) {
      try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) throw new Error('esperado um array');
        data[key] = parsed;
      } catch (err) {
        showToast('JSON inválido em "' + key + '": ' + err.message);
        return;
      }
    }
    const err = dataError(data);
    if (err) { showToast('Não salvo: ' + err + '.'); return; }
    const saved = saveData(data);
    adminEdits = {}; adminJsonEdits = {};
    state.data = data;
    renderApp();
    renderForge();
    showToast(saved
      ? 'Salvo. O portfólio já reflete as alterações.'
      : 'Aplicado, mas o navegador bloqueou o armazenamento: some ao recarregar.');
  }

  function forgeCopy() {
    const block = '// Gerado pela Forja — cole no lugar do PORTFOLIO_DATA em js/app.js\nconst PORTFOLIO_DATA = ' + JSON.stringify(state.data, null, 2) + ';\n';
    copyText(block, 'PORTFOLIO_DATA copiado para a área de transferência.', 'Não foi possível copiar automaticamente.');
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

  function forgeDownload() {
    const blob = new Blob([JSON.stringify(state.data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'portfolio-data.json';
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    showToast('portfolio-data.json baixado.');
  }

  function forgeReset() {
    if (!window.confirm('Restaurar todos os dados para o padrão do repositório?')) return;
    storeRemove(DATA_KEY);
    state.data = defaultData();
    renderApp();
    renderForge();
    showToast('Dados restaurados.');
  }

  function forgeChangePass() {
    if (!newPass || newPass.length < 4) { showToast('Senha muito curta (mín. 4 caracteres)'); return; }
    showToast(storeSet('wl_forge_pass', newPass)
      ? 'Senha alterada.'
      : 'O navegador bloqueou o armazenamento; a senha não foi alterada.');
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
      case 'open-job': openJobModal(id); break;
      case 'open-project': openProjectModal(id); break;
      case 'toggle-cert': toggleCert(id); break;
      case 'close-modal': closeModal(); break;
      case 'forge-login': forgeLogin(); break;
      case 'forge-exit': forgeExit(); break;
      case 'forge-save': forgeSave(); break;
      case 'forge-copy': forgeCopy(); break;
      case 'forge-download': forgeDownload(); break;
      case 'forge-reset': forgeReset(); break;
      case 'forge-changepass': forgeChangePass(); break;
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

  window.addEventListener('hashchange', checkHash);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    if (state.openCert != null) setCertOpen(state.openCert, true);
  });

  // ────────────────────────────────────────────────────────────────────────
  // Init
  // ────────────────────────────────────────────────────────────────────────
  buildEmbers();
  renderApp();
  checkHash();
  spy();
})();