import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/lib/material-ui";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Website Builder",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body className={inter.className}>{children}</body>
      </ThemeProvider>
    </html>
  );
}
