import { getPayload } from 'payload';
import configPromise from './payload.config';

async function seed() {
  const payload = await getPayload({ config: configPromise });
  
  const posts = [
    {
      title: "O Impacto da Política Monetária Global nos Portfólios Locais",
      slug: "impacto-politica-monetaria-global",
      summary: "Entenda como as recentes decisões dos principais bancos centrais afetam as perspectivas de alocação estrutural e a rentabilidade de ativos locais.",
      category: "Fundos",
      publishedAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
      content: {
        root: {
          children: [
            {
              children: [
                { detail: 0, format: 0, mode: "normal", style: "", text: "Com as recentes mudanças nas taxas de juros americanas e europeias, o fluxo de capital global passa por uma forte reprecificação. Para o investidor de alta renda, compreender esse cenário é essencial para não ser pego desprevenido pela volatilidade cambial.", type: "text", version: 1 }
              ],
              direction: "ltr", format: "", indent: 0, type: "paragraph", version: 1
            }
          ],
          direction: "ltr", format: "", indent: 0, type: "root", version: 1
        }
      }
    },
    {
      title: "Estratégias de Sucessão Patrimonial: Por Onde Começar?",
      slug: "estrategias-sucessao-patrimonial",
      summary: "Garantir a preservação do legado exige planejamento jurídico e financeiro muito além do testamento comum. Saiba como estruturar fundos exclusivos e holdings.",
      category: "Educação Financeira",
      publishedAt: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
      content: {
        root: {
          children: [
            {
              children: [
                { detail: 0, format: 0, mode: "normal", style: "", text: "A sucessão patrimonial não precisa ser um tabu familiar. Pelo contrário, o planejamento antecipado através de previdências privadas (PGBL/VGBL), doações em vida com reserva de usufruto e holdings familiares evita dilapidação do patrimônio por impostos e custos judiciais.", type: "text", version: 1 }
              ],
              direction: "ltr", format: "", indent: 0, type: "paragraph", version: 1
            }
          ],
          direction: "ltr", format: "", indent: 0, type: "root", version: 1
        }
      }
    },
    {
      title: "Ativos Alternativos: Mitigando Riscos em Cenários de Incerteza",
      slug: "ativos-alternativos-mitigando-riscos",
      summary: "Como fundos de Private Equity, Infraestrutura e Real Estate podem trazer resiliência e prêmios de iliquidez para portfólios de alta renda.",
      category: "Ações",
      publishedAt: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
      content: {
        root: {
          children: [
            {
              children: [
                { detail: 0, format: 0, mode: "normal", style: "", text: "Em anos onde a bolsa de valores (Renda Variável) apresenta retornos laterais, buscar o prêmio de iliquidez em ativos alternativos tem se provado uma excelente estratégia. Fundos de infraestrutura (FIP-IE), além de isenção fiscal, proporcionam correção atrelada à inflação.", type: "text", version: 1 }
              ],
              direction: "ltr", format: "", indent: 0, type: "paragraph", version: 1
            }
          ],
          direction: "ltr", format: "", indent: 0, type: "root", version: 1
        }
      }
    }
  ];

  console.log("Iniciando a inserção de posts no banco de dados...");

  for (const post of posts) {
    try {
      await payload.create({
        collection: 'posts',
        data: post,
      });
      console.log(`✅ Post criado: ${post.title}`);
    } catch (e) {
      console.log(`⚠️ Erro ao criar post (${post.title}): Apenas ignorando se já existir.`);
    }
  }
  
  console.log("Processo finalizado!");
  process.exit(0);
}

seed().catch(console.error);
