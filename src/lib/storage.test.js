import { beforeEach, describe, expect, it } from "vitest";
import { readStorage, removeStorage, writeStorage } from "./storage";

describe("storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("écrit puis relit une valeur JSON", () => {
    expect(writeStorage("test:key", { billing: "annual" })).toBe(true);
    expect(readStorage("test:key")).toEqual({ billing: "annual" });
  });

  it("retourne la valeur de repli si la clé n'existe pas", () => {
    expect(readStorage("absent", "fallback")).toBe("fallback");
  });

  it("retourne la valeur de repli si le JSON est corrompu", () => {
    window.localStorage.setItem("corrompu", "{pas du json");
    expect(readStorage("corrompu", "fallback")).toBe("fallback");
  });

  it("supprime une clé", () => {
    writeStorage("test:key", 42);
    removeStorage("test:key");
    expect(readStorage("test:key")).toBeNull();
  });
});
