import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useJogo } from "../../../features/jogos/hooks/useJogo";
import type { ObterJogo } from "../../../features/jogos/types";
import { JogoDetalhes } from "../../../features/jogos/components/JogoDetalhes";

export const Route = createFileRoute("/jogos/$jogoId/")({
  component: JogoDetail,
});

function JogoDetail() {
  return <JogoDetalhes />;
}
