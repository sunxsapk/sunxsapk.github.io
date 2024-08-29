import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "therealsunx portfolio",
  description: "Portfolio of Game&Web developer -therealsunx",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/images/therealsunx.svg" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
