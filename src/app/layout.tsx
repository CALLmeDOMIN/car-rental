import "./globals.css";
import Nav from "../components/nav";
import { ClerkProvider } from "@clerk/nextjs";
import { cookies } from "next/dist/client/components/headers";
import { ThemeSwitch } from "@/components/themeSwitch";
import { dark } from "@clerk/themes";

export const metadata = {
  title: "Car rental",
  description: "Car rental website, private project for learning purposes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = cookies().get("theme")?.value || "dark";

  const bgClr = theme === "dark" ? "#0c1418" : "#f4f4f6";
  const textClr = theme === "dark" ? "#dde8ee" : "#151519";

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
        variables: {
          colorPrimary: "#de964f",
          colorBackground: bgClr,
          colorText: textClr,
          fontFamily: "Inter, sans-serif",
        },
      }}
    >
      <html lang="en" className={theme}>
        <body className="bg-background font-sans text-text transition duration-700 dark:bg-darkbg dark:text-darktext">
          <Nav />
          <ThemeSwitch theme={theme} />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
