import { describe, expect, it } from "vitest";
import { isValidEmail, normalizeEmail } from "./email";

describe("isValidEmail", () => {
  it("accepte les adresses valides", () => {
    expect(isValidEmail("camille@entreprise.fr")).toBe(true);
    expect(isValidEmail("  thomas.lefevre@nimbus.app  ")).toBe(true);
    expect(isValidEmail("a+b@sous.domaine.co")).toBe(true);
  });

  it("rejette les adresses invalides", () => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("camille")).toBe(false);
    expect(isValidEmail("camille@")).toBe(false);
    expect(isValidEmail("camille@entreprise")).toBe(false);
    expect(isValidEmail("@entreprise.fr")).toBe(false);
    expect(isValidEmail("camille @entreprise.fr")).toBe(false);
  });

  it("rejette les valeurs non textuelles", () => {
    expect(isValidEmail(null)).toBe(false);
    expect(isValidEmail(42)).toBe(false);
  });
});

describe("normalizeEmail", () => {
  it("met en minuscules et supprime les espaces", () => {
    expect(normalizeEmail("  Camille@Nimbus.APP ")).toBe("camille@nimbus.app");
    expect(normalizeEmail(null)).toBe("");
  });
});
