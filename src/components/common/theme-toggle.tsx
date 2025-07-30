import { useState, useEffect, useCallback } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "../ui/button";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const initialTheme = savedTheme || systemTheme;

    setTheme(initialTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  }, [setTheme, theme]);

  const themeIcon = () => {
    if (theme === "dark") {
      return <Sun className="w-5 h-5" />;
    } else if (theme === "light") {
      return <Moon className="w-5 h-5" />;
    } else {
      return null;
    }
  };

  return (
    theme && (
      <Button
        onClick={toggleTheme}
        className="p-2 rounded-md hover:bg-accent transition-colors"
        aria-label="Toggle theme"
      >
        {themeIcon()}
      </Button>
    )
  );
}
