import { useEffect, useState } from "react";
import { useJogo } from "../hooks/useJogo";
import type { ObterJogo } from "../types";
import { Route } from "../../../routes/jogos/$jogoId";

const JogoDetalhes = () => {
  const [jogo, setJogo] = useState<ObterJogo | null>(null);
  const { jogoId } = Route.useParams();

  const { jogo: dados, loading, error } = useJogo(jogoId);

  useEffect(() => {
    if (dados) {
      setJogo(dados);
    }
  }, [dados]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!jogo) return null;
  return (
    <section className="bg-[#0C0E1D] min-h-screen w-full relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8 text-white">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand opacity-10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-brand-sec opacity-10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto bg-[#161827]/80 backdrop-blur-md border border-[#211f36] rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {jogo!.capaUrl && (
            <div className="md:col-span-4 lg:col-span-3">
              <img
                src={jogo!.capaUrl}
                alt={jogo!.titulo}
                className="w-full h-auto rounded-2xl border border-[#211f36] shadow-[0_10px_30px_rgba(0,0,0,0.8)] object-cover"
              />
            </div>
          )}

          <div className="md:col-span-8 lg:col-span-9 flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent leading-tight">
              {jogo!.titulo}
            </h1>

            <div className="flex flex-wrap items-center gap-3">
              {jogo!.status && (
                <div className="w-fit bg-gradient-to-r from-brand to-brand-sec p-[1px] rounded-lg">
                  <div className="bg-[#0C0E1D] px-4 py-1.5 rounded-[7px]">
                    <p className="text-sm font-bold text-transparent bg-gradient-to-r from-brand to-brand-sec bg-clip-text uppercase tracking-wider">
                      {jogo!.status}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {jogo!.plataformas?.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">
                  Plataformas
                </h2>
                <div className="flex flex-wrap gap-3">
                  {jogo!.plataformas?.map((plataforma, i) => (
                    <div
                      className="flex items-center gap-2 bg-[#0C0E1D] border border-[#211f36] px-3 py-2 rounded-xl transition-colors hover:border-brand/50"
                      key={i}
                    >
                      {plataforma.logoUrl && (
                        <img
                          className="w-5 h-5 object-contain"
                          src={plataforma.logoUrl}
                          alt={plataforma.titulo ?? undefined}
                        />
                      )}
                      <p className="text-sm text-gray-300 font-medium">
                        {plataforma.titulo}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {jogo!.desenvolvedoraNome && (
                <div>
                  <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">
                    Desenvolvedora
                  </h2>
                  <p className="text-lg font-medium text-white">
                    {jogo!.desenvolvedoraNome}
                  </p>
                </div>
              )}

              {jogo!.generosNomes?.length > 0 && (
                <div>
                  <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">
                    Gêneros
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {jogo!.generosNomes?.map((genero, i) => (
                      <span
                        key={i}
                        className="bg-[#0C0E1D] text-gray-300 px-3 py-1 rounded-lg text-sm font-medium border border-[#211f36]"
                      >
                        {genero}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {jogo!.sinopse && (
              <div className="mt-4">
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">
                  Sinopse
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {jogo!.sinopse}
                </p>
              </div>
            )}

            {jogo!.analise && (
              <div className="mt-2 p-6 bg-[#0C0E1D] border border-[#211f36] rounded-2xl relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brand to-brand-sec rounded-l-2xl" />
                <h2 className="text-sm font-semibold text-brand uppercase tracking-widest mb-3 ml-2">
                  Análise
                </h2>
                <p className="text-gray-300 leading-relaxed ml-2">
                  {jogo!.analise}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export { JogoDetalhes };
