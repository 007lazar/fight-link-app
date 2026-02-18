export type Theme = "dark" | "light";

const KEY = "theme";

export function getInitialTheme(): Theme {
  const saved = localStorage.getItem(KEY);
  return saved === "light" ? "light" : "dark";
}

export function applyTheme(theme: Theme) {
  localStorage.setItem(KEY, theme);
  document.documentElement.setAttribute("data-theme", theme);
}
