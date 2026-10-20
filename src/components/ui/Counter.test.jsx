import { afterEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { Counter } from "./Counter";

describe("Counter", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("affiche 0 avant le déclenchement visible", () => {
    render(<Counter value={2500} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("atteint la valeur finale une fois l'animation terminée", () => {
    vi.useFakeTimers();
    render(<Counter value={2500} suffix="+" />);

    act(() => {
      vi.advanceTimersByTime(1700);
    });

    expect(screen.getByText(/2\s*500\+/)).toBeInTheDocument();
  });

  it("respecte la durée demandée", () => {
    vi.useFakeTimers();
    render(<Counter value={100} suffix=" %" duration={800} />);

    act(() => {
      vi.advanceTimersByTime(400);
    });
    const midValue = Number(
      screen.getByText(/%/).textContent.replace(/[^\d]/g, "")
    );
    expect(midValue).toBeGreaterThan(0);
    expect(midValue).toBeLessThan(100);

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(screen.getByText(/100\s*%/)).toBeInTheDocument();
  });
});
