import { createFileRoute } from "@tanstack/react-router";
import { useJogos } from "@/features/jogos/hooks/useJogos";
import JogoCard from "@/features/jogos/components/JogoCard";
import { JogosSearchSchema } from "@/features/jogos/schemas";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/jogos/")({
  // validateSearch: query params tipados e validados pelo Zod
  validateSearch: JogosSearchSchema,
  // loader: pré-carrega dados ANTES de renderizar o componente
  // o usuário nunca vê a tela sem dados (sem flash de loading)
  //  loader: ({ context }) => {
  // aqui você pode chamar o service diretamente
  // ou usar TanStack Query para cache
  // },
  component: JogosPage,
});

function JogosPage() {
  const search = Route.useSearch();
  const { dados, loading, error } = useJogos(search);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!dados) return <p>Nenhum dado encontrado</p>;

  return (
    <section className="bg-surface w-screen">
      <div className="max-w-7xl mx-auto py-6">
        <div className="flex justify-between items-center mb-4">
          <p>{dados.itensTotais} jogos encontrados</p>
          <Link to="/jogos/new">
            <button className="bg-brand hover:bg-brand-hover text-content-inverted rounded-md p-2 hover:cursor-pointer">
              Adicionar Jogo
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dados.itens.map((jogo) => (
            <JogoCard key={jogo.id} jogo={jogo} />
          ))}
        </div>
      </div>
    </section>
  );
}
