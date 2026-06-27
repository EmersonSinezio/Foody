# Roadmap & Débitos Técnicos

Este documento lista funcionalidades futuras e débitos técnicos conhecidos do Foody. Priorização baseada em impacto vs. esforço.

## Status atual

O projeto está na versão **Premium Edition v1.0** com todos os 7 épicos (E1-E7) implementados.

Veja [Features](./features.md) para o que já está pronto.

---

## Funcionalidades futuras (wishlist)

### Alta prioridade

| Feature | Descrição | Esforço |
|---------|-----------|---------|
| **Checkout real** | Integração com gateway (Stripe, Mercado Pago) para pagamentos reais. | Alto |
| **Backend/API** | Node.js + Express (ou NestJS) com produtos em DB e pedidos persistidos. | Alto |
| **Autenticação** | Login/cadastro de usuários, sessão, perfis. | Médio |
| **Testes automatizados** | Vitest + React Testing Library + Playwright para E2E. | Médio |

### Média prioridade

| Feature | Descrição |
|---------|-----------|
| **Sistema de favoritos (wishlist)** | Usuários salvam pratos preferidos. |
| **Busca global (CMD+K)** | Modal de busca com autocomplete por nome/categoria. |
| **PWA / Offline** | Service Worker, instalação como app, offline-first. |
| **i18n** | Multi-idioma (PT-BR, EN, ES) via react-i18next. |
| **Sistema de reservas funcional** | Calendário, confirmação por e-mail, integração com Google Calendar. |

### Nice-to-have

| Feature | Descrição |
|---------|-----------|
| **Avaliações de usuários** | Usuários logados dão nota e comentam pratos. |
| **Modo administrador** | Painel para gerenciar cardápio, pedidos e reservas. |
| **Chat / suporte** | Widget de chat com atendente (ou bot). |
| **Notificações push** | Web Push para promoções. |
| **Compartilhamento social** | Open Graph rico + botão de compartilhar prato. |

---

## Débitos técnicos

### Críticos

| Débito | Impacto | Mitigação atual |
|--------|---------|-----------------|
| **Sem testes automatizados** | Regressões passam despercebidas | Checklist manual + lint + build em CI |
| **Favicon genérico** | Branding fraco | `vite.png` default, substituir por logo próprio |
| **Sem SSR/SSG** | SEO limitado para rotas profundas | Meta tags manuais por rota (débito) |

### Moderados

| Débito | Impacto | Observações |
|--------|---------|-------------|
| **Focus trap no CartDrawer** | Acessibilidade incompleta (WCAG) | Drawer funciona, mas Tab pode sair dele |
| **Sem error boundary** | Erro em um componente quebra toda a app | Adicionar `<ErrorBoundary>` em `App.tsx` |
| **URLs Unsplash hard-coded** | Dependência de serviço externo | Fallback de emoji já implementado |
| **Sem code splitting** | Bundle único carregado na home | Vite faz tree-shaking, mas `React.lazy` melhoraria LCP |
| **Imagens locais sem otimização** | PNGs grandes em `/public/assets/` | Converter para WebP, usar `<picture>` com fallback |

### Baixa prioridade

| Débito | Observações |
|--------|-------------|
| `index.scss` não utilizado | Remover ou consolidar com `index.css` |
| Sem `404` route | URLs desconhecidas renderizam vazio |
| `cartItems` sem tipagem exportada | Consumidores precisam inferir tipo |
| Sem `prettier` configurado | Formatação depende do editor |

---

## Ideias de refatoração

1. **Extrair dados para API mock** (MSW — Mock Service Worker): permitir futura migração para backend real sem reescrever consumers.
2. **Criar design system interno** (`src/components/ui/`): Button, Input, Card, Modal — hoje cada componente define seu próprio estilo inline.
3. **Migrar para TanStack Query** quando houver backend real (cache, invalidation, optimistic updates).
4. **Migrar Tailwind para v4** quando estabilizar (nova engine, CSS-first config).

---

## Histórico de versões

| Versão | Data | Destaques |
|--------|------|-----------|
| **1.0 Premium Edition** | 2026-06-27 | Hero cinematográfica, dark mode, drawer, 21 produtos, ProductDetails, landing narrativa |
| **0.x (inicial)** | — | Versão base com 10 produtos e páginas essenciais |

---

## Como contribuir

1. Escolha uma feature ou débito da lista acima
2. Abra uma issue no GitHub descrevendo a proposta
3. Crie uma branch `feat/<nome>` ou `fix/<nome>`
4. Implemente seguindo os padrões descritos em [Components](./components.md) e [Styling](./styling.md)
5. Valide com `npm run build` e `npm run lint`
6. Abra um Pull Request referenciando a issue
