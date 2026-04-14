import type { ResumoJogo } from "../types";
import { Link } from "@tanstack/react-router";

const JogoCard = ({ jogo }: { jogo: ResumoJogo }) => {
  return (
    <div className="p-6 bg-surface-raised flex flex-col justify-between aspect-9/12 gap-4">
      {jogo.capaUrl && (
        <div className="w-full h-auto">
          <img
            className=" w-full h-fit min-h-24 object-cover"
            src={jogo.capaUrl ?? ""}
            alt={"Capa do jogo " + jogo.titulo}
          />
        </div>
      )}

      <h3>{jogo.titulo}</h3>

      <div>
        {jogo.generosNomes?.map((genero, index) => (
          <span key={index}>{genero}</span>
        ))}
      </div>

      <div>
        <Link to={`/jogos/$jogoId`} params={{ jogoId: jogo.id }}>
          <button className="bg-brand hover:bg-brand-hover p-2 text-content-inverted rounded-md hover:cursor-pointer">
            Ver detalhes
          </button>
        </Link>
      </div>
    </div>
  );
};

export default JogoCard;
