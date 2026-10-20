import { describe, expect, it } from "vitest";
import { counterValue, formatStat } from "./counter";

describe("counterValue", () => {
  it("atteint exactement la cible à la fin de l'animation", () => {
    expect(counterValue(2500, 1)).toBe(2500);
    expect(counterValue(38, 1)).toBe(38);
    expect(counterValue(150, 1)).toBe(150);
  });

  it("part de 0 au début", () => {
    expect(counterValue(2500, 0)).toBe(0);
  });

  it("progresse de manière croissante et bornée", () => {
    const values = [0.1, 0.3, 0.5, 0.7, 0.9].map((p) => counterValue(100, p));
    for (let i = 1; i < values.length; i += 1) {
      expect(values[i]).toBeGreaterThanOrEqual(values[i - 1]);
    }
    expect(counterValue(100, 2)).toBe(100);
    expect(counterValue(100, -1)).toBe(0);
  });

  it("tolère les valeurs invalides", () => {
    expect(counterValue(undefined, 1)).toBe(0);
  });
});

describe("formatStat", () => {
  it("utilise le format français (espace de milliers)", () => {
    expect(formatStat(2500).replace(/\u202f|\u00a0/g, " ")).toBe("2 500");
  });
});
