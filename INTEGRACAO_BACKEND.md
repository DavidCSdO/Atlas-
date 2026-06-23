# Manual de Implementação do Backend: Supabase + Payload CMS

Este documento detalha o processo de arquitetura, configuração e integração do banco de dados (Supabase) com o sistema de gerenciamento de conteúdo (Payload CMS 3.0) no projeto Atlas Capital.

---

## 1. Supabase (PostgreSQL & Autenticação)

O Supabase foi escolhido para atuar como a fundação de dados do projeto. Ele hospeda o banco PostgreSQL onde o Payload CMS armazena todas as suas tabelas, além de lidar com autenticação.

### 1.1. O Desafio da Conexão (IPv6 vs IPv4)
A infraestrutura moderna do Supabase fornece endpoints de conexão direta (`db.[id].supabase.co`) que operam exclusivamente em **IPv6**. Em ambientes de desenvolvimento local (como no Brasil, onde muitos provedores não suportam IPv6 corretamente) ou em ambientes corporativos, a tentativa de conexão falhava com o erro clássico de Node.js: `ENOTFOUND`.

**A Solução: Supavisor (Connection Pooler)**
Para contornar o problema e garantir estabilidade, utilizamos o "Shared Pooler Endpoint" do Supabase. 
- Em vez da conexão direta (porta `5432` em `.co`), utilizamos o pool de conexão via **IPv4** (porta `6543` no domínio `pooler.supabase.com`).
- Essa URL do Pooler foi inserida no arquivo `.env` como `DATABASE_URI`, resolvendo imediatamente os problemas de rede e preparando o sistema para escalar em ambientes "Serverless" como a Vercel.

### 1.2. Integração com Next.js (SSR)
A Atlas Capital utiliza o Next.js App Router (Server Components). Para que o projeto fizesse consultas seguras e gerenciasse sessões (cookies) tanto no servidor quanto no navegador, instalamos o pacote oficial `@supabase/ssr`.

Criamos a pasta `src/lib/supabase/` com dois arquivos vitais:
- **`client.ts`:** Instancia o Supabase para uso em "Client Components" (ações interativas no navegador).
- **`server.ts`:** Instancia o Supabase lendo e escrevendo cookies do cabeçalho da requisição, garantindo que o Server-Side Rendering (SSR) mantenha o usuário autenticado sem vazar dados.

---

## 2. Payload CMS 3.0 (Gerenciador de Conteúdo)

A versão 3.0 do Payload é revolucionária porque não requer mais um servidor Express separado; ela roda nativamente "in-process" dentro do Next.js (usando o App Router).

### 2.1. Acoplamento e Conflito de Layout (Route Groups)
Após inicializar o Payload, o Next.js passou a lançar erros de "Hidratação do React" (`<html> cannot be a child of <main>`). 

**A causa:** O arquivo `layout.tsx` original do nosso site aplicava o `Navbar` e o `Footer` para absolutamente todas as rotas do projeto, inclusive para as telas administrativas ocultas geradas pelo Payload.
**A Solução Arquitetônica:** Utilizamos **Route Groups** (grupos de rotas em parênteses, que não afetam a URL):
1. **`src/app/(frontend)`:** Movemos todo o site visual para cá. Ele possui seu próprio `layout.tsx` contendo o Navbar e Footer.
2. **`src/app/(payload)`:** Área isolada onde as rotas e o painel de administração (`/admin`) do Payload funcionam com o seu próprio esqueleto HTML nativo.

### 2.2. Conectando o Payload ao Supabase
Para que o Payload salvasse os posts e arquivos, nós o configuramos para usar o **PostgreSQL Adapter**.
No arquivo principal `payload.config.ts`, adicionamos o módulo `@payloadcms/db-postgres` e apontamos a configuração diretamente para a nossa variável `DATABASE_URI` (a URL do Pooler do Supabase).
A partir desse momento, ao rodar `npm run dev`, o Payload conectou no Supabase e automaticamente criou dezenas de tabelas SQL baseadas nas nossas "Coleções" (Users, Pages, Media).

### 2.3. Modelagem de Dados e Consumo
A estrutura do Painel Administrativo foi definida no `payload.config.ts` através de coleções e globais:
- **Coleções (`collections`):** Entidades repetíveis. Criamos a coleção `posts` para o Blog e `services` para os cards de serviço.
- **Globais (`globals`):** Entidades únicas. Criamos a aba `Settings` para gerenciar informações estáticas do site (Telefones, Redes Sociais e a Imagem do Sobre).

**O Consumo Headless:**
Para puxar esses dados do banco e exibir no site (ex: no `layout.tsx` ou `page.tsx`), importamos a promessa de configuração e a função raiz do Payload:
```typescript
import configPromise from "@payload-config";
import { getPayload } from "payload";

const payload = await getPayload({ config: configPromise });
const settings = await payload.findGlobal({ slug: 'settings' });
```
Dessa forma, o servidor Next.js chama o banco de dados antes mesmo de gerar a página para o usuário, entregando um site rápido, seguro, amigável para SEO (Google) e, acima de tudo, 100% editável pelo cliente final sem a necessidade de um programador.
