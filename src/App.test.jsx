import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

describe("App (test de fumée)", () => {
  it("rend la landing complète sans erreur", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Libérez vos équipes/)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Un prix simple/ })
    ).toBeInTheDocument();
  });

  it("affiche les sections principales de la landing", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(document.getElementById("fonctionnalites")).toBeInTheDocument();
    expect(document.getElementById("comment-ca-marche")).toBeInTheDocument();
    expect(document.getElementById("tarifs")).toBeInTheDocument();
    expect(document.getElementById("temoignages")).toBeInTheDocument();
    expect(document.getElementById("faq")).toBeInTheDocument();
    expect(document.getElementById("essai-gratuit")).toBeInTheDocument();
  });

  it("rend la page 404 sur une route inconnue", () => {
    render(
      <MemoryRouter initialEntries={["/route-inconnue"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText(/perdue dans les nuages/)).toBeInTheDocument();
  });
});
