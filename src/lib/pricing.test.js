import { describe, expect, it } from "vitest";
import {
  ANNUAL_DISCOUNT,
  BILLING,
  formatPrice,
  getAnnualTotal,
  getMonthlyEquivalent,
  getYearlySavings,
} from "./pricing";

describe("getMonthlyEquivalent", () => {
  it("retourne le prix mensuel complet en facturation mensuelle", () => {
    expect(getMonthlyEquivalent(49, BILLING.monthly)).toBe(49);
  });

  it("applique -20 % en facturation annuelle", () => {
    expect(getMonthlyEquivalent(49, BILLING.annual)).toBe(39.2);
    expect(getMonthlyEquivalent(19, BILLING.annual)).toBe(15.2);
    expect(getMonthlyEquivalent(149, BILLING.annual)).toBe(119.2);
  });

  it("protège contre les valeurs invalides", () => {
    expect(getMonthlyEquivalent(undefined, BILLING.monthly)).toBe(0);
    expect(getMonthlyEquivalent(-10, BILLING.annual)).toBe(0);
    expect(getMonthlyEquivalent("abc", BILLING.monthly)).toBe(0);
  });
});

describe("getAnnualTotal", () => {
  it("multiplie le prix mensuel équivalent par 12", () => {
    expect(getAnnualTotal(49, BILLING.monthly)).toBe(588);
    expect(getAnnualTotal(49, BILLING.annual)).toBe(470.4);
  });
});

describe("getYearlySavings", () => {
  it("correspond à exactement 20 % du total mensuel", () => {
    expect(getYearlySavings(49)).toBe(117.6);
    expect(getYearlySavings(19) + getAnnualTotal(19, BILLING.annual)).toBe(
      getAnnualTotal(19, BILLING.monthly)
    );
  });
});

describe("formatPrice", () => {
  it("formate en euros, sans centimes inutiles", () => {
    expect(formatPrice(19).replace(/\u202f|\u00a0/g, " ")).toBe("19 €");
    expect(formatPrice(39.2).replace(/\u202f|\u00a0/g, " ")).toBe("39,20 €");
  });
});

describe("ANNUAL_DISCOUNT", () => {
  it("vaut 20 %", () => {
    expect(ANNUAL_DISCOUNT).toBe(0.2);
  });
});
