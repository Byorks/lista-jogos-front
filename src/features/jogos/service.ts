import { apiClient } from "@/shared/api"; // helper fetch centralizado
import {
  obterJogoSchema,
  listarJogosSchema,
  criarJogoResponseSchema,
  criarJogoRequestSchema,
} from "./schemas";
import type {
  JogoResumo,
  ListarJogos,
  CriarJogo,
  ObterJogo,
  AtualizarJogo,
  CriarJogoRequest,
  JogoFiltros,
  CriarJogoResponse,
} from "./types";
import z from "zod";

const BASE_URL = "/api/jogos";

function toParams(filtros?: JogoFiltros): Record<string, unknown> | undefined {
  if (!filtros) return undefined;
  return Object.fromEntries(
    Object.entries(filtros).filter(([, value]) => value !== undefined),
  );
}

export const jogosService = {
  getAll: async (filtros?: JogoFiltros): Promise<ListarJogos> => {
    const response = await apiClient.get<unknown>(BASE_URL, toParams(filtros));
    console.log(response);

    // safeParse não interrompe a execução, apenas retorna um resultado com sucesso ou erro
    const resultado = listarJogosSchema.safeParse(response);

    if (!resultado.success) {
      const tree = z.treeifyError(resultado.error);
      console.error("Zod validation errors:", tree);
      throw new Error("Dados inválidos recebidos da API");
    }
    // .parse() vai validar e lançar um erro se a validação falhar
    // garante que o retorno é do tipo esperado (ListarJogos)
    return resultado.data;
  },
  getById: async (jogoId: string): Promise<ObterJogo> => {
    const response = await apiClient.get<unknown>(`${BASE_URL}/${jogoId}`);
    const resultado = obterJogoSchema.safeParse(response);

    if (!resultado.success) {
      console.error("Zod validation errors:", resultado.error.format());
      throw new Error("Dados inválidos recebidos da API");
    }

    return resultado.data;
  },

  create: async (jogo: CriarJogoRequest): Promise<CriarJogoResponse> => {
    // valida o input antes de enviar para a API
    // pega erros mais cedo, sem gastar uma requisição
    criarJogoRequestSchema.parse(jogo);

    const response = await apiClient.post(BASE_URL, jogo);

    return criarJogoResponseSchema.parse(response);
  },
};
