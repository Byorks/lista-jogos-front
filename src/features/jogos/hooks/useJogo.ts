import type { ObterJogo } from "../types";
import { ZodError } from "zod/v3";
import { useState, useEffect, useCallback } from "react";
import { jogosService } from "../service";

export const useJogo = (jogoId: string) => {
  const [jogo, setJogo] = useState<ObterJogo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getJogo = useCallback(async () => {
    try {
      setLoading(true);
      const response = await jogosService.getById(jogoId);
      setJogo(response);
      console.log("Dados recebidos:", response);
    } catch (err) {
      if (err instanceof ZodError) {
        console.error("Erro ao buscar jogo:", err);
        setError("Dados inválidos recebidos da API");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro desconhecido");
      }
    } finally {
      setLoading(false);
    }
  }, [jogoId]);

  useEffect(() => {
    getJogo();
  }, [getJogo]);

  return { jogo, loading, error, setJogo, getJogo };
};
