import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useJogo } from "../../../features/jogos/hooks/useJogo";
import type { ObterJogo } from "../../../features/jogos/types";
export const Route = createFileRoute("/jogos/$jogoId/")({
  component: JogoDetail,
});

function JogoDetail() {
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
    <section className="bg-surface w-screen">
      <div className="max-w-7xl mx-auto py-6">
        <div className="grid grid-cols-12 gap-12">
          {jogo!.capaUrl && (
            <div className="col-span-3">
              <img src={jogo!.capaUrl} alt={jogo!.titulo} />
            </div>
          )}

          <div className="grid col-span-9 gap-4">
            <h1>{jogo!.titulo}</h1>

            <div className="w-full">
              <div className="w-fit bg-blue-900 flex p-2">
                <p>{jogo!.status}</p>
              </div>
            </div>
            {jogo!.plataformas?.length > 0 && (
              <div>
                <h2 className="pb-2">Plataformas</h2>
                <div className="w-full flex ">
                  {jogo!.plataformas?.map((plataforma, i) => (
                    <div
                      className="col-span-2 p-2 flex bg-surface-overlay gap-2"
                      key={i}
                    >
                      {plataforma.logoUrl && (
                        <img
                          className="w-5"
                          src={plataforma.logoUrl}
                          alt={plataforma.titulo ?? undefined}
                        />
                      )}
                      <p>{plataforma.titulo}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {jogo!.desenvolvedoraNome && (
              <div>
                <h2>Desenvolvedora</h2>
                <p>{jogo!.desenvolvedoraNome}</p>
              </div>
            )}
            {jogo!.generosNomes?.length > 0 && (
              <div>
                <h2>Gêneros</h2>
                <div>
                  {jogo!.generosNomes?.map((genero, i) => (
                    <span key={i}>{genero}</span>
                  ))}
                </div>
              </div>
            )}

            {jogo!.analise && (
              <div>
                <h2>Análise</h2>
                <p>{jogo!.analise}</p>
              </div>
            )}

            {jogo!.sinopse && (
              <div>
                <h2>Sinopse</h2>
                <p>{jogo!.sinopse}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
