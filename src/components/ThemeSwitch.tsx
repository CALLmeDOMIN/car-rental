"use client";

import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { useState } from "react";

export enum Theme {
  light = "light",
  dark = "dark",
}

export default function ThemeSwitch({ theme }: { theme?: string }) {
  const [_theme, setTheme] = useState(theme);

  const toggleTheme = () => {
    const root = document.getElementsByTagName("html")[0];
    root.classList.toggle(Theme.dark);
    if (root.classList.contains("dark")) {
      setTheme("dark");
      document.cookie = "theme=dark";
    } else {
      setTheme("light");
      document.cookie = "theme=light";
    }
  };

  return (
    <button
      className="absolute right-20 top-7 lg:right-5"
      onClick={toggleTheme}
    >
      {_theme === Theme.light ? <IconSun /> : <IconMoonStars />}
    </button>
  );
}
