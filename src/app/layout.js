import "./globals.css";

export const metadata = {
  title: "Random Quote",
  description: "Quote Generator Api",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
