'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { FadeIn } from '@/components/animations/FadeIn';

export default function ContatoPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-80px)] py-16 px-6 lg:px-8">
      <FadeIn className="text-center max-w-2xl mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Fale Conosco</h1>
        <p className="text-lg text-muted">
          Dê o primeiro passo para proteger e multiplicar o seu patrimônio. Nossa equipe de especialistas está pronta para ajudar.
        </p>
      </FadeIn>

      <FadeIn className="w-full max-w-5xl" delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form */}
          <Card>
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Mensagem Enviada!</h3>
                <p className="text-muted">Entraremos em contato o mais breve possível.</p>
                <Button variant="outline" className="mt-8" onClick={() => setStatus('idle')}>
                  Enviar nova mensagem
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <h3 className="text-2xl font-semibold mb-2">Agende uma consultoria</h3>
                
                <div>
                  <label className="block text-sm font-medium text-muted mb-2">Nome Completo</label>
                  <Input required placeholder="Ex: João da Silva" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-muted mb-2">Email</label>
                    <Input type="email" required placeholder="joao@exemplo.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted mb-2">Telefone (WhatsApp)</label>
                    <Input type="tel" required placeholder="(11) 99999-9999" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted mb-2">Patrimônio Aproximado</label>
                  <select defaultValue="" className="flex h-11 w-full rounded-md border border-white/10 bg-surface/30 px-3 py-2 text-sm text-text placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent">
                    <option value="" disabled>Selecione uma faixa</option>
                    <option value="1">Até R$ 250.000</option>
                    <option value="2">R$ 250.000 a R$ 1.000.000</option>
                    <option value="3">R$ 1.000.000 a R$ 5.000.000</option>
                    <option value="4">Acima de R$ 5.000.000</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted mb-2">Mensagem (Opcional)</label>
                  <textarea 
                    className="flex min-h-[120px] w-full rounded-md border border-white/10 bg-surface/30 px-3 py-2 text-sm text-text placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent resize-none"
                    placeholder="Como podemos ajudar?"
                  ></textarea>
                </div>

                <Button type="submit" size="lg" disabled={status === 'submitting'} className="w-full mt-2">
                  {status === 'submitting' ? 'Enviando...' : 'Enviar Mensagem'}
                </Button>
              </form>
            )}
          </Card>

          {/* Info */}
          <div className="flex flex-col gap-12 pt-4">
            <div>
              <h3 className="text-xl font-bold mb-4">Informações de Contato</h3>
              <ul className="space-y-6">
                <li className="flex flex-col">
                  <span className="text-sm font-medium text-primary uppercase tracking-wider mb-1">Email</span>
                  <span className="text-lg">contato@atlascapital.com.br</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-sm font-medium text-primary uppercase tracking-wider mb-1">Telefone</span>
                  <span className="text-lg">(11) 99999-9999</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-sm font-medium text-primary uppercase tracking-wider mb-1">Endereço</span>
                  <span className="text-lg leading-relaxed">
                    Av. Faria Lima, 3477<br />
                    Itaim Bibi - São Paulo, SP<br />
                    CEP: 04538-133
                  </span>
                </li>
              </ul>
            </div>
            
            <div className="p-6 rounded-xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/20">
              <h4 className="font-semibold text-lg mb-2">Atendimento Exclusivo</h4>
              <p className="text-sm text-muted">
                Nossos assessores estão disponíveis para reuniões presenciais em nosso escritório ou por videoconferência.
              </p>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
