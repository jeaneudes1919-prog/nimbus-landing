import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Navbar } from "./Navbar";

function renderNavbar() {
  return render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );
}

describe("Navbar (menu mobile)", () => {
  it("le menu mobile est fermé par défaut", () => {
    renderNavbar();
    const toggle = screen.getByRole("button", { name: "Ouvrir le menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("ouvre le menu plein écran au clic", async () => {
    const user = userEvent.setup();
    renderNavbar();

    await user.click(screen.getByRole("button", { name: "Ouvrir le menu" }));

    const toggle = screen.getByRole("button", { name: "Fermer le menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("dialog", { name: "Menu principal" })).toBeInTheDocument();
  });

  it("ferme le menu avec la touche Échap", async () => {
    const user = userEvent.setup();
    renderNavbar();

    await user.click(screen.getByRole("button", { name: "Ouvrir le menu" }));
    await user.keyboard("{Escape}");

    expect(screen.getByRole("button", { name: "Ouvrir le menu" })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("affiche les liens de navigation", () => {
    renderNavbar();
    expect(screen.getAllByRole("link", { name: "Tarifs" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Fonctionnalités" }).length).toBeGreaterThan(0);
  });

  it("ouvre la modale de connexion au clic sur Se connecter", async () => {
    const user = userEvent.setup();
    renderNavbar();

    await user.click(screen.getByRole("button", { name: "Se connecter" }));

    expect(screen.getByRole("dialog", { name: "Bon retour parmi nous" })).toBeInTheDocument();
  });
});
