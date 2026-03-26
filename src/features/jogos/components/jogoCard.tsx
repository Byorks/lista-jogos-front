import type { ResumoJogo } from "../types";

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
      <button className="bg-brand hover:bg-brand-hover p-2">
        Ver detalhes
      </button>
    </div>
  );
};

export default JogoCard;
