import "./globals.css";

export const metadata = {
  title: "therealsunx portfolio",
  description: "Portfolio of Game&Web developer -therealsunx",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/images/therealsunx.svg" />
      <body >{children}</body>
    </html>
  );
}
