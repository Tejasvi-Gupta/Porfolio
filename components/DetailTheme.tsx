"use client";
import { useEffect, useRef } from "react";
export function DetailTheme() {
  const button = useRef<HTMLButtonElement>(null);
  function apply(light: boolean) {
    document.documentElement.dataset.theme = light ? "light" : "dark";
    button.current?.setAttribute("aria-pressed", String(light));
  }
  useEffect(() => {
    try {
      apply(localStorage.getItem("arctic-theme") === "light");
    } catch {}
  }, []);
  return (
    <button
      className="button"
      ref={button}
      aria-pressed="false"
      onClick={() => {
        const light = document.documentElement.dataset.theme !== "light";
        apply(light);
        try {
          localStorage.setItem("arctic-theme", light ? "light" : "dark");
        } catch {}
      }}
    >
      Light theme
    </button>
  );
}
