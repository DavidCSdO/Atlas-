# Documentação Técnica e Histórico: Atlas Capital

Este documento registra a arquitetura completa, as integrações tecnológicas e o passo a passo de desenvolvimento da plataforma web da **Atlas Capital**, desde a sua concepção visual até a integração com o CMS Headless.

---

## 🛠️ Stack Tecnológico
A plataforma foi construída seguindo os padrões mais modernos do mercado (inspirado por grandes techs de pagamentos), buscando máximo desempenho, SEO e um visual estritamente premium:

- **Framework Core:** Next.js 15 (App Router, Turbopack)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS (com propriedades nativas para Glassmorphism)
- **CMS (Painel Administrativo):** Payload CMS 3.0 (Rodando acoplado no Next.js)
- **Banco de Dados & Autenticação:** Supabase (PostgreSQL via conexão Pooler)
- **Animações:** Framer Motion (via wrappers locais) e animações CSS nativas.

---

## 🏗️ Fase 1: Interface Premium (Frontend)

O desenvolvimento iniciou com a criação de uma interface de alto padrão para transmitir confiança e sofisticação no mercado de gestão patrimonial.

### 1. Sistema de Design
- Criamos variáveis de cores no `tailwind.config` baseadas em tons sóbrios (fundo noturno escuro) contrastados com um azul/ciano "neon" para os chamados de ação (Call-to-actions).
- Implementamos **Glassmorphism**: Componentes como `Card`, `Navbar` e o painel do `Simulador` usam `backdrop-blur` e bordas translúcidas de `white/10` para criar um efeito de vidro fosco.

### 2. Animações e Efeitos Fluidos
Para dar "vida" ao site sem comprometer a performance, construímos um conjunto de componentes visuais na pasta `src/components/animations/`:
- **LiquidChrome:** Um fundo dinâmico gerado via Canvas (WebGL/Shaders) que simula metal líquido. É o responsável por dar aquele visual extremamente moderno à tela inicial.
- **FadeIn & Stagger:** Componentes reutilizáveis para garantir que os textos e cartões surjam de forma suave e sequencial quando o usuário entra na página ou dá "scroll".

### 3. Estrutura de Páginas Estáticas
Nessa fase, desenvolvemos todas as rotas focadas no usuário:
- `/` (Home): Focada em conversão, exibe os grandes números, um preview dos serviços e um CTA para o simulador.
- `/sobre`: Conta a história, missão e valores da empresa, com layout de duas colunas.
- `/servicos`: Uma listagem detalhada de todos os pilares de atuação da Atlas.
- `/simulador`: Uma página com um formulário interativo focado em capturar a projeção do usuário.
- `/contato`: Página de leads, direta e elegante.

---

## ⚙️ Fase 2: Integração Backend (Supabase + Payload)

A transição de um site "estático" para um sistema gerenciável foi o maior desafio arquitetônico do projeto.

### 1. O Desafio de Rede do Supabase (IPv6)
No primeiro contato com o banco de dados oficial do Supabase, enfrentamos um problema crítico de DNS (`ENOTFOUND db.[id].supabase.co`). O projeto localmente não se conectava porque a rede não resolvia endereços IPv6 (que é o padrão dos servidores diretos do Supabase).
**A Solução Oficial:** Utilizamos a **Pooler Connection String (IPv4)** através da tecnologia *Supavisor* (porta `6543`). Essa solução não apenas resolveu o problema local, mas também garantiu que o sistema pudesse escalar perfeitamente em infraestruturas "Serverless" como a Vercel, sem esgotar conexões.

### 2. Clientes do Supabase (SSR)
Criamos a integração nativa com pacotes `@supabase/ssr` em `src/lib/supabase/`:
- `client.ts`: Usado nos componentes do navegador para chamadas interativas de banco.
- `server.ts`: Usado nas APIs e Server Components para lidar de forma transparente com cookies de sessão de administradores.

### 3. Conflito de Layouts e Route Groups
Quando o Payload CMS 3.0 foi acoplado, surgiu o erro crítico de hidratação do React (`<html> cannot be a child of <main>`). O layout global do nosso site estava "engolindo" as páginas do painel administrativo, gerando duplicação da estrutura do site (como o rodapé e Navbar dentro do próprio CMS).
**A Solução Final:** Adotamos os **Route Groups** do Next.js.
- Movemos toda a interface visual para `src/app/(frontend)`.
- O Payload passou a existir isolado em `src/app/(payload)`.
Isso permitiu que ambos convivessem na mesma máquina e porto, mas com raízes HTML independentes.

---

## 🧠 Fase 3: Site Dinâmico e "Headless"

Com a estrutura limpa, fizemos o site consumir os dados do próprio painel em tempo real, eliminando os textos de teste do código.

1. **Configurações Globais (Rodapé):** Criamos a coleção global *Settings*. O componente `<Footer>` no Next.js agora usa `getPayload()` para ler o telefone, e-mail e os links de LinkedIn/Instagram diretamente do painel administrativo.
2. **Página "Sobre Nós":** Adicionamos o campo `aboutImage` na coleção global de Settings. A página `/sobre` agora lê e exibe nativamente a imagem enviada pelo painel administrativo com os recortes arredondados.
3. **Serviços:** A grade de serviços na tela inicial (Planejamento Financeiro, Investimentos, etc.) agora é populada com as instâncias criadas dentro da coleção *Services* do painel.
4. **O Motor de Blog:** Criamos a rota dinâmica `/blog/[slug]/page.tsx`. Ela permite que todos os artigos escritos pela aba *Posts* do Payload gerem suas próprias páginas únicas, completas com título, imagens, capa, data e o rico sistema de formatação de texto do Payload. As três postagens mais recentes também passaram a alimentar dinamicamente a área de "Insights" na Home Page.

---

## 🚀 Guia de Operação e Deploy

### Rodando Localmente
O sistema todo foi otimizado para rodar de forma acoplada:
```bash
npm run dev
```

### Acesso ao CMS
- **Rota do Painel:** `http://localhost:3000/admin`
- Crie ou gerencie suas postagens (Posts), os contatos do rodapé (Settings) e os serviços disponíveis na home (Services). Tudo tem atualização em tempo real no frontend, graças ao modelo "force-dynamic" de busca de dados do Next.js 15.

### Deploy (Vercel)
O projeto está pronto para a **Vercel**. Devido ao Next.js e ao banco Supabase com Connection Pooler (porta 6543), o deploy requer apenas o repasse correto das seguintes chaves de ambiente:
1. `DATABASE_URI` (String Pooler)
2. `NEXT_PUBLIC_SUPABASE_URL`
3. `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. `PAYLOAD_SECRET` (Uma chave criptográfica de no mínimo 32 caracteres inventada pelo dono).

Comando de publicação (se usado a Vercel CLI):
```bash
vercel --prod
```

---
*Atlas Capital - Arquitetura validada em 2026. Feito para alta disponibilidade.*
