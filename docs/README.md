# Documentação do Foody

> Foody é uma aplicação moderna de delivery/restaurante desenvolvida com **React 18 + TypeScript + Vite**, com foco em experiência cinematográfica, micro-interações e performance.

Esta documentação é o guia técnico oficial do projeto. Use-a para entender a arquitetura, contribuir com código ou fazer deploy.

## Índice

| Documento | Descrição | Público |
|-----------|-----------|---------|
| [Getting Started](./getting-started.md) | Instalação, scripts e primeiros passos | Qualquer dev |
| [Architecture](./architecture.md) | Estrutura de pastas, stack e decisões arquiteturais | Devs, arquitetos |
| [Features](./features.md) | Épicos E1-E7 do produto (Hero, Dark Mode, Drawer, etc.) | Devs, PMs |
| [Components](./components.md) | Guia dos componentes reutilizáveis | Devs frontend |
| [State Management](./state-management.md) | Context API: carrinho e tema | Devs |
| [Routing](./routing.md) | Rotas e navegação | Devs |
| [Data Model](./data-model.md) | Schema de produtos e categorias | Devs |
| [Styling](./styling.md) | Tailwind, dark mode, animações customizadas | Devs, designers |
| [Deployment](./deployment.md) | Build, preview e publicação (Vercel) | DevOps, devs |
| [Roadmap](./roadmap.md) | Débitos técnicos e features futuras | Todos |

## Visão Rápida

- **Stack:** React 18, TypeScript 5.5, Vite 5.4, Tailwind CSS 3.4, Framer Motion 12
- **Ícones:** lucide-react
- **Roteamento:** react-router-dom 7
- **Feedback:** react-toastify 11
- **Catálogo:** 21 produtos em 6 categorias
- **Temas:** claro e escuro com persistência em `localStorage`
- **Estado:** 100% client-side (sem backend)

## Links Úteis

- [Live demo (Vercel)](https://foody-pearl-alpha.vercel.app/)
- [README do projeto](../Readme.md)
- [PRD Foody Premium](../specs/PRD-foody-premium.md)
- [Spec técnica](../specs/SPEC-foody-premium.md)

## Convenções desta documentação

- Caminhos relativos ao diretório raiz do projeto (ex.: `src/components/...`)
- Snippets de código em TypeScript quando possível
- Referências a arquivos sempre com link relativo para facilitar navegação no VS Code

## Autor

**Emerson Sinezio** — [LinkedIn](https://www.linkedin.com/in/emerson-sineziio) · [Email](mailto:emerson.sineziio@gmail.com)
