# Boilerplate Template: Next.js 15 + Payload 3.0 + Supabase

Este documento serve como um guia/mapa definitivo da estrutura deste projeto. Você pode usar este modelo mental e estrutural para iniciar rapidamente qualquer projeto futuro (SaaS, E-commerces, Sites Institucionais e Portfólios) com a mesma robustez da **Atlas Capital**.

---

## 1. Comandos Iniciais (Como começar do zero)
Se você for iniciar um projeto *novo* seguindo esse exato modelo, os comandos base são:

```bash
# 1. Cria a base do Next.js
npx create-next-app@latest meu-novo-projeto --typescript --tailwind --eslint

# 2. Instala o Payload CMS 3.0 (Acoplado ao Next.js)
npx create-payload-app@latest

# 3. Instala os clientes SSR do Supabase
npm install @supabase/supabase-js @supabase/ssr
```

---

## 2. A Árvore de Diretórios (O Mapa do Projeto)

A grande sacada dessa arquitetura é a divisão dentro da pasta `src/app/`. Nós usamos **Route Groups** (pastas com parênteses `()`) para impedir que o site e o CMS briguem pelo mesmo visual.

```text
meu-novo-projeto/
├── .env                       # Credenciais críticas (DATABASE_URI pooler, PAYLOAD_SECRET)
├── payload.config.ts          # O "cérebro" do CMS. Define o banco e as abas do painel.
├── src/
│   ├── app/
│   │   │
│   │   ├── (frontend)/        # 🎨 O SITE PÚBLICO (Visível para o cliente)
│   │   │   ├── layout.tsx     # Onde fica o Navbar e o Footer.
│   │   │   ├── globals.css    # Estilos globais e fontes do site.
│   │   │   ├── page.tsx       # A Página Inicial.
│   │   │   └── blog/          # Rotas dinâmicas que leem dados do Payload.
│   │   │
│   │   ├── (payload)/         # ⚙️ O PAINEL DE CONTROLE (CMS)
│   │   │   ├── admin/         # Renderiza as telas administrativas do Payload.
│   │   │   ├── api/           # As rotas de Backend geradas automaticamente.
│   │   │   └── layout.tsx     # O layout puro do Payload (sem Navbar/Footer do site).
│   │
│   ├── components/            # 🧩 PEÇAS DE LEGO (UI)
│   │   ├── animations/        # Efeitos premium (LiquidChrome, FadeIn, Stagger).
│   │   ├── ui/                # Botões, Cards, Inputs reutilizáveis.
│   │   ├── Navbar.tsx         # Cabeçalho.
│   │   └── Footer.tsx         # Rodapé (conectado ao getPayload).
│   │
│   └── lib/                   # 🔌 CONECTORES E UTILITÁRIOS
│       └── supabase/
│           ├── client.ts      # Conexão com Supabase no navegador (Client-side).
│           └── server.ts      # Conexão com Supabase no servidor (SSR e Cookies).
```

---

## 3. Os 3 Pilares desta Arquitetura

Para replicar o sucesso estrutural deste projeto, lembre-se sempre das 3 regras de ouro aplicadas aqui:

### Pilar 1: Conexão IPv4 com Pooler (O Segredo do Supabase)
Sempre que for usar o Supabase com Prisma ou PayloadCMS, a URL padrão do banco (`db.[id].supabase.co`) provavelmente falhará localmente devido ao IPv6. 
- **O padrão:** No seu painel do Supabase, sempre ative o **Connection Pooler** e pegue a URL que tem a porta `6543` e termina em `pooler.supabase.com`. Coloque-a no seu `.env` como `DATABASE_URI`.

### Pilar 2: Consumo Headless Nativo
Você não precisa criar "rotas de API" (ex: `fetch('/api/posts')`) para pegar dados no Next.js App Router se o Payload estiver acoplado. Você utiliza a função local, que é incrivelmente rápida e segura:
```tsx
import configPromise from '@payload-config';
import { getPayload } from 'payload';

// Dentro do seu Server Component (page.tsx ou layout.tsx):
const payload = await getPayload({ config: configPromise });
const dados = await payload.find({ collection: 'posts' });
```

### Pilar 3: Estética com Glassmorphism (UI Premium)
Para manter o visual de ponta sem inflar o código, evitamos bibliotecas pesadas de UI. 
A receita é usar **Tailwind CSS**:
- Fundos translúcidos: `bg-white/5` ou `bg-black/40`
- Efeito de vidro: `backdrop-blur-md`
- Bordas sutis: `border border-white/10`
Isso garante a estética moderna e "limpa" vista em grandes startups do mercado financeiro e de tecnologia.
