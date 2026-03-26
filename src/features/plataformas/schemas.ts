import { z } from "zod";

export const ResumoPlataforma = z.object({
  id: z.string().nullable(),
  titulo: z.string().max(100).nullable(),
  logoUrl: z.url().max(200).nullable(),
});

export type ResumoPlataformaType = z.infer<typeof ResumoPlataforma>;
