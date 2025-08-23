"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"

export function ThemeProvider({ 
  children, 
  themeType = "matrimonial", 
  ...props
}: React.ComponentProps<typeof NextThemesProvider> & { themeType?: "matrimonial" | "social" }) {
  const {theme} = useTheme();

  React.useEffect(() => {
    document.body.classList.remove("matrimonial", "social", "dark", "light");
    document.body.classList.add(themeType, theme || "light");
  }, [themeType, theme]);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
