// Tudo que o mundo externo pode usar desta feature
// O que é um barrel export? Um arquivo index.ts que reexporta tudo da feature.
// Quem importa de fora da feature usa apenas '@/features/products' — não precisa saber a estrutura interna de pastas.

export type {
  DesenvolvedoraFiltrosType,
  DesenvolvedorasResponseType,
} from "./types";
export { desevolvedorasService } from "./service";
// Sem barrel, seria:
// import { useProducts } from '@/features/products/hooks/useProducts'
// import { ProductForm } from '@/features/products/components/ProductForm'
// import { ProductList } from '@/features/products/components/ProductList'
