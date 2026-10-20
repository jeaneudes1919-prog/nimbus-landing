import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Testimonials } from "./Testimonials";
import { TESTIMONIALS } from "../../data/testimonials";

function activeDotIndex() {
  const tabs = screen.getAllByRole("tab");
  return tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true");
}

describe("Testimonials (carrousel)", () => {
  it("démarre sur le premier témoignage", () => {
    render(<Testimonials />);
    expect(activeDotIndex()).toBe(0);
  });

  it("passe au témoignage suivant puis revient au précédent", async () => {
    const user = userEvent.setup();
    render(<Testimonials />);

    await user.click(screen.getByRole("button", { name: "Témoignage suivant" }));
    expect(activeDotIndex()).toBe(1);

    await user.click(screen.getByRole("button", { name: "Témoignage précédent" }));
    expect(activeDotIndex()).toBe(0);
  });

  it("boucle du premier au dernier témoignage (précédent)", async () => {
    const user = userEvent.setup();
    render(<Testimonials />);

    await user.click(screen.getByRole("button", { name: "Témoignage précédent" }));
    expect(activeDotIndex()).toBe(TESTIMONIALS.length - 1);
  });

  it("boucle du dernier au premier témoignage (suivant)", async () => {
    const user = userEvent.setup();
    render(<Testimonials />);

    for (let i = 0; i < TESTIMONIALS.length; i += 1) {
      await user.click(screen.getByRole("button", { name: "Témoignage suivant" }));
    }
    expect(activeDotIndex()).toBe(0);
  });

  it("permet de naviguer via les points cliquables", async () => {
    const user = userEvent.setup();
    render(<Testimonials />);

    await user.click(screen.getByRole("tab", { name: "Témoignage 3 sur 5" }));
    expect(activeDotIndex()).toBe(2);
  });

  it("soutient la navigation au clavier avec les flèches", async () => {
    const user = userEvent.setup();
    render(<Testimonials />);

    const region = screen.getByRole("region", { name: "Témoignages clients" });
    region.focus();
    await user.keyboard("{ArrowRight}");
    expect(activeDotIndex()).toBe(1);
  });
});
