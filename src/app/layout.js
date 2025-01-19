import "./globals.css";

export const metadata = {
  title: "sunxsapk portfolio",
  description: "Portfolio of sunxsapk",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/images/sunxsapk.svg" />
      <body >{children}</body>
    </html>
  );
}
