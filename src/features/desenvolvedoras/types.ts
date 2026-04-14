import { z } from "zod";
import {
  ResumoDesenvolvedora,
  DesenvolvedoraRequest,
  DesenvolvedorasResponse,
} from "./schema";

export type ResumoDesenvolvedoraType = z.infer<typeof ResumoDesenvolvedora>;
export type DesenvolvedoraFiltrosType = z.infer<typeof DesenvolvedoraRequest>;
export type DesenvolvedorasResponseType = z.infer<
  typeof DesenvolvedorasResponse
>;
