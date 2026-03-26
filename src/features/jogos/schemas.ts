import { nonnegative, z } from "zod";
import { ResumoPlataforma } from "../plataformas/schemas";

// z.object define a forma do objeto — igual uma interface TS,
// mas com validação real em tempo de execução
//
// Campos que aparecem em TODOS os schemas de produto
// Não é um schema completo — é um bloco reutilizável
const jogoSchemaBase = {
  id: z.string(),
  titulo: z
    .string()
    .max(100, { message: "O título não pode exceder 100 caracteres" })
    .nonoptional(),
};

// Campos que aparecem só em respostas (não em criação)
const jogoResponseFields = {
  dataAdicionado: z.iso.date(),
};

// ─── Schemas compostos com os blocos ─────────────────────
// ─── 1. Resposta do GET /jogos (listagem) ─────────────
// Corresponde ao ListarJogosRequest do C#
// Zod valida os query params da URL
// ?filtoTitulo=celeste&status=Concluido
export const JogosSearchSchema = z.object({
  filtroTitulo: z.string().optional(),
  status: z
    .enum(["NaoDefinido", "Jogando", "Concluido", "Congelado"]) // tudo minúsculo para consistência
    .optional(),
  notaMinima: z.coerce.number().min(0).max(10).optional(),
  ehFavorito: z.boolean().optional(),
  generoId: z.uuid().optional(), // valida UUID se quiser
  ordenarPor: z.enum(["titulo", "nota", "dataAdicionado"]).optional(),
  direcao: z.enum(["asc", "desc"]).optional(),
  paginaAtual: z.coerce.number().int().min(1).optional().default(1),
  itensPorPagina: z.coerce
    .number()
    .int()
    .min(1)
    .max(100)
    .optional()
    .default(10),
});

// Corresponde  a record ResumoJogo do C#
export const resumoJogoSchema = z.object({
  ...jogoSchemaBase,
  ...jogoResponseFields,
  status: z
    .enum(["NaoDefinido", "Jogando", "Concluido", "Congelado"])
    .nullable()
    .optional(),
  capaUrl: z.url().max(100).nullable().optional(),
  nota: z.int().lte(5).gte(0).nullable().optional(),
  favorito: z.boolean(),
  desenvolvedoraNome: z.string().nullable().optional(),
  generosNomes: z.array(z.string()).nullable().default([]),
  plataformas: z.array(ResumoPlataforma).nullable().default([]),
});

// Corresponde ao ListarJogosResponse do C#
export const listarJogosSchema = z.object({
  itens: z.array(resumoJogoSchema),
  itensTotais: z.int().nonnegative(),
  paginaAtual: z.int().positive().optional().default(1),
  itensPorPagina: z.int().positive().nullable().optional(),
  totalPaginas: z.int().nonnegative(),
});

// ─── 2. Resposta do GET /jogos/{id} (detalhe) ────────────
// Corresponde ao ObterJogoResponse do C#
export const obterJogoSchema = resumoJogoSchema.extend({
  sinopse: z
    .string()
    .max(1500, { message: "A sinopse não pode exceder 1500 caracteres" })
    .nullable(),
  analise: z.string().max(3000).nullable(),
  desenvolvedoraId: z.uuid().nullable(),
});

// ─── 3. Body do POST /jogos (criação) ────────────
// Corresponde ao CriarJogoResponse do C#
export const criarJogoResponseSchema = z.object({
  ...jogoSchemaBase,
  ...jogoResponseFields,
  desenvolvedoraId: z.uuid().nullable(),
  desenvolvedoraNome: z.string().nullable(),
});

export const criarJogoRequestSchema = z.object({
  titulo: z
    .string()
    .max(100, { message: "O título não pode exceder 100 caracteres" })
    .nonoptional(),
  sinopse: z
    .string()
    .max(1500, { message: "A sinopse não pode exceder 1500 caracteres" })
    .nullable(),
  status: z
    .enum(["NaoDefinido", "Jogando", "Concluido", "Congelado"])
    .nullable(),
  capaUrl: z.url().max(100).nullable(),
  nota: z.int().lte(5).gte(0).nullable(),
  dataLancamento: z.iso.date().nullable(),
  linkSteam: z.url().max(100).nullable(),
  favorito: z.boolean().optional(),
  desenvolvedoraId: z.uuid().nullable(),
});

// ─── 4. Body do PUT /jogos/{id} (atualização) ────────────
// Gerado a partir do criarJogoSchema, permitindo campos opcionais
export const atualizarJogoSchema = criarJogoResponseSchema.partial();
