"use client";

// The label is swapped in CSS from the <html> data-theme attribute, so React
// never needs to know the current theme and hydration always matches.
export default function ThemeToggle() {
  function toggleTheme() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be unavailable (private mode); the switch still applies.
    }
  }

  return (
    <button className="themeToggle" type="button" onClick={toggleTheme}>
      <span className="themeToggleToLight">LIGHT MODE</span>
      <span className="themeToggleToDark">DARK MODE</span>
    </button>
  );
}
