import { createFileRoute } from "@tanstack/react-router";
import { CreateJogoPage } from "@/features/jogos";

export const Route = createFileRoute("/jogos/new")({
  component: CreateJogoRoute,
});

function CreateJogoRoute() {
  return <CreateJogoPage />;
}
