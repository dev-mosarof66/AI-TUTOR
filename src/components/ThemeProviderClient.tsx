// src/ThemeProviderClient.tsx
"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: { mode: "light", primary: { main: "#1976d2" } },
  typography: { fontFamily: "var(--font-roboto)" },
});

export function ThemeProviderClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
