import "./globals.css";

export const metadata = {
  title: "By Marinea",
  description: "Diagnostic colorimétrie",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif", background: "#faf7f2" }}>
        {children}
      </body>
    </html>
  );
}