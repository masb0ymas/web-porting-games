import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Montara Games — Collection Library",
  description:
    "Personal game collection library. Browse, filter, and launch your games — inspired by the Steam library experience.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
