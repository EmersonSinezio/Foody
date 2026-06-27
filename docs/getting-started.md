# Getting Started

Este guia leva você do clone do repositório até a aplicação rodando localmente em menos de 5 minutos.

## Pré-requisitos

| Ferramenta | Versão mínima | Verificar |
|------------|---------------|-----------|
| Node.js    | `16.x`        | `node -v` |
| npm        | `8.x`         | `npm -v`  |
| Git        | `2.x`         | `git --version` |

> Recomenda-se usar Node 18+ (LTS) para melhor compatibilidade com Vite 5.

## Instalação

```bash
git clone https://github.com/seu-usuario/restaurant-app.git
cd restaurant-app
npm install
```

## Scripts disponíveis

Todos os scripts são executados via `npm run <script>`.

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento do Vite em `http://localhost:5173` com HMR. |
| `npm run build` | Compila o projeto com TypeScript (`tsc -b`) e gera o bundle de produção em `dist/`. |
| `npm run preview` | Serve localmente o bundle de produção para validação. |
| `npm run lint` | Executa o ESLint em todo o projeto. |

### Fluxo típico de desenvolvimento

```bash
# 1. Iniciar dev server
npm run dev

# 2. Editar código → o Vite aplica HMR automaticamente

# 3. Antes de commitar, validar build e lint
npm run build
npm run lint
```

## Estrutura mínima do projeto

Após `npm install`, você deve ver:

```
Foody/
├── node_modules/       # instalado pelo npm
├── public/             # assets estáticos (imagens PNG, vite.png)
├── src/                # código-fonte da aplicação
├── index.html          # ponto de entrada HTML
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── ...
```

## Variáveis de ambiente

O projeto **não usa** variáveis de ambiente no momento — todo o conteúdo é estático/client-side. Se no futuro forem necessárias, crie um `.env.local` (ignorados pelo Git via `.gitignore` padrão do Vite) e acesse via `import.meta.env.VITE_*`.

## Problemas comuns

### `npm install` falha com peer dependencies

```bash
npm install --legacy-peer-deps
```

### Porta 5173 ocupada

O Vite tentará automaticamente a próxima porta disponível (`5174`, `5175`...). Para forçar uma porta:

```bash
npm run dev -- --port 3000
```

### Erro de TypeScript no `npm run build`

Certifique-se de que o Node esteja ≥ 16 e rode `npm install` novamente. Os arquivos de referência (`tsconfig.app.tsbuildinfo`, `tsconfig.node.tsbuildinfo`) podem ser removidos com segurança se houver cache corrompido:

```bash
rm -f tsconfig.*.tsbuildinfo
npm run build
```

## Próximos passos

- Entenda a [Arquitetura](./architecture.md)
- Explore os [Componentes](./components.md)
- Leia sobre [State Management](./state-management.md)
