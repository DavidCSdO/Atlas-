import { createClient } from '@/app/lib/supabase/server';
import { cookies } from 'next/headers';

export default async function TestDbPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // Teste 1: Verificar status do serviço de Autenticação
  const { data: authData, error: authError } = await supabase.auth.getSession();
  
  // Teste 2: Tentar fazer uma query no banco de dados
  // Se a conexão estiver funcionando, isso deve retornar os dados (ou um erro de "tabela não existe" se ainda não tivermos criado tabelas, o que já prova que conectou no banco!)
  const { data: dbData, error: dbError } = await supabase.from('users').select('*').limit(1);

  return (
    <div className="min-h-screen bg-[#050816] pt-40 px-6 lg:px-8 flex flex-col items-center text-text pb-20">
      <h1 className="text-4xl font-bold mb-4 tracking-tight text-center">Diagnóstico do Supabase</h1>
      <p className="text-muted mb-12 text-center max-w-xl">
        Esta página verifica a comunicação em tempo real entre o nosso servidor Next.js e a API do Supabase.
      </p>
      
      <div className="bg-[#0a0f1c] border border-white/10 shadow-2xl p-8 rounded-3xl w-full max-w-3xl overflow-hidden">
        
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-3 h-3 rounded-full ${!authError ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-red-500 shadow-[0_0_10px_#ef4444]'}`}></div>
            <h2 className="text-xl font-semibold">1. Conexão com API (Auth)</h2>
          </div>
          <div className="bg-black/50 p-4 rounded-xl font-mono text-sm overflow-x-auto border border-white/5">
            <span className="text-green-400">Resposta da API:</span>
            <pre className="text-white/80 mt-2">{JSON.stringify({ data: authData, error: authError }, null, 2)}</pre>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-3 h-3 rounded-full ${(!dbError || dbError?.code === '42P01') ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-red-500 shadow-[0_0_10px_#ef4444]'}`}></div>
            <h2 className="text-xl font-semibold">2. Conexão com Banco de Dados</h2>
          </div>
          <p className="text-sm text-muted mb-4">
            (Nota: Se retornar erro "relation does not exist" significa que a conexão foi um <strong>sucesso</strong>, apenas a tabela ainda não foi criada no banco de dados.)
          </p>
          <div className="bg-black/50 p-4 rounded-xl font-mono text-sm overflow-x-auto border border-white/5">
            <span className="text-green-400">Resposta do Banco:</span>
            <pre className="text-white/80 mt-2">{JSON.stringify({ data: dbData, error: dbError }, null, 2)}</pre>
          </div>
        </div>

      </div>
    </div>
  );
}
