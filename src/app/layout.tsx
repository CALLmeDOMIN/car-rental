import "./globals.css";
import { Inter } from "next/font/google";
import Nav from "../../components/nav";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Car rental",
    description: "Car rental website, private project for learning purposes.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className + " bg-background font-sans"}>
                    <Nav />
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
