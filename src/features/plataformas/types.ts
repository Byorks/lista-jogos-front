import { z } from "zod";
import { ResumoPlataforma } from "./schemas";

export type ResumoPlataformaType = z.infer<typeof ResumoPlataforma>;
