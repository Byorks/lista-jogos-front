import { apiClient } from "@/shared/api";
import type {
  DesenvolvedoraFiltrosType,
  DesenvolvedorasResponseType,
} from "@/features/desenvolvedoras/types";
import { DesenvolvedorasResponse } from "./schema";
import z from "zod";

const BASE_URL = "/api/desenvolvedoras";

function toParams(
  filtros?: DesenvolvedoraFiltrosType,
): Record<string, unknown> | undefined {
  return filtros ? { ...filtros } : undefined;
}

export const desevolvedorasService = {
  getAll: async (
    filtros?: DesenvolvedoraFiltrosType,
  ): Promise<DesenvolvedorasResponseType> => {
    const response = await apiClient.get<DesenvolvedorasResponseType>(
      BASE_URL,
      toParams(filtros),
    );
    console.log(response);

    const resultado = DesenvolvedorasResponse.safeParse(response);

    if (!resultado.success) {
      const tree = z.treeifyError(resultado.error);
      console.error("Zod validation errors:", tree);
      throw new Error("Dados inválidos recebidos da API");
    }

    return resultado.data;
  },
};
