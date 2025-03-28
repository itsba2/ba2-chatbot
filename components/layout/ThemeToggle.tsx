"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

type ThemeType = "light" | "dark" | "system";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <button
            aria-label="Toggle Dark Mode"
            onClick={toggleTheme}
            className="rounded-full p-2 transition-colors hover:bg-gray-200"
        >
            {theme === "dark" ? (
                <FiSun className="h-5 w-5 text-teal-500" />
            ) : (
                <FiMoon className="h-5 w-5 text-indigo-500" />
            )}
        </button>
    );
}
