import type { ResumoJogo } from "../types";
import { Link } from "@tanstack/react-router";

const JogoCard = ({ jogo }: { jogo: ResumoJogo }) => {
  return (
    <div className="p-6 bg-[#0C0E1D] border border-[#211f36] rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col justify-between aspect-9/12 gap-4 relative overflow-hidden group hover:border-brand/50 transition-colors">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-brand opacity-10 blur-3xl rounded-full pointer-events-none group-hover:opacity-20 transition-opacity" />
      <div className="absolute bottom-[-50px] left-[-50px] w-40 h-40 bg-brand-sec opacity-10 blur-3xl rounded-full pointer-events-none group-hover:opacity-20 transition-opacity" />

      <h3 className="text-white font-bold text-xl z-10 relative leading-tight">
        {jogo.titulo}
      </h3>

      {jogo.capaUrl && (
        <div className="w-full h-auto max-h-3/4 z-10 relative">
          <img
            className="w-full h-full  object-cover rounded-xl border border-[#211f36]"
            src={jogo.capaUrl ?? ""}
            alt={"Capa do jogo " + jogo.titulo}
          />
        </div>
      )}

      <div className="flex flex-wrap gap-2 z-10 relative">
        {jogo.generosNomes?.map((genero, index) => (
          <span
            key={index}
            className="bg-[#161827] text-gray-300 px-2.5 py-1 rounded-md text-xs font-medium border border-[#211f36]"
          >
            {genero}
          </span>
        ))}
      </div>

      <div className="z-10 relative mt-auto pt-2">
        <Link
          to={`/jogos/$jogoId`}
          params={{ jogoId: jogo.id }}
          className="block"
        >
          <button className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand to-brand-sec text-[#0C0E1D] font-bold text-center hover:opacity-90 hover:shadow-[0_0_20px_var(--color-brand,rgba(81,250,170,0.4))] transition-all cursor-pointer">
            Ver detalhes
          </button>
        </Link>
      </div>
    </div>
  );
};

export default JogoCard;
