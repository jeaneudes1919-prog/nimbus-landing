import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Faq } from "./Faq";
import { FAQ_ITEMS } from "../../data/faq";

function getTrigger(question) {
  return screen.getByRole("button", { name: question });
}

describe("Faq (accordéon)", () => {
  it("affiche toutes les questions, fermées par défaut", () => {
    render(<Faq />);
    FAQ_ITEMS.forEach((item) => {
      expect(getTrigger(item.question)).toHaveAttribute("aria-expanded", "false");
    });
    expect(screen.queryByText(FAQ_ITEMS[0].answer)).not.toBeInTheDocument();
  });

  it("ouvre une question au clic et affiche sa réponse", async () => {
    const user = userEvent.setup();
    render(<Faq />);

    await user.click(getTrigger(FAQ_ITEMS[0].question));

    expect(getTrigger(FAQ_ITEMS[0].question)).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(FAQ_ITEMS[0].answer)).toBeInTheDocument();
  });

  it("ne laisse qu'une seule question ouverte à la fois", async () => {
    const user = userEvent.setup();
    render(<Faq />);

    await user.click(getTrigger(FAQ_ITEMS[0].question));
    await user.click(getTrigger(FAQ_ITEMS[1].question));

    expect(getTrigger(FAQ_ITEMS[0].question)).toHaveAttribute("aria-expanded", "false");
    expect(getTrigger(FAQ_ITEMS[1].question)).toHaveAttribute("aria-expanded", "true");
  });

  it("referme la question ouverte quand on reclique dessus", async () => {
    const user = userEvent.setup();
    render(<Faq />);

    await user.click(getTrigger(FAQ_ITEMS[0].question));
    await user.click(getTrigger(FAQ_ITEMS[0].question));

    expect(getTrigger(FAQ_ITEMS[0].question)).toHaveAttribute("aria-expanded", "false");
  });
});
