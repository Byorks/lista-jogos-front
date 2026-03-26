import z from "zod";
import {
  criarJogoResponseSchema,
  atualizarJogoSchema,
  listarJogosSchema,
  obterJogoSchema,
  resumoJogoSchema,
  criarJogoRequestSchema,
  JogosSearchSchema,
} from "./schemas";

// ─── Types inferidos de cada schema ──────────────────────
// Não precisa escrever interfaces TyoesScript separadas. O Zod gera os
// tipos a partir dos schemas definidos.
export type ResumoJogo = z.infer<typeof resumoJogoSchema>;
export type JogosSearch = z.infer<typeof JogosSearchSchema>;
export type JogoFiltros = JogosSearch;
export type ListarJogosResponse = z.infer<typeof listarJogosSchema>;
export type ObterJogo = z.infer<typeof obterJogoSchema>;
export type CriarJogoResponse = z.infer<typeof criarJogoResponseSchema>;
export type CriarJogoRequest = z.infer<typeof criarJogoRequestSchema>;
export type AtualizarJogo = z.infer<typeof atualizarJogoSchema>;

// ─── 2. Estados de UI ─────────────────────────────────────
// Filtros espelham o ListarJogosRequest do CSharp
// Os campos opcionais usam undefinet (ausente), não null

// export interface JogoFiltros {
//   filtroTitulo?: string;
//   status?: "naoDefinido" | "jogando" | "concluido" | "congelado";
//   notaMinima?: number;
//   ehFavorito?: boolean;
//   generoId?: string; // uuid como string no front-ent
//   ordenarPor?: "titulo" | "nota" | "dataAdicionado";
//   direcao?: "asc" | "desc";
//   paginaAtual?: number | 1;
//   itensPorPagina?: number;
// }

// Estado do hook de listagem - guarda o envelope inteiro
export interface JogoListagemEstado {
  dados: ListarJogosResponse | null; // null antes da primeira busca
  loading: boolean;
  error: string | null;
  filtros: JogoFiltros;
}

// Estado do hook de detalhe - guarda o jogo diretamente
export interface JogoDetalheEstado {
  jogo: ObterJogo | null; // null antes da primeira busca
  loading: boolean;
  error: string | null;
}
