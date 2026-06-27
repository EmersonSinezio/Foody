# Deployment

Este documento descreve como compilar e publicar o Foody em produção.

## Build de produção

```bash
npm run build
```

Este comando executa:

1. `tsc -b` — compila TypeScript (app + node references) com validação de tipos
2. `vite build` — gera bundle otimizado em `dist/`

### Saída esperada

```
dist/
├── index.html
└── assets/
    ├── index-[hash].js       # bundle JS
    └── index-[hash].css      # CSS extraído do Tailwind
```

### Metas de performance

| Métrica | Alvo |
|---------|------|
| Bundle JS gzipped | < 150 KB |
| Total (HTML+JS+CSS) gzipped | < 180 KB |
| LCP (Home) | < 2.5s |
| TTI | < 4s |

### Preview local

Antes de publicar, valide o build localmente:

```bash
npm run preview
```

O Vite serve `dist/` em `http://localhost:4173`.

---

## Deploy na Vercel

O Foody já está deployado em `https://foody-pearl-alpha.vercel.app/`. A Vercel detecta automaticamente projetos Vite.

### Via CLI

```bash
npm i -g vercel
vercel --prod
```

### Via Dashboard

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Importe o repositório do GitHub
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Clique **Deploy**

### Configuração de SPA

A Vercel lida automaticamente com fallback para `index.html` em rotas client-side (SPA). Não é necessário `vercel.json` customizado — mas se quiser ser explícito:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## Outros hosts

### Netlify

1. Build Command: `npm run build`
2. Publish Directory: `dist`
3. Crie `public/_redirects`:
   ```
   /*    /index.html   200
   ```

### GitHub Pages

Como o Foody usa `BrowserRouter` (HTML5 History API), GitHub Pages requer workaround:

- **Opção A**: migrar para `HashRouter` (`/#/products`)
- **Opção B**: usar um `404.html` que redireciona para `index.html` mantendo a URL

Para o caminho base, ajuste em `vite.config.ts`:

```ts
export default defineConfig({
  base: '/nome-do-repo/',
  plugins: [react()],
});
```

### Docker (nginx)

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

`nginx.conf` (trecho para SPA):

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

---

## Checklist pré-deploy

- [ ] `npm run build` — 0 erros TypeScript
- [ ] `npm run lint` — 0 erros
- [ ] `npm run preview` — testa build localmente
- [ ] Validar rotas client-side (digitar `/products` direto no browser)
- [ ] Validar dark mode funcionando após F5 (anti-flash)
- [ ] Imagens Unsplash carregando (pode haver rate limit)
- [ ] Meta tags de SEO presentes em `index.html`

## Variáveis de ambiente

Atualmente o projeto **não usa** variáveis de ambiente. Se precisar no futuro:

1. Crie `.env.local` (nunca commitar)
2. Prefixe com `VITE_` para expor ao client:
   ```
   VITE_API_URL=https://api.example.com
   ```
3. Acesse via `import.meta.env.VITE_API_URL`

## Monitoramento (futuro)

Débitos para uma versão futura:

- Analytics (Plausible, Vercel Analytics)
- Error tracking (Sentry)
- Lighthouse CI em PRs
- Bundle analyzer (`rollup-plugin-visualizer`)
