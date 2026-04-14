import { JogoForm } from "../components/JogoForm";
import { useJogos } from "../hooks/useJogos";

export const CreateJogoPage = () => {
  const { criar } = useJogos();

  return (
    <section className="bg-surface w-screen">
      <div className="max-w-7xl mx-auto py-6">
        <h2>Criação de Jogo</h2>

        <JogoForm onSubmit={(data) => (console.log(data), criar(data))} />
      </div>
    </section>
  );
};
