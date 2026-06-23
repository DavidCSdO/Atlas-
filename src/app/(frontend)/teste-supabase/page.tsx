import { createClient } from '@/lib/supabase/server';

export default async function TesteSupabasePage() {
  // Inicializa o cliente do servidor (já com o "await" necessário para o Next 15)
  const supabase = await createClient();

  // Teste de conexão simples chamando a API do Supabase
  const { data, error } = await supabase.auth.getSession();

  return (
    <div className="min-h-screen bg-[#050816] pt-40 px-6 flex flex-col items-center text-white">
      <h1 className="text-3xl font-bold mb-8">Diagnóstico: Supabase Auth</h1>
      
      <div className="bg-[#0a0f1c] border border-white/10 p-8 rounded-2xl w-full max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-3 h-3 rounded-full ${!error ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-red-500 shadow-[0_0_10px_#ef4444]'}`}></div>
          <h2 className="text-xl font-semibold">
            {!error ? 'Conectado com Sucesso!' : 'Erro na Conexão'}
          </h2>
        </div>
        
        <p className="text-gray-400 mb-2 text-sm">Resposta da API:</p>
        <pre className="bg-black/50 p-4 rounded-xl text-xs overflow-auto text-green-400 border border-white/5">
          {JSON.stringify({ data, error }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
