# PRD: Foody Premium Edition

**Versão:** 1.0
**Data:** 2026-06-27
**Autor:** SDD Architect
**Status:** _Aguardando Aprovação_

---

## 1. Objetivo

Elevar o projeto **Foody** de uma aplicação React funcional a uma experiência de portfólio de nível sênior, combinando:

1. **Correção de bugs críticos** de layout na Hero Section;
2. **Impacto visual cinematográfico** (carrossel, parallax, gradientes animados);
3. **Features de produto modernas** (Dark Mode, Drawer de Carrinho, Página de Detalhes);
4. **Conteúdo rico** (landing page com 4 seções narrativas + catálogo expandido para ~20 produtos);
5. **Micro-interações globais** que demonstrem domínio de UX/frontend.

O resultado final deve ser um projeto que, ao ser aberto por um recrutador técnico, provoque uma reação de **"UAUU"** nos primeiros 5 segundos de interação.

---

## 2. Contexto

O projeto atual (refatorado na iteração anterior) possui:
- ✅ Stack moderna (React 18 + TS + Vite + Tailwind + Framer Motion + Lucide)
- ✅ Context API de carrinho com persistência em localStorage
- ✅ 10 produtos, 6 páginas, dark mode configurado mas não toggleado
- ❌ Hero com bug de layout (imagem desalinhada, path relativo quebrado)
- ❌ Sem page de detalhes de produto
- ❌ Sem drawer lateral (carrinho é página separada)
- ❌ Sem dark mode toggle (apesar de `darkMode: "class"` estar ativo no Tailwind)
- ❌ Sem seções narrativas na Home (Features, HowItWorks, etc.)
- ❌ Catálogo enxuto (10 produtos, imagens repetidas/inadequadas)

---

## 3. User Stories (organizadas por Épicos)

### 🎬 Épico E1 — Hero Cinematográfica

- **US-E1.1:** Como visitante, quero ver um **carrossel automático de 3 pratos** (sushi → burger → pizza) com transição suave, para imediatamente perceber a variedade do cardápio.
- **US-E1.2:** Como visitante, quero que o **título "Escolha a sua comida favorita"** apareça palavra-por-palavra, criando uma narrativa guiada.
- **US-E1.3:** Como visitante em desktop, quero que a **imagem do prato reaja ao movimento do meu mouse** (efeito tilt 3D sutil), aumentando o engajamento.
- **US-E1.4:** Como visitante, quero ver um **fundo com gradiente mesh animado** (blobs coloridos flutuando) que traga vida sem poluir o conteúdo.
- **US-E1.5:** Como visitante em mobile, quero que a **hero empilhe corretamente** (imagem acima, texto abaixo) sem quebrar o layout.

### 🌓 Épico E2 — Dark Mode

- **US-E2.1:** Como usuário, quero um **botão de toggle (sol/lua)** na navbar para alternar entre temas claro e escuro.
- **US-E2.2:** Como usuário, quero que minha **preferência seja salva** e persista após fechar o navegador (localStorage).
- **US-E2.3:** Como usuário de primeira visita, quero que o app **detecte automaticamente** a preferência do meu sistema operacional (`prefers-color-scheme`).
- **US-E2.4:** Como usuário, quero que o **ícone do toggle anime suavemente** entre sol e lua ao clicar.

### 🛒 Épico E3 — Drawer de Carrinho

- **US-E3.1:** Como comprador, quero que ao clicar em "Adicionar ao carrinho" em qualquer produto, um **drawer lateral abra automaticamente** mostrando o item adicionado.
- **US-E3.2:** Como comprador, quero poder **ajustar quantidade e remover itens** diretamente no drawer sem sair da página atual.
- **US-E3.3:** Como comprador, quero **fechar o drawer** clicando no backdrop, no botão X, ou pressionando `ESC`.
- **US-E3.4:** Como comprador, quero um botão **"Ver carrinho completo"** no drawer que me leve à página `/cart` para checkout final.
- **US-E3.5:** Como comprador em mobile, quero que o drawer **ocupe a tela inteira** (`w-full`) para facilitar o uso com uma mão.

### 📄 Épico E4 — Página de Detalhes do Produto

- **US-E4.1:** Como visitante curioso, quero clicar em um card de produto e ser levado a uma **página dedicada** (`/product/:id`) com informações completas.
- **US-E4.2:** Como comprador, quero ver uma **imagem grande com zoom on hover** para examinar o prato.
- **US-E4.3:** Como comprador, quero ver **ingredientes listados** para validar alergias/preferências.
- **US-E4.4:** Como comprador, quero um **seletor de quantidade** e botão "Adicionar ao Carrinho" proeminente.
- **US-E4.5:** Como visitante, quero uma seção **"Você também pode gostar"** com 4 produtos da mesma categoria.
- **US-E4.6:** Como visitante, quero um **breadcrumb** (Home > Cardápio > [Produto]) para navegação fácil.
- **US-E4.7:** Como visitante, se acessar uma URL inválida (`/product/999`), quero ser **redirecionado com feedback** para `/products`.

### 🏠 Épico E5 — Landing Page Narrativa (Seções Extras)

