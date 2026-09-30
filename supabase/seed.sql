-- ════════════════════════════════════════════════════════════════════════
-- Portfólio: conteúdo inicial
--
-- Rode no SQL Editor do Supabase DEPOIS do schema.sql. Cria a linha única de
-- conteúdo com o PORTFOLIO_DATA do js/app.js (versão de 30/09/2026).
-- Rodar de novo substitui o conteúdo atual (a versão anterior vai para o
-- histórico).
-- ════════════════════════════════════════════════════════════════════════
insert into public.portfolio_content (id, data)
values (1, $portfolio${
  "personal": {
    "name": "Wellington Luiz",
    "title": {
      "pt": "Desenvolvedor de Software",
      "en": "Software Developer"
    },
    "bio": {
      "pt": "Olá! Sou o Wellington, tenho 21 anos, estudante de Análise e Desenvolvimento de Sistemas (ADS) no IFRO e estagiário na Prefeitura de Ariquemes. Meu foco está em estudar engenharia de software e construir side projects práticos para aplicar conceitos e testar novas tecnologias. Utilizo IA de forma estratégica para acelerar o aprendizado e otimizar meu fluxo de desenvolvimento. Sou movido por disciplina diária e evolução contínua, buscando dominar clean code e lógica de programação para alcançar meu maior objetivo: atuar no setor aeroespacial.",
      "en": "Hi! I'm Wellington, 21, a Systems Analysis and Development student at IFRO and an intern at Ariquemes City Hall. I focus on software engineering and practical side projects to apply concepts and test new technologies, using AI strategically to speed up learning and optimize my workflow. Driven by daily discipline and continuous evolution, mastering clean code and programming logic toward my long-term goal: the aerospace industry."
    },
    "education": {
      "pt": "Análise e Desenvolvimento de Sistemas — IFRO Ariquemes",
      "en": "Systems Analysis and Development — IFRO Ariquemes"
    },
    "languages": {
      "pt": "Português (nativo) · Inglês (iniciante)",
      "en": "Portuguese (native) · English (beginner)"
    },
    "location": "Ariquemes — RO, Brasil",
    "github": "https://github.com/WellingtonPereiraLuiz",
    "email": "wellingtonpereiraluiz89@gmail.com",
    "quote": {
      "pt": "\"A evolução é o único caminho no vazio.\"",
      "en": "\"Evolution is the only path through the void.\""
    }
  },
  "techStack": [
    {
      "category": {
        "pt": "Núcleo",
        "en": "Core"
      },
      "items": [
        "Flutter",
        "Dart",
        "Python"
      ]
    },
    {
      "category": {
        "pt": "Ambientes",
        "en": "Environments"
      },
      "items": [
        "VS Code",
        "Android Studio"
      ]
    },
    {
      "category": {
        "pt": "IA & Automação",
        "en": "AI & Automation"
      },
      "items": [
        "Gemini Pro",
        "Antigravity CLI",
        "Base44"
      ]
    },
    {
      "category": {
        "pt": "Arquitetura & Design",
        "en": "Architecture & Design"
      },
      "items": [
        "MVC",
        "MVVM",
        "Git",
        "Tailwind CSS"
      ]
    }
  ],
  "roadmap": [
    {
      "title": {
        "pt": "Sistemas & Baixo Nível",
        "en": "Systems & Low Level"
      },
      "desc": {
        "pt": "Domínio de Python para projetos autônomos; especialização em Rust, Ruby, Redes e Linux.",
        "en": "Python mastery for autonomous projects; specialization in Rust, Ruby, Networks and Linux."
      }
    },
    {
      "title": {
        "pt": "Hardware & Automação",
        "en": "Hardware & Automation"
      },
      "desc": {
        "pt": "Integração e desenvolvimento com Robótica básica e Arduino.",
        "en": "Integration and development with basic Robotics and Arduino."
      }
    },
    {
      "title": {
        "pt": "Carreira Internacional",
        "en": "International Career"
      },
      "desc": {
        "pt": "Fluência em inglês com foco no mercado do Canadá ou Finlândia.",
        "en": "English fluency targeting the Canadian or Finnish tech market."
      }
    }
  ],
  "projects": [
    {
      "id": 7,
      "title": "TRIRREME",
      "badge": {
        "pt": "SÓCIO-FUNDADOR",
        "en": "CO-FOUNDER"
      },
      "tags": [
        "Sistemas sob medida",
        "Web",
        "Automação",
        "Vercel"
      ],
      "shortDesc": {
        "pt": "Empresa de desenvolvimento de software que fundei com dois sócios: sistemas sob medida, sites e automações para empresas.",
        "en": "Software development company I co-founded with two partners: custom systems, websites and automation for businesses."
      },
      "longDesc": {
        "pt": "Sou sócio-fundador da TRIRREME, empresa de tecnologia criada com dois colegas de ADS do IFRO. Desenvolvemos sistemas sob medida (gestão de pedidos e estoque em tempo real), sites e catálogos digitais integrados ao WhatsApp, automações e integrações com planilhas e ERPs, além de consultoria, suporte e hospedagem. Trabalhamos com escopo, prazo e preço fechados, metodologia em etapas e entregas quinzenais.",
        "en": "I am a co-founder of TRIRREME, a tech company started with two fellow Systems Analysis students from IFRO. We build custom systems (real-time order and inventory management), websites and digital catalogs integrated with WhatsApp, automations and integrations with spreadsheets and ERPs, plus consulting, support and hosting. We work with fixed scope, timeline and price, a staged methodology and bi-weekly deliveries."
      },
      "links": [
        {
          "label": "Site",
          "url": "https://trirreme.com/"
        }
      ]
    },
    {
      "id": 3,
      "title": "CustoDoce",
      "badge": {
        "pt": "1º LUGAR — HACKATHON IFRO",
        "en": "1ST PLACE — IFRO HACKATHON"
      },
      "tags": [
        "Flutter",
        "Dart",
        "Firebase",
        "Riverpod",
        "SQLite"
      ],
      "shortDesc": {
        "pt": "Calculadora de custos definitiva para confeiteiros e padeiros artesanais.",
        "en": "The definitive cost calculator for artisanal bakers and confectioners."
      },
      "longDesc": {
        "pt": "Aplicativo multiplataforma (Android e Web) que resolve a precificação artesanal de ponta a ponta: cadastro de ingredientes, receitas inteligentes com cálculo em tempo real, gestão de custos invisíveis e assistente de IA integrado (Google Gemini). 1º Lugar na categoria \"Desafio Livre de Impacto Regional\" na Hackathon Extensionista IFRO Ariquemes 2026/1.",
        "en": "Cross-platform app (Android and Web) that solves artisanal pricing end to end: ingredient registry, smart recipes with real-time cost calculation, hidden-cost management and an integrated AI assistant (Google Gemini). 1st place in the \"Regional Impact Open Challenge\" at the IFRO Ariquemes Extension Hackathon 2026/1."
      },
      "links": [
        {
          "label": "Live MVP",
          "url": "https://custodoce-b07ce.web.app"
        },
        {
          "label": "GitHub",
          "url": "https://github.com/WellingtonPereiraLuiz/CustoDoce"
        }
      ]
    },
    {
      "id": 1,
      "title": "Nossos Kitutes",
      "badge": "",
      "tags": [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "React Query",
        "Base44"
      ],
      "shortDesc": {
        "pt": "Plataforma de venda de quitutes artesanais integrada ao WhatsApp, com catálogo interativo e painel administrativo.",
        "en": "Artisanal treats storefront integrated with WhatsApp, featuring an interactive catalog and admin panel."
      },
      "longDesc": {
        "pt": "Vitrine digital elegante com experiência de compra fluida: landing page que comunica os valores da marca (Rafa & Well), cardápio interativo segmentado por categorias com controle de estoque e carrinho flutuante persistente. Ao finalizar a compra, o pedido é formatado automaticamente e enviado via WhatsApp. Um painel administrativo integrado ao Base44 permite gerenciar catálogo, preços e disponibilidade em tempo real.",
        "en": "An elegant digital storefront with a fluid shopping experience: an engaging landing page, an interactive menu segmented by category with stock control and a persistent floating cart. On checkout, the order is formatted automatically and sent via WhatsApp. A Base44-integrated admin panel manages catalog, prices and availability in real time."
      },
      "links": [
        {
          "label": "Live Demo",
          "url": "https://kitutes-artesanais-delivery.base44.app"
        }
      ]
    },
    {
      "id": 2,
      "title": "Doni Assados Delivery",
      "badge": "",
      "tags": [
        "React",
        "Vite",
        "TypeScript",
        "Tailwind CSS",
        "Base44"
      ],
      "shortDesc": {
        "pt": "Plataforma de delivery para assados desenvolvida com React e Vite sobre a infraestrutura Base44.",
        "en": "Roasted-food delivery platform built with React and Vite on the Base44 infrastructure."
      },
      "longDesc": {
        "pt": "Aplicação moderna de entrega de assados integrada à plataforma Base44, projetada para execução local eficiente com Vite e sincronização contínua com o Base44 Builder. Suporte a variáveis de ambiente centralizadas para App ID e URL da API, garantindo flexibilidade, deploy contínuo via GitHub e uma experiência de compra robusta e ágil.",
        "en": "A modern roasted-food delivery app integrated with Base44, designed for efficient local development with Vite and continuous sync with the Base44 Builder. Centralized environment variables for App ID and API URL enable flexible continuous deployment via GitHub and a robust, fast shopping experience."
      },
      "links": [
        {
          "label": "Live Demo",
          "url": "https://doni-assados-delivery.base44.app"
        }
      ]
    },
    {
      "id": 4,
      "title": "Anne Ilustradora",
      "badge": "",
      "tags": [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Supabase",
        "Vercel"
      ],
      "shortDesc": {
        "pt": "Site de portfólio e encomendas para uma ilustradora, com calculadora de orçamento, página da webcomic e painel administrativo.",
        "en": "Portfolio and commissions site for an illustrator, with a quote calculator, a webcomic page and an admin panel."
      },
      "longDesc": {
        "pt": "Plataforma para a ilustradora Anne apresentar seu trabalho e receber encomendas. A página inicial reúne central de links, avatar e galeria. A calculadora monta um pedido com vários itens (personagens ou cenários), combina estilo, enquadramento e acabamento, aplica desconto por volume e mostra faixa de preço quando há cenário; o pedido fecha direto pelo WhatsApp ou pela DM do Instagram. Uma página dedicada à webcomic \"Fim Anti-Herói\" traz sinopse, personagens, galeria e links de leitura. Todo o conteúdo fica no Supabase (Postgres, Storage e Auth, com Row Level Security) e é editado por um painel administrativo com login, onde a Anne altera preços, cenários, galeria, links, personagens e até o fundo do site. Front-end em HTML/CSS/JS puro, com tema claro/escuro, hospedado na Vercel sem build step.",
        "en": "A platform for illustrator Anne to showcase her work and take commissions. The home page gathers a link hub, avatar and gallery. The calculator builds a multi-item order (characters or backgrounds), combining style, framing and finish, applying volume discounts and showing a price range when backgrounds are included; the order is sent straight to WhatsApp or Instagram DM. A dedicated page for the webcomic \"Fim Anti-Herói\" features the synopsis, characters, gallery and reading links. All content lives in Supabase (Postgres, Storage and Auth, with Row Level Security) and is edited through a login-protected admin panel where Anne manages prices, backgrounds, gallery, links, characters and even the site background. Vanilla HTML/CSS/JS front-end with light/dark theme, hosted on Vercel with no build step."
      },
      "links": [
        {
          "label": "Live MVP",
          "url": "https://anne-ilustradora.vercel.app/"
        }
      ]
    },
    {
      "id": 5,
      "title": "Casa Nossa Imobiliária",
      "badge": "",
      "tags": [
        "React",
        "Supabase",
        "Vercel"
      ],
      "shortDesc": {
        "pt": "Site de imobiliária com catálogo de imóveis para compra, venda e aluguel, com filtros de busca.",
        "en": "Real estate agency website with a property catalog for buying, selling and renting, plus search filters."
      },
      "longDesc": {
        "pt": "Modelo de site para imobiliárias: catálogo de imóveis para compra, venda e aluguel com filtros avançados de busca, apresentação dos serviços da imobiliária (como avaliação técnica de imóveis) e foco em atendimento próximo ao cliente. Construído com React e Supabase e hospedado na Vercel, serve como vitrine para oferecer o serviço a imobiliárias locais.",
        "en": "A website template for real estate agencies: a property catalog for buying, selling and renting with advanced search filters, a presentation of the agency services (such as technical property appraisal) and a focus on close customer service. Built with React and Supabase and hosted on Vercel, it works as a showcase to offer the service to local agencies."
      },
      "links": [
        {
          "label": "Live Demo",
          "url": "https://template-site-imobiliaria.vercel.app/"
        }
      ]
    },
    {
      "id": 6,
      "title": "Barbearia Clube",
      "badge": "",
      "tags": [
        "Vercel"
      ],
      "shortDesc": {
        "pt": "Site de barbearia no modelo de clube de assinatura, com corte e barba ilimitados.",
        "en": "Barbershop website built around a subscription club with unlimited haircuts and beard trims."
      },
      "longDesc": {
        "pt": "Modelo de site para barbearias que trabalham com assinatura mensal: apresenta o clube com corte e barba ilimitados, a equipe de profissionais e as unidades da rede. Hospedado na Vercel, serve como vitrine para oferecer o serviço a barbearias da região.",
        "en": "A website template for barbershops running a monthly subscription: it presents the club with unlimited haircuts and beard trims, the professional team and the shop locations. Hosted on Vercel, it works as a showcase to offer the service to local barbershops."
      },
      "links": [
        {
          "label": "Live Demo",
          "url": "https://template-site-barbearia-wellingtons-projects-cebf7f37.vercel.app/"
        }
      ]
    }
  ],
  "certifications": [
    {
      "id": 1,
      "name": {
        "pt": "1º Lugar — Hackathon Extensionista IFRO Ariquemes 2026/1",
        "en": "1st Place — IFRO Ariquemes Extension Hackathon 2026/1"
      },
      "issuer": {
        "pt": "IFRO Campus Ariquemes (Categoria: Impacto Regional)",
        "en": "IFRO Ariquemes Campus (Category: Regional Impact)"
      },
      "description": {
        "pt": "Participação e vitória na Hackathon Extensionista IFRO 2026/1 com a equipe CoreMetrics. O evento focou em soluções tecnológicas para problemas reais da região, unindo IFRO, Sebrae e comunidade. Desenvolvemos o CustoDoce, app de precificação para microempreendedores, conquistando o 1º Lugar na categoria \"Desafio Livre de Impacto Regional\" com um MVP funcional e uso documentado de IA.",
        "en": "Victory with team CoreMetrics at the IFRO 2026/1 Extension Hackathon, focused on tech solutions for real regional problems together with IFRO, Sebrae and the community. We built CustoDoce, a pricing app for micro-entrepreneurs, winning 1st place in the \"Regional Impact Open Challenge\" with a working MVP and documented use of AI."
      },
      "startDate": {
        "pt": "Semestre 2026/1",
        "en": "Semester 2026/1"
      },
      "endDate": {
        "pt": "Culminância 2026/1",
        "en": "Final showcase 2026/1"
      },
      "hours": 40,
      "institution": {
        "pt": "Centro de Empreendedorismo e Inovação — IFRO Ariquemes",
        "en": "Entrepreneurship and Innovation Center — IFRO Ariquemes"
      },
      "links": [
        {
          "label": "MVP CustoDoce",
          "url": "https://custodoce-b07ce.web.app"
        },
        {
          "label": "GitHub",
          "url": "https://github.com/WellingtonPereiraLuiz/CustoDoce"
        },
        {
          "label": "Edital",
          "url": "https://hackathon-ifro.bolt.host/"
        }
      ]
    },
    {
      "id": 2,
      "name": {
        "pt": "IV Webinar de Empreendedorismo, Ciência, Inovação e Tecnologia (WECIT)",
        "en": "4th Webinar on Entrepreneurship, Science, Innovation and Technology (WECIT)"
      },
      "issuer": {
        "pt": "Instituto Federal de Rondônia — Campus Ariquemes",
        "en": "Federal Institute of Rondônia — Ariquemes Campus"
      },
      "description": {
        "pt": "Participação e apresentação de projeto no IV WECIT 2025, evento que discutiu Cidades Inteligentes sob a ótica da tecnologia e inovação. Envolveu a apresentação de trabalhos dos acadêmicos de ADS (Curricularização da Extensão), conectando teoria a demandas reais da comunidade e do mercado. Concluído com êxito em dezembro de 2025.",
        "en": "Participation and project presentation at IV WECIT 2025, discussing Smart Cities through the lens of technology and innovation. Involved presenting work built by Systems Analysis students, connecting classroom theory to real community and market demands. Successfully concluded in December 2025."
      },
      "startDate": {
        "pt": "09 Dez 2025",
        "en": "Dec 09, 2025"
      },
      "endDate": {
        "pt": "11 Dez 2025",
        "en": "Dec 11, 2025"
      },
      "hours": 20,
      "institution": {
        "pt": "IFRO Campus Ariquemes (Transmissão via YouTube)",
        "en": "IFRO Ariquemes Campus (streamed on YouTube)"
      },
      "links": [
        {
          "label": "Site WECIT",
          "url": "http://www.wecit.com.br"
        }
      ]
    }
  ],
  "career": [
    {
      "id": 3,
      "company": "ILYSYN Systems",
      "role": {
        "pt": "Desenvolvedor — Período de Avaliação",
        "en": "Developer — Trial Period"
      },
      "period": {
        "pt": "Set 2026 — Presente",
        "en": "Sep 2026 — Present"
      },
      "shortDesc": {
        "pt": "Período de avaliação de 3 meses para contratação como desenvolvedor: desenvolvimento assistido por IA e prospecção de clientes.",
        "en": "3-month trial period toward a developer position: AI-assisted development and client prospecting."
      },
      "description": {
        "pt": "Desenvolvimento de sistemas e sites, prospecção de clientes no mercado dos EUA e participação em análises técnicas, seguindo boas práticas de engenharia de software com apoio de IA.",
        "en": "Development of systems and websites, client prospecting in the US market and participation in technical reviews, following software engineering best practices with AI support."
      },
      "achievements": {
        "pt": [
          "Desenvolvimento com IA",
          "Front-end",
          "Prospecção Outbound"
        ],
        "en": [
          "AI-Assisted Development",
          "Front-end",
          "Outbound Prospecting"
        ]
      }
    },
    {
      "id": 1,
      "company": "Prefeitura de Ariquemes",
      "role": {
        "pt": "Estagiário de TI",
        "en": "IT Intern"
      },
      "period": {
        "pt": "Abr 2026 — Presente",
        "en": "Apr 2026 — Present"
      },
      "shortDesc": {
        "pt": "Infraestrutura de TI e suporte a redes públicas municipais.",
        "en": "IT infrastructure and public network support."
      },
      "description": {
        "pt": "Atuação no suporte e manutenção da infraestrutura de TI da prefeitura: administração de redes locais, configuração de roteadores e switches, gerenciamento de servidores públicos e manutenção preventiva de hardware, garantindo conectividade das secretarias municipais e suporte técnico avançado aos usuários de sistemas corporativos.",
        "en": "Support and maintenance of the city hall's IT infrastructure: local network administration, router and switch configuration, public server management and preventive hardware maintenance, ensuring connectivity across municipal departments and advanced technical support for corporate system users."
      },
      "achievements": {
        "pt": [
          "Infraestrutura de TI",
          "Redes & Conectividade",
          "Suporte Público"
        ],
        "en": [
          "IT Infrastructure",
          "Networks & Connectivity",
          "Public Support"
        ]
      }
    },
    {
      "id": 2,
      "company": "Grupo Novalar",
      "role": {
        "pt": "Estoquista",
        "en": "Stock Clerk"
      },
      "period": {
        "pt": "Ago 2023 — Abr 2025",
        "en": "Aug 2023 — Apr 2025"
      },
      "shortDesc": {
        "pt": "Organização e controle de estoque, com suporte à assistência técnica.",
        "en": "Stock organization and control, plus product technical assistance."
      },
      "description": {
        "pt": "Responsável pela organização e bom funcionamento do estoque, evitando faltas ou excessos de produtos. Atendimento a demandas de assistência técnica com soluções rápidas e eficazes para clientes e equipe interna, com atuação proativa no aprimoramento de processos e otimização das operações.",
        "en": "Responsible for stock organization and flow, preventing shortages and overstock. Handled technical-assistance demands with fast, effective solutions for customers and the internal team, proactively improving processes and optimizing operations."
      },
      "achievements": {
        "pt": [
          "Organização de Estoque",
          "Assistência Técnica",
          "Otimização de Processos"
        ],
        "en": [
          "Stock Organization",
          "Technical Assistance",
          "Process Optimization"
        ]
      }
    }
  ]
}$portfolio$::jsonb)
on conflict (id) do update set data = excluded.data;
