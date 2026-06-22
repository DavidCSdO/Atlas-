'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { FadeIn } from '@/components/animations/FadeIn';

export default function SimulatorPage() {
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [years, setYears] = useState<number>(20);
  
  // Assume a fixed annual interest rate of 10% (0.833% per month)
  const annualInterestRate = 0.10;
  const monthlyInterestRate = annualInterestRate / 12;
  const totalMonths = years * 12;

  // Future Value of a Series Formula: PMT * (((1 + r)^n - 1) / r)
  const futureValue = monthlyContribution * ((Math.pow(1 + monthlyInterestRate, totalMonths) - 1) / monthlyInterestRate);
  
  const totalInvested = monthlyContribution * totalMonths;
  const totalInterest = futureValue - totalInvested;

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-80px)] py-16 px-6 lg:px-8">
      <FadeIn className="text-center max-w-3xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Simulador de Investimentos</h1>
        <p className="text-lg text-muted">
          Descubra o poder dos juros compostos. Veja quanto seu dinheiro pode render ao longo do tempo com aportes consistentes.
        </p>
      </FadeIn>

      <FadeIn className="w-full max-w-5xl" delay={0.2}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls */}
          <Card className="flex flex-col gap-8">
            <h2 className="text-2xl font-semibold mb-2">Configure sua simulação</h2>
            
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-muted">Aporte Mensal</label>
                <span className="text-primary font-semibold">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(monthlyContribution)}
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-muted">Prazo (Anos)</label>
                <span className="text-primary font-semibold">{years} anos</span>
              </div>
              <input
                type="range"
                min="1"
                max="40"
                step="1"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
            
            <div className="mt-4 p-4 rounded-lg bg-primary/10 border border-primary/20 text-sm text-primary">
              A simulação considera uma taxa de rentabilidade projetada de <strong>10% ao ano</strong>. Rentabilidade passada não é garantia de rentabilidade futura.
            </div>
          </Card>

          {/* Results */}
          <Card className="flex flex-col justify-center items-center text-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-secondary/20 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="z-10 w-full space-y-8">
              <div>
                <p className="text-muted mb-2">Resultado Estimado</p>
                <h3 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(futureValue)}
                </h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/10">
                <div>
                  <p className="text-sm text-muted mb-1">Total Investido</p>
                  <p className="text-xl font-semibold text-text">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalInvested)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">Total em Juros</p>
                  <p className="text-xl font-semibold text-text">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalInterest)}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </FadeIn>
    </div>
  );
}
