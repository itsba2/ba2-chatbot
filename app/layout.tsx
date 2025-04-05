import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "../lib/providers/StoreProvider";
import ThemeProvider from "@/lib/providers/ThemeProvider";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "ba2 Chatbot",
    description: "ba2's local AI assistant",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased`}>
                <StoreProvider>{children}</StoreProvider>
            </body>
        </html>
    );
}
