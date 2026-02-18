import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";

import { useEffect, useState } from "react";
import { applyTheme, getInitialTheme, type Theme } from "./services/theme";

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#2a0b0b] via-[#140b0b] to-[#b3250a]">
      <Navbar theme={theme} setTheme={setTheme} />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <AppRoutes />
      </main>
    </div>
  );
}
