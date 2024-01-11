import "./globals.css";
import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marble Race",
  description: "Simple React Three Fiber Game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={bebas.className}>{children}</body>
    </html>
  );
}
