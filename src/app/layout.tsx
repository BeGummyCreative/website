import type { Metadata } from "next";
import { Pacifico } from "next/font/google";
import "./globals.css";

// Script face for the chrome hero line; the rest of the site stays Helvetica.
const script = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "Begüm | Visual Design & Film Portfolio",
  description:
    "Portfolio for Begüm, spanning visual identity, campaign design, film stills, and behind-the-scenes photography.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${script.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Apply the visitor's saved theme before first paint to avoid a flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
