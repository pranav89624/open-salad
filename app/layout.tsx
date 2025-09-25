import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Open Salad - Simple Chat App",
  description: "A demonstration project showcasing Socket.IO integration with Next.js for real-time communication",
  icons: {
    icon: '/favicon.svg',
  },
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
