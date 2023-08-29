import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "IP Address Tracker",
  description: "Front-End Mentor IP Address Tracker Challenge",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-lg`}>{children}</body>
    </html>
  );
}
