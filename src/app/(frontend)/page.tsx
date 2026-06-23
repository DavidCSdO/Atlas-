import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { LiquidChrome } from "@/components/animations/LiquidChrome";
import { ArrowRight, ShieldCheck, TrendingUp, Users, Hexagon } from "lucide-react";
import configPromise from "@payload-config";
import { getPayload } from "payload";

export const dynamic = 'force-dynamic';

function formatDate(date?: string) {
  if (!date) return null;
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(date));
}

export default async function Home() {
  const payload = await getPayload({ config: configPromise });
  
  // Buscar Serviços
  const servicesRes = await payload.find({ collection: 'services', limit: 4 });
  const services = servicesRes.docs as any[];

  // Buscar Posts
  const postsRes = await payload.find({ collection: 'posts', limit: 3, sort: '-publishedAt' });
  const posts = postsRes.docs as any[];
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen">
      {/* Global Fixed Background for Hero */}
      <div className="fixed inset-0 z-0 opacity-60 pointer-events-none">
        <LiquidChrome
          baseColor={[0.05, 0.1, 0.15]}
          speed={0.3}
          amplitude={0.3}
          interactive={false}
        />
      </div>

      {/* Background Gradients */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed top-0 right-0 w-[400px] h-[400px] bg-secondary/20 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden flex flex-col justify-start min-h-[85vh] z-10 pt-15 pb-40 px-6 lg:px-8 max-w-7xl mx-auto">
        <FadeIn className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
            Excelência em <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Gestão Patrimonial.</span><br />
            Preservação e Crescimento.
          </h1>
          <p className="text-lg md:text-xl text-muted mb-10 max-w-2xl leading-relaxed">
            A Atlas Capital atua de forma independente e transparente para estruturar, proteger e multiplicar o seu patrimônio. Nossa expertise a serviço do seu legado financeiro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contato">
              <Button size="lg" className="w-full sm:w-auto font-semibold">
                Fale com um Assessor
              </Button>
            </Link>
            <Link href="/simulador">
              <Button variant="outline" size="lg" className="w-full sm:w-auto font-semibold bg-background/50">
                Conheça Nossa Abordagem
              </Button>
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Content wrapper with solid background that overlaps the hero background */}
      <div className="w-full bg-[#050816] relative z-20 flex flex-col items-center border-t border-white/10">

        {/* Stats Section */}
        <section className="w-full max-w-7xl px-6 lg:px-8 py-16 border-b border-white/5">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <StaggerItem className="py-4 md:py-0 md:px-8 text-center md:text-left">
              <h3 className="text-4xl font-bold text-text mb-2 tracking-tight">+R$ 250M</h3>
              <p className="text-muted font-medium uppercase tracking-wider text-sm">Patrimônio Assessorado</p>
            </StaggerItem>
            <StaggerItem className="py-4 md:py-0 md:px-8 text-center md:text-left">
              <h3 className="text-4xl font-bold text-text mb-2 tracking-tight">98%</h3>
              <p className="text-muted font-medium uppercase tracking-wider text-sm">Clientes Satisfeitos</p>
            </StaggerItem>
            <StaggerItem className="py-4 md:py-0 md:px-8 text-center md:text-left">
              <h3 className="text-4xl font-bold text-text mb-2 tracking-tight">12 anos</h3>
              <p className="text-muted font-medium uppercase tracking-wider text-sm">de Mercado Financeiro</p>
            </StaggerItem>
          </StaggerContainer>
        </section>

        {/* Services Preview Section */}
        <section className="w-full max-w-7xl px-6 lg:px-8 py-24">
          <FadeIn className="mb-16 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Soluções completas para proteger e multiplicar o seu patrimônio.</h2>
            <p className="text-muted text-lg">Nosso portfólio de serviços foi desenhado para atender às necessidades complexas de indivíduos, famílias e empresas com alto nível de exigência.</p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.length > 0 ? (
              services.map((service) => (
                <StaggerItem key={service.id}>
                  <Card className="h-full">
                    <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                    <p className="text-muted text-sm leading-relaxed">{service.description}</p>
                  </Card>
                </StaggerItem>
              ))
            ) : (
              <>
                <StaggerItem>
                  <Card className="h-full">
                    <h3 className="text-lg font-semibold mb-2">Planejamento Financeiro</h3>
                    <p className="text-muted text-sm leading-relaxed">Organização patrimonial completa para o seu dia a dia.</p>
                  </Card>
                </StaggerItem>
                <StaggerItem>
                  <Card className="h-full">
                    <h3 className="text-lg font-semibold mb-2">Investimentos</h3>
                    <p className="text-muted text-sm leading-relaxed">Carteiras exclusivas e resilientes, focadas no seu perfil de risco.</p>
                  </Card>
                </StaggerItem>
                <StaggerItem>
                  <Card className="h-full">
                    <h3 className="text-lg font-semibold mb-2">Previdência</h3>
                    <p className="text-muted text-sm leading-relaxed">Estratégias inteligentes com foco no longo prazo.</p>
                  </Card>
                </StaggerItem>
                <StaggerItem>
                  <Card className="h-full">
                    <h3 className="text-lg font-semibold mb-2">Proteção Patrimonial</h3>
                    <p className="text-muted text-sm leading-relaxed">Planejamento sucessório e blindagem de legado.</p>
                  </Card>
                </StaggerItem>
              </>
            )}
          </StaggerContainer>
        </section>

        {/* Simulator CTA Section */}
        <section className="w-full max-w-7xl px-6 lg:px-8 py-24 border-t border-white/5">
          <div className="relative rounded-[24px] bg-gradient-to-br from-[#0a0f1c] to-[#050816] border border-white/10 p-8 md:p-16 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
            
            <FadeIn className="max-w-xl relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Projete o seu futuro.</h2>
              <p className="text-muted text-lg mb-8 leading-relaxed">
                Utilize nosso simulador de investimentos para entender como estratégias personalizadas de gestão podem acelerar a construção da sua independência financeira ao longo dos anos.
              </p>
              <div className="flex items-center bg-[#111111]/80 backdrop-blur-md border border-white/10 rounded-full p-2 max-w-md shadow-inner">
                <input 
                  type="text" 
                  placeholder="Seu patrimônio atual (R$)" 
                  className="flex-1 bg-transparent border-none text-white px-4 py-2 outline-none placeholder:text-white/40"
                />
                <Link href="/simulador">
                  <Button variant="primary" className="rounded-full px-6">
                    Simular
                  </Button>
                </Link>
              </div>
            </FadeIn>
            
            <FadeIn className="relative z-10 hidden md:block">
              {/* Decorative Mockup of a chart */}
              <div className="w-[300px] h-[200px] rounded-xl border border-white/10 bg-[#ffffff]/5 backdrop-blur-md p-6 flex flex-col justify-end items-center gap-2 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                <div className="flex items-end gap-3 h-full w-full opacity-70">
                  <div className="w-1/4 bg-white/20 rounded-t-md h-1/4"></div>
                  <div className="w-1/4 bg-white/40 rounded-t-md h-2/4"></div>
                  <div className="w-1/4 bg-primary/60 rounded-t-md h-3/4"></div>
                  <div className="w-1/4 bg-primary rounded-t-md h-full relative">
                    <div className="absolute -top-3 -right-3 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]"></div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Blog / Insights Section */}
        <section className="w-full max-w-7xl px-6 lg:px-8 py-24 border-t border-white/5">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="text-primary text-sm font-bold tracking-widest uppercase mb-3 block">Insights</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Análises de Mercado</h2>
            </div>
            <Link href="/blog">
              <Button variant="outline" className="rounded-full">Ver todos os artigos</Button>
            </Link>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <StaggerItem key={post.id}>
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <Card className="h-full bg-transparent hover:bg-white/[0.02] transition-colors border-white/5 group-hover:border-white/10">
                      <div className="text-sm text-muted mb-4 font-mono uppercase">{formatDate(post.publishedAt || post.createdAt)}</div>
                      <h3 className="text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                      <p className="text-muted text-sm leading-relaxed line-clamp-3">{post.summary}</p>
                    </Card>
                  </Link>
                </StaggerItem>
              ))
            ) : (
              <>
                <StaggerItem>
                  <Link href="/blog" className="group block h-full">
                    <Card className="h-full bg-transparent hover:bg-white/[0.02] transition-colors border-white/5 group-hover:border-white/10">
                      <div className="text-sm text-muted mb-4 font-mono">22 JUN 2026</div>
                      <h3 className="text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors">O impacto da política monetária global nos portfólios locais</h3>
                      <p className="text-muted text-sm leading-relaxed">Entenda como as recentes decisões dos bancos centrais afetam as perspectivas de alocação estrutural.</p>
                    </Card>
                  </Link>
                </StaggerItem>
                <StaggerItem>
                  <Link href="/blog" className="group block h-full">
                    <Card className="h-full bg-transparent hover:bg-white/[0.02] transition-colors border-white/5 group-hover:border-white/10">
                      <div className="text-sm text-muted mb-4 font-mono">18 JUN 2026</div>
                      <h3 className="text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors">Estratégias de sucessão patrimonial: por onde começar?</h3>
                      <p className="text-muted text-sm leading-relaxed">Garantir a preservação do legado exige planejamento jurídico e financeiro muito além do testamento comum.</p>
                    </Card>
                  </Link>
                </StaggerItem>
                <StaggerItem>
                  <Link href="/blog" className="group block h-full">
                    <Card className="h-full bg-transparent hover:bg-white/[0.02] transition-colors border-white/5 group-hover:border-white/10">
                      <div className="text-sm text-muted mb-4 font-mono">10 JUN 2026</div>
                      <h3 className="text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors">Ativos alternativos: mitigando riscos em cenários de incerteza</h3>
                      <p className="text-muted text-sm leading-relaxed">Como fundos de Private Equity e Infraestrutura podem trazer resiliência para portfólios de alta renda.</p>
                    </Card>
                  </Link>
                </StaggerItem>
              </>
            )}
          </StaggerContainer>
        </section>

      </div>
    </div>
  );
}
