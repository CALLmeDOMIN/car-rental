import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";
import { cookies } from "next/headers";
import Nav from "@/components/Nav";
import ThemeSwitch from "@/components/ThemeSwitch";

export const metadata = {
  title: "Car rental",
  description: "Car rental website, private project for learning purposes.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value || "dark";

  const bgClr = theme === "dark" ? "#0c1418" : "#f4f4f6";
  const textClr = theme === "dark" ? "#dde8ee" : "#151519";

  return (
    <html lang="en" className={theme}>
      <body className="bg-background font-sans text-text transition duration-150 dark:bg-darkbg dark:text-darktext">
        <ClerkProvider
          appearance={{
            theme: theme === "dark" ? dark : undefined,
            variables: {
              colorPrimary: "#de964f",
              colorBackground: bgClr,
              colorForeground: textClr,
              fontFamily: "Inter, sans-serif",
            },
          }}
        >
          <Nav />
          {process.env.NODE_ENV === "development" && (
            <ThemeSwitch theme={theme} />
          )}
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
