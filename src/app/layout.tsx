import "./globals.css";
import Nav from "../components/nav";
import { ClerkProvider } from "@clerk/nextjs";
import { cookies } from "next/dist/client/components/headers";
import { ThemeSwitch } from "@/components/themeSwitch";

export const metadata = {
  title: "Car rental",
  description: "Car rental website, private project for learning purposes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const theme = cookies().get("theme")?.value

  return (
    <ClerkProvider>
      <html lang="en" className={theme}>
        <body className="bg-background dark:bg-darkbg text-text dark:text-darktext transition duration-700 font-sans">
          <Nav />
          <ThemeSwitch theme={theme} />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
