import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { LoginModal } from "./LoginModal";

function fillCredentials({ email = "camille@nimbus.app", password = "motdepasse123" } = {}) {
  fireEvent.change(screen.getByLabelText("Adresse email"), { target: { value: email } });
  fireEvent.change(screen.getByLabelText("Mot de passe"), { target: { value: password } });
}

describe("LoginModal", () => {
  it("affiche une modale accessible avec les champs de connexion", () => {
    render(<LoginModal open onClose={() => {}} />);

    expect(screen.getByRole("dialog", { name: "Bon retour parmi nous" })).toBeInTheDocument();
    expect(screen.getByLabelText("Adresse email")).toBeInTheDocument();
    expect(screen.getByLabelText("Mot de passe")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Se connecter" })).toBeInTheDocument();
  });

  it("affiche les erreurs pour un email invalide et un mot de passe trop court", () => {
    render(<LoginModal open onClose={() => {}} />);

    fireEvent.change(screen.getByLabelText("Adresse email"), { target: { value: "camille" } });
    fireEvent.change(screen.getByLabelText("Mot de passe"), { target: { value: "123" } });
    fireEvent.click(screen.getByRole("button", { name: "Se connecter" }));

    expect(screen.getByText(/adresse email valide/i)).toBeInTheDocument();
    expect(screen.getByText(/au moins 8 caractères/i)).toBeInTheDocument();
  });

  it("simule la connexion et affiche le message de succès", async () => {
    render(<LoginModal open onClose={() => {}} />);

    fillCredentials();
    fireEvent.click(screen.getByRole("button", { name: "Se connecter" }));

    expect(screen.getByText(/connexion…/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/connexion réussie/i, {}, { timeout: 3000 })
    ).toBeInTheDocument();
    expect(screen.getByText(/aucune donnée n.a été transmise/i)).toBeInTheDocument();
  });

  it("se ferme avec la touche Échap", () => {
    const onClose = vi.fn();
    render(<LoginModal open onClose={onClose} />);

    fireEvent.keyDown(document, { key: "Escape" });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("permet de masquer et réafficher le mot de passe", () => {
    render(<LoginModal open onClose={() => {}} />);

    const input = screen.getByLabelText("Mot de passe");
    expect(input).toHaveAttribute("type", "password");

    fireEvent.click(screen.getByRole("button", { name: "Afficher le mot de passe" }));
    expect(input).toHaveAttribute("type", "text");

    fireEvent.click(screen.getByRole("button", { name: "Masquer le mot de passe" }));
    expect(input).toHaveAttribute("type", "password");
  });
});
