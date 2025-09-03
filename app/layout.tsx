import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Baatein — Real-time Chat",
  description: "Where conversations flow naturally. A modern real-time chat application built with Next.js and Socket.IO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
