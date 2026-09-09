import React from "react";
import { renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { langFromPath, homePath, dictFor, useLang } from "../useLang";
import { es } from "../es";
import { en } from "../en";

test("langFromPath", () => {
  expect(langFromPath("/")).toBe("es");
  expect(langFromPath("/en")).toBe("en");
  expect(langFromPath("/en/")).toBe("en");
  expect(langFromPath("/english")).toBe("es");
  expect(langFromPath("/proyectos")).toBe("es");
});

test("homePath", () => {
  expect(homePath("es")).toBe("/");
  expect(homePath("en")).toBe("/en");
});

test("dictFor", () => {
  expect(dictFor("es")).toBe(es);
  expect(dictFor("en")).toBe(en);
});

test("useLang reads the router location", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={["/en"]}>{children}</MemoryRouter>
  );
  const { result } = renderHook(() => useLang(), { wrapper });
  expect(result.current).toBe("en");
});
