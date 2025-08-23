"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])


  const toggleMatrimonialTheme = React.useCallback(() => {
    if (theme === "dark") {
      setTheme("light");
      document.body.classList.remove("dark");
      document.body.classList.add("matrimonial", "light");
    } else {
      setTheme("dark");
      document.body.classList.remove("light");
      document.body.classList.add("matrimonial", "dark");
    }
    document.body.classList.remove("social");
  }, [theme, setTheme]);


    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="h-9 w-9">
                <Sun className="h-4 w-4" />
            </Button>
        )
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleMatrimonialTheme}
            className="h-9 w-9 border border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/20"
        >
            {theme === "light" ? (
                <Moon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            ) : (
                <Sun className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
