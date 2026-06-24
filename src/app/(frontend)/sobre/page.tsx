import React from 'react';
import { Card } from '@/components/ui/Card';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/Stagger';
import configPromise from '@payload-config';
import { getPayload } from 'payload';

export const dynamic = 'force-dynamic';

export default async function SobrePage() {
  const payload = await getPayload({ config: configPromise });
  const settings = await payload.findGlobal({ slug: 'settings' }) as any;
  const image = settings.aboutImageUrl && typeof settings.aboutImageUrl === 'string' ? settings.aboutImageUrl : null;
  return (
    <div className="flex flex-col items-center min-h-screen py-16 px-6 lg:px-8">
      {/* Hero Sobre */}
      <FadeIn className="text-center max-w-4xl mb-24">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Nossa História</h1>
        <p className="text-lg md:text-xl text-muted">
          Fundada com a missão de democratizar o acesso ao planejamento financeiro de alta qualidade, a Atlas Capital tornou-se referência em gestão de patrimônio e investimentos personalizados.
        </p>
      </FadeIn>

      {/* Missão e Valores */}
      <div className="w-full max-w-7xl mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <FadeIn className="order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-6">Nossa Missão</h2>
            <p className="text-muted text-lg mb-8">
              Transformar a vida financeira das pessoas através da educação, do planejamento estratégico e do acesso aos melhores produtos do mercado, sempre com total transparência e alinhamento de interesses.
            </p>
            <h2 className="text-3xl font-bold mb-6">Nossos Valores</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div>
                  <h4 className="font-semibold text-text">Transparência</h4>
                  <p className="text-muted text-sm">Clareza total sobre custos, riscos e expectativas.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div>
                  <h4 className="font-semibold text-text">Segurança</h4>
                  <p className="text-muted text-sm">Proteção do patrimônio em primeiro lugar.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div>
                  <h4 className="font-semibold text-text">Crescimento</h4>
                  <p className="text-muted text-sm">Foco incansável na multiplicação inteligente de capital.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div>
                  <h4 className="font-semibold text-text">Relacionamento</h4>
                  <p className="text-muted text-sm">Parceria de longo prazo baseada em confiança.</p>
                </div>
              </li>
            </ul>
          </FadeIn>
          
          <FadeIn delay={0.2} className="order-1 md:order-2 h-full min-h-[400px] rounded-2xl border border-white/10 bg-surface/30 relative overflow-hidden flex items-center justify-center">
            {image ? (
              <img src={image} alt="Imagem Institucional" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <>
                {/* Placeholder for an Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
                <span className="text-muted/50 font-medium">Imagem Institucional</span>
              </>
            )}
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
