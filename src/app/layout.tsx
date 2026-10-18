import type { Metadata } from "next";
import { Pinyon_Script } from "next/font/google";
import CursorGlow from "@/components/CursorGlow";
import ScrollGumball from "@/components/ScrollGumball";
import "./globals.css";

// Copperplate script for the chrome hero line; the rest of the site stays Helvetica.
const script = Pinyon_Script({
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
        {/* Reloading the landing page always starts at the hero so the gum spiral intro
            plays in view. Browsers decide whether to restore scroll from the setting the
            page had when it unloaded, so the landing page turns restoration off as it
            unloads (client-side navigation never unloads, so in-site back still works).
            On the reload itself, any #section is dropped and restoration comes back at the
            first interaction. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{addEventListener("pagehide",function(){if(location.pathname==="/")history.scrollRestoration="manual"});var n=performance.getEntriesByType("navigation")[0];if(location.pathname!=="/"||!n||n.type!=="reload")return;if(location.hash)history.replaceState(null,"","/"+location.search);var a=function(){history.scrollRestoration="auto"};["wheel","touchstart","keydown","pointerdown"].forEach(function(e){addEventListener(e,a,{once:true,passive:true})})}catch(e){}})()`,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {/* Chrome lettering (hero slogan and large titles): each stroke becomes a
            rounded tube (blurred alpha as a height map), lit with soft shading
            and sharp specular highlights over the reflection gradient. */}
        <svg className="visuallyHidden" aria-hidden="true" focusable="false">
          <filter id="chromeLettering" x="-5%" y="-10%" width="110%" height="120%" colorInterpolationFilters="sRGB">
            <feMorphology in="SourceGraphic" operator="dilate" radius="0.7" result="body" />
            <feGaussianBlur in="body" stdDeviation="1.15" result="height" />
            <feDiffuseLighting in="height" surfaceScale="4" diffuseConstant="1.3" lightingColor="#ffffff" result="shade">
              <feDistantLight azimuth="235" elevation="50" />
            </feDiffuseLighting>
            <feSpecularLighting in="height" surfaceScale="5" specularConstant="2.2" specularExponent="60" lightingColor="#ffffff" result="shine">
              <feDistantLight azimuth="225" elevation="52" />
            </feSpecularLighting>
            <feSpecularLighting in="height" surfaceScale="5" specularConstant="1.2" specularExponent="80" lightingColor="#ffffff" result="rim">
              <feDistantLight azimuth="45" elevation="38" />
            </feSpecularLighting>
            <feComposite in="body" in2="shade" operator="arithmetic" k1="1.25" k2="0.18" k3="0" k4="-0.04" result="lit" />
            <feComposite in="lit" in2="shine" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="glossy" />
            <feComposite in="glossy" in2="rim" operator="arithmetic" k1="0" k2="1" k3="0.8" k4="0" result="chrome" />
            <feComposite in="chrome" in2="body" operator="in" />
          </filter>
        </svg>
        {children}
        <ScrollGumball />
        <CursorGlow />
      </body>
    </html>
  );
}
