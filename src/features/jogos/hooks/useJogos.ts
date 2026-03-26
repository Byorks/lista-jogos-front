import { ZodError } from "zod/v4";
import { jogosService } from "../service";
import type {
  ListarJogosResponse,
  CriarJogoRequest,
  JogoFiltros,
} from "../types";
import { useCallback, useEffect, useState } from "react";

export const useJogos = (filtrosIniciais?: JogoFiltros) => {
  const [dados, setDados] = useState<ListarJogosResponse | null>(null);

  const [filtros, setFiltros] = useState<JogoFiltros>(
    filtrosIniciais ?? { paginaAtual: 1, itensPorPagina: 20 },
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const buscar = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setDados(await jogosService.getAll(filtros));
    } catch (err) {
      if (err instanceof ZodError) {
        console.error("Erro ao buscar jogos:", err);
        setError("Dados inválidos recebidos da API");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro desconhecido");
      }
    } finally {
      setLoading(false);
    }
  }, [filtros]);

  useEffect(() => {
    buscar();
  }, [buscar]);

  return { dados, filtros, setFiltros, error, loading, buscar };
};
