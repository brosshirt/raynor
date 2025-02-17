import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";



export const metadata: Metadata = {
  title: "CommsBot Public Affairs Tool",
  description: "Suite of Public Affairs tools",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme='corporate'>
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Navbar/>
        {children}
        </body>
    </html>
  );
}
