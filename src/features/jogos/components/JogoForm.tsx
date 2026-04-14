import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { criarJogoRequestSchema } from "../schemas";
import type { CriarJogoRequest } from "../types";
import type { ResumoDesenvolvedoraType } from "@/features/desenvolvedoras/types";
import { useEffect, useState, useCallback } from "react";
import { desevolvedorasService } from "@/features/desenvolvedoras/service";

// TODO:
// [] Corrigir problema ao selecionar desenvolvedora
// [] Por algum motivo a capa não apareceu no holow knight
// [] Corrigir patch que está dando erro (back)

type DevOption = ResumoDesenvolvedoraType;

interface Props {
  onSubmit: (data: CriarJogoRequest) => Promise<void>;
}

export function JogoForm({ onSubmit }: Props) {
  const {
    register, // conecta inputs ao form
    handleSubmit, // wrapper que roda validações antes
    setValue,
    formState: { errors, isSubmitting },
    reset, // limpa o form
  } = useForm<CriarJogoRequest>({
    // zodResolver conecta o schema Zod ao react-hook-form
    resolver: zodResolver(criarJogoRequestSchema),
    defaultValues: {
      titulo: "",
      sinopse: null,
      status: "naoDefinido",
      capaUrl: null,
      nota: null,
      dataLancamento: null,
      linkSteam: null,
      favorito: false,
      desenvolvedoraId: null,
    },
  });

  // texto visível no input
  const [buscaDev, setBuscaDev] = useState("");

  // lista de sugestões de desenvolvedoras
  const [sugestoesDev, setSugestoesDev] = useState<DevOption[]>([]);

  // controla abertura da lista de sugestoesDev
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);

  // loading da buscaDev
  const [loadingDev, setLoadingDev] = useState(false);

  const carregarDesenvolvedoras = useCallback(async () => {
    // evita buscar com texto vazio ou muito curto
    if (buscaDev.trim().length < 3) {
      setSugestoesDev([]);
      return;
    }

    try {
      setLoadingDev(true);
      const resultado = await desevolvedorasService.getAll({
        filtroNome: buscaDev,
        direcao: "",
      });

      console.log(resultado);
      setSugestoesDev(resultado);
      setMostrarSugestoes(true);
    } catch (error) {
      console.error("Erro ao buscar desenvolvedoras", error);
    } finally {
      setLoadingDev(false);
    }
  }, [buscaDev]);

  useEffect(() => {
    carregarDesenvolvedoras();
  }, [carregarDesenvolvedoras]);

  const selecionarDesenvolvedora = (dev: DevOption) => {
    // mostra o nome do input
    setBuscaDev(dev.nome);

    // salva o id no form e valida
    setValue("desenvolvedoraId", dev.id, {
      shouldValidate: true,
      shouldDirty: true,
    });

    // fecha as sugestões
    setMostrarSugestoes(false);
  };

  const inputClasses =
    "w-full bg-[#161827] border border-[#211f36] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#51FAAA] focus:ring-1 focus:ring-[#51FAAA] transition-colors";
  const labelClasses =
    "block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 ml-1";
  const errorClasses = "text-[#FF81FF] text-xs mt-1 ml-1 font-medium";

  return (
    <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-[#0C0E1D] border border-[#211f36] shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-[#51FAAA] opacity-10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-[-50px] left-[-50px] w-60 h-60 bg-[#FF81FF] opacity-10 blur-3xl rounded-full pointer-events-none" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 relative z-10"
      >
        <div>
          <label htmlFor="titulo" className={labelClasses}>
            Título do Jogo
          </label>
          <input
            {...register("titulo")}
            placeholder="Ex: Hollow Knight"
            className={inputClasses}
          />
          {errors.titulo && (
            <p className={errorClasses}>{errors.titulo.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="sinopse" className={labelClasses}>
            Sinopse
          </label>
          <textarea
            {...register("sinopse")}
            placeholder="Breve descrição do jogo..."
            className={`${inputClasses} min-h-25 resize-y`}
          />
          {errors.sinopse && (
            <p className={errorClasses}>{errors.sinopse.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="status" className={labelClasses}>
              Status
            </label>
            <select
              {...register("status")}
              className={`${inputClasses} appearance-none cursor-pointer`}
            >
              <option value="naoDefinido">Não Definido</option>
              <option value="jogando">Jogando</option>
              <option value="concluido">Concluído</option>
              <option value="congelado">Congelado</option>
            </select>
          </div>

          <div>
            <label htmlFor="nota" className={labelClasses}>
              Nota (0-5)
            </label>
            <input
              type="number"
              min={0}
              max={5}
              {...register("nota", { valueAsNumber: true })}
              placeholder="0 a 5"
              className={inputClasses}
            />
            {errors.nota && (
              <p className={errorClasses}>{errors.nota.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="capaUrl" className={labelClasses}>
              URL da Capa
            </label>
            <input
              type="url"
              {...register("capaUrl")}
              placeholder="https://..."
              className={inputClasses}
            />
            {errors.capaUrl && (
              <p className={errorClasses}>{errors.capaUrl.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="dataLancamento" className={labelClasses}>
              Data de Lançamento
            </label>
            <input
              id="dataLancamento"
              type="date"
              {...register("dataLancamento")}
              className={`${inputClasses} scheme-dark`}
            />
            {errors.dataLancamento && (
              <p className={errorClasses}>{errors.dataLancamento.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="linkSteam" className={labelClasses}>
            Link Steam
          </label>
          <input
            type="url"
            {...register("linkSteam")}
            placeholder="https://store.steampowered.com/..."
            className={inputClasses}
          />
          {errors.linkSteam && (
            <p className={errorClasses}>{errors.linkSteam.message}</p>
          )}
        </div>

        <div className="flex items-center space-x-3 bg-[#161827] border border-[#211f36] p-4 rounded-xl">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              id="favorito"
              {...register("favorito")}
              className="peer appearance-none w-6 h-6 border-2 border-[#211f36] rounded bg-[#0C0E1D] checked:bg-[#51FAAA] checked:border-[#51FAAA] focus:outline-none focus:ring-2 focus:ring-[#51FAAA] focus:ring-offset-2 focus:ring-offset-[#0C0E1D] transition-colors cursor-pointer"
            />
            <svg
              className="absolute w-4 h-4 pointer-events-none hidden peer-checked:block text-[#0C0E1D] left-1 top-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <label
            htmlFor="favorito"
            className="text-gray-300 font-medium cursor-pointer select-none"
          >
            Marcar como Favorito
          </label>
          {errors.favorito && (
            <span className={errorClasses}>{errors.favorito.message}</span>
          )}
        </div>

        <div className="relative">
          <label htmlFor="desenvolvedoraBusca" className={labelClasses}>
            Desenvolvedora
          </label>
          <input
            id="desenvolvedoraBusca"
            type="text"
            value={buscaDev}
            placeholder="Digite o nome da desenvolvedora..."
            className={inputClasses}
            onChange={(e) => {
              const valor = e.target.value;
              setBuscaDev(valor);
              setMostrarSugestoes(true);
              setValue("desenvolvedoraId", null, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
            onFocus={() => {
              if (sugestoesDev.length > 0) {
                setMostrarSugestoes(true);
              }
            }}
            autoComplete="off"
          />

          {loadingDev && (
            <p className="text-[#51FAAA] text-xs mt-2 ml-1">
              Buscando desenvolvedoras...
            </p>
          )}

          {mostrarSugestoes && sugestoesDev.length > 0 && (
            <ul className="absolute z-20 w-full mt-2 bg-[#161827] border border-[#211f36] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] max-h-48 overflow-auto custom-scrollbar">
              {sugestoesDev.map((dev) => (
                <li
                  key={dev.id}
                  className="border-b border-[#211f36] last:border-0"
                >
                  <button
                    type="button"
                    className="w-full text-left px-4 py-3 text-gray-300 hover:bg-[#211f36] hover:text-[#51FAAA] transition-colors focus:bg-[#211f36] focus:outline-none"
                    onClick={() => selecionarDesenvolvedora(dev)}
                  >
                    {dev.nome}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {errors.desenvolvedoraId && (
            <p className={errorClasses}>{errors.desenvolvedoraId.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-8 py-4 px-6 rounded-xl bg-gradient-to-r from-[#51FAAA] to-[#FF81FF] text-[#0C0E1D] font-bold text-lg hover:opacity-90 hover:shadow-[0_0_20px_rgba(81,250,170,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Enviando..." : "Salvar Jogo"}
        </button>
      </form>
    </div>
  );
}
