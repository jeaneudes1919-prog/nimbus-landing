import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pricing } from "./Pricing";

const PRICE = {
  starter: "plan-price-starter",
  pro: "plan-price-pro",
  entreprise: "plan-price-entreprise",
};

function priceText(plan) {
  return screen.getByTestId(PRICE[plan]).textContent.replace(/\u202f|\u00a0/g, " ");
}

describe("Pricing", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("affiche les trois offres avec leurs noms", () => {
    render(<Pricing />);
    expect(screen.getByRole("heading", { name: /Starter/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Pro/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Entreprise/ })).toBeInTheDocument();
  });

  it("affiche un bouton d'action par offre", () => {
    render(<Pricing />);
    expect(screen.getAllByRole("link", { name: /Commencer gratuitement/ })).toHaveLength(1);
    expect(screen.getAllByRole("link", { name: /Essayer Pro/ })).toHaveLength(1);
    expect(screen.getAllByRole("link", { name: /Parler à un expert/ })).toHaveLength(1);
  });

  it("affiche les prix mensuels par défaut", () => {
    render(<Pricing />);
    expect(priceText("starter")).toBe("19 €");
    expect(priceText("pro")).toBe("49 €");
    expect(priceText("entreprise")).toBe("149 €");
  });

  it("bascule vers les prix annuels (-20 %) au clic", async () => {
    const user = userEvent.setup();
    render(<Pricing />);

    await user.click(screen.getByRole("button", { name: /Annuel/ }));

    await waitFor(() => expect(priceText("starter")).toBe("15,20 €"));
    expect(priceText("pro")).toBe("39,20 €");
    expect(priceText("entreprise")).toBe("119,20 €");
  });

  it("revient aux prix mensuels quand on reclique sur Mensuel", async () => {
    const user = userEvent.setup();
    render(<Pricing />);

    await user.click(screen.getByRole("button", { name: /Annuel/ }));
    await waitFor(() => expect(priceText("starter")).toBe("15,20 €"));

    await user.click(screen.getByRole("button", { name: /Mensuel/ }));
    await waitFor(() => expect(priceText("starter")).toBe("19 €"));
  });

  it("met en avant l'offre Pro", () => {
    render(<Pricing />);
    expect(screen.getByText("Le plus choisi")).toBeInTheDocument();
  });
});
