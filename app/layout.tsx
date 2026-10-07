import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brew Bites | Cafe, Coffee & Fast Food",
  description:
    "Brew Bites is a cozy cafe-style website for coffee, pizza, burgers, wraps and quick bites in Kargil, Ladakh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
