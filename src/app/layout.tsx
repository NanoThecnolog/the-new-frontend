import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.scss";
import { ToastContainer } from "react-toastify";
import { NewProvider } from "@/contexts/newContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The News - NewsLetter",
  description: "Plataforma do Leitor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NewProvider>
          {children}
          <ToastContainer
            autoClose={3000}
            position="top-center"
          />
        </NewProvider>
      </body>
    </html>
  );
}
