import { z } from "zod";
import { resumoJogoPorDesenvolvedoraSchema } from "../jogos/schemas";

export const ResumoDesenvolvedora = z.object({
  id: z.string().nullable(),
  nome: z.string().max(100),
});

export const DesenvolvedoraRequest = z.object({
  filtroNome: z.string().optional(),
  direcao: z.string().optional().default("asc"),
});

export const DesenvolvedoraResponse = ResumoDesenvolvedora.extend({
  jogos: z.array(resumoJogoPorDesenvolvedoraSchema),
});

export const DesenvolvedorasResponse = z.array(DesenvolvedoraResponse);
