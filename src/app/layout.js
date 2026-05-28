import "./globals.css";

export const metadata = {
  title: "Sunil Sapkota — Portfolio",
  description: "Sunil Sapkota — game engines, tools, web-apps. Portfolio with interactive fluid background and playable mini-games.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/sunxsapk.svg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