- **US-E5.1:** Como visitante, quero uma seção **"Nossos Diferenciais"** com 4 cards (Forno a Lenha, Ingredientes Frescos, Entrega 30min, Chef Premiado) logo abaixo da hero.
- **US-E5.2:** Como visitante, quero uma seção **"Como Funciona"** com 3 passos numerados e conectados visualmente (Escolha → Peça → Receba).
- **US-E5.3:** Como visitante, quero uma seção **"Mais Vendidos"** com carrossel horizontal dos top 4 produtos por rating.
- **US-E5.4:** Como visitante, quero um **banner CTA final** ("Pronto para experimentar?") com botão grande para o cardápio.
- **US-E5.5:** Como visitante, quero um **Footer** com 3 colunas (Sobre, Links Rápidos, Redes Sociais) e copyright dinâmico.
- **US-E5.6:** Como visitante, quero que **cada seção anime ao entrar no viewport** (stagger com `whileInView`).

### 📦 Épico E6 — Catálogo Expandido

- **US-E6.1:** Como visitante, quero ver **~20 produtos distribuídos em 6 categorias** (incluindo nova categoria "Saladas").
- **US-E6.2:** Como visitante, quero que **cada produto tenha imagem real e única** (via Unsplash), nunca repetida entre produtos diferentes.
- **US-E6.3:** Como desenvolvedor, quero que cada produto tenha **campo `ingredients: string[]`** para uso na página de detalhes.
- **US-E6.4:** Como visitante, se uma imagem do Unsplash falhar, quero ver um **fallback elegante** (emoji grande do tipo de prato).

### ✨ Épico E7 — Micro-interações Globais

- **US-E7.1:** Como visitante, quero uma **barra de progresso de scroll** no topo da página (gradiente amarelo) que mostre quanto da página já vi.
- **US-E7.2:** Como visitante na Home, quero que os **números de estatísticas (10+, 4.8, 30min) animem com contagem progressiva** ao entrar no viewport.
- **US-E7.3:** Como comprador, quero que o **badge do carrinho na navbar dê um "bounce"** quando adiciono um produto de qualquer página.

---

## 4. Escopo

### ✅ Incluído

- Correção completa do bug da Hero (layout, path, mobile order)
- Carrossel automático + tilt 3D + mesh gradient + word-by-word animation
- Dark Mode toggle com ThemeContext, persistência e detecção de sistema
- CartDrawer com estado global, backdrop, ESC, responsivo
- Página `/product/:id` com breadcrumb, zoom, ingredientes, relacionados
- 5 novas seções na Home (Features, HowItWorks, BestSellers, CTA, Footer)
- Expansão do catálogo para ~20 produtos com imagens Unsplash únicas
- Nova categoria "Saladas" (3 produtos)
- Campo `ingredients` em todos os produtos
- Barra de progresso de scroll na navbar
- AnimatedCounter para stats da Home
- Animações `whileInView` em todas as seções novas

### ❌ Excluído

- Backend / API / banco de dados (tudo client-side)
- Sistema de login / autenticação / usuários
- Checkout real com gateway de pagamento
- Sistema de favoritos / wishlist (pode ser iteração futura)
- Busca global CMD+K (pode ser iteração futura)
- PWA / Service Worker / offline support
- i18n / multi-idioma
- Testes unitários automatizados (vitest não configurado; validação via checklist visual + build + lint)
- Refatoração das páginas `/reservation`, `/testimonials`, `/contact` (mantidas como estão)

---

## 5. Requisitos Não-Funcionais

### Performance
- **Largest Contentful Paint (LCP)** da Home < 2.5s em 4G throttled
- **Time to Interactive (TTI)** < 4s
- Bundle final (gzipped) < 180KB
- Imagens Unsplash devem usar `?w=600&q=80` para limitar peso
- Todas as imagens com `loading="lazy"` exceto a primeira da hero

### SEO & Meta
- `<title>` e `<meta description>` atualizados no `index.html`
- `lang="pt-BR"` no HTML
- Favicon customizado (atualmente vite.png genérico — fora do escopo, documentado como débito)

### Acessibilidade (WCAG AA)
- Todos os ícones clicáveis com `aria-label`
- Contraste mínimo 4.5:1 em ambos os temas (light/dark)
- Navegação completa via teclado (TAB, ESC, ENTER)
- `focus-visible` ring em todos os botões/links
- Drawer com `role="dialog"` e `aria-modal="true"`

### Segurança
- Sem armazenamento de dados sensíveis (apenas IDs e preferências)
- URLs Unsplash validadas (domínio confiável)
- Sem `dangerouslySetInnerHTML`

### Responsividade (Mobile-First)
- Breakpoints: `sm:640 / md:768 / lg:1024 / xl:1280`
- Drawer: `w-full` em `<sm`, `max-w-md` em `≥sm`
- Hero: empilhada em `<md`, 2 colunas em `≥md`
- Todas as seções novas devem funcionar em 375px (iPhone SE)

### Compatibilidade
- Chrome, Firefox, Safari, Edge (últimas 2 versões)
- Sem suporte a IE11

---

## 6. Métricas de Sucesso

| Métrica | Meta |
|---------|------|
| `npm run build` | ✅ Sem erros TS |
| `npm run lint` | ✅ 0 erros (warnings aceitos se documentados) |
| Tempo de carga Home (dev) | < 3s |
| Nº de produtos renderizados | ≥ 20 |
| Cobertura visual dark mode | 100% das páginas |
| Acessibilidade Lighthouse | ≥ 90 |

---

## 7. Aprovação

**Este PRD está submetido para aprovação antes da elaboração da Technical Spec.**

- [ ] **Aprovado** — Prosseguir para Spec técnica
- [ ] **Aprovado com ajustes** — Listar alterações abaixo
- [ ] **Rejeitado** — Reescrever com novo escopo

**Feedback / Ajustes solicitados:**

> _(preencher se houver)_
