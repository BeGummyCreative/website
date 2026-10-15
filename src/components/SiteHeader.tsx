"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, type MouseEvent } from "react";

import ThemeToggle from "@/components/ThemeToggle";

const workLinks = [
  { label: "SOCIAL", href: "/#social-content" },
  { label: "FILM", href: "/#film" },
  { label: "DESIGN", href: "/#design" },
  { label: "GAME", href: "/#game" },
  { label: "PHOTOGRAPHY", href: "/#photography" },
];

const mainLinks = [
  { label: "ABOUT", href: "/#about" },
  { label: "CONTACT", href: "/#contact" },
];

export default function SiteHeader() {
  const mobileNavRef = useRef<HTMLDetailsElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const mobileCloseTimer = useRef<number | undefined>(undefined);
  const [workMenuClosed, setWorkMenuClosed] = useState(false);
  const pathname = usePathname();

  // Hash links stay on the same page, so retract the menus ourselves.
  function blurLink() {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  }

  function closeDesktopMenu() {
    setWorkMenuClosed(true);
    blurLink();
  }

  // <details> hides its content instantly, so fade the links out first and
  // only collapse the menu once the fade (600ms, see .isClosing) has finished.
  // The logo is the home button: on the homepage it fades back to the top
  // (a same-page "#top" link does nothing once that hash is already set).
  function goHome(event: MouseEvent<HTMLAnchorElement>) {
    if (mobileNavRef.current) mobileNavRef.current.open = false;
    if (pathname !== "/") return;
    event.preventDefault();
    blurLink();
    history.replaceState(null, "", "/");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    // Fade the page out, jump to the top behind the fade, then fade the landing page in.
    const overlay = fadeRef.current;
    if (!overlay) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    overlay.classList.add("isOn");
    window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
      requestAnimationFrame(() => overlay.classList.remove("isOn"));
    }, 380);
  }

  function closeMobileMenu() {
    const menu = mobileNavRef.current;
    blurLink();
    if (!menu) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      menu.open = false;
      return;
    }
    menu.classList.add("isClosing");
    window.clearTimeout(mobileCloseTimer.current);
    mobileCloseTimer.current = window.setTimeout(() => {
      menu.open = false;
      menu.classList.remove("isClosing");
    }, 600);
  }

  return (
    <>
      {/* Kept outside the header: its backdrop-filter would confine a fixed child to the header. */}
      <div className="pageFade" ref={fadeRef} aria-hidden="true" />
      <header className="aurenHeader">
        <Link className="aurenHeaderLogo" href="/" onClick={goHome} aria-label="Begüm Geveci home">
          <Image
            src="/portfolio/web/begummy-logo-white.png"
            alt=""
            width={1800}
            height={1661}
            priority
          />
        </Link>

        <nav className="aurenDesktopNav" aria-label="Primary navigation">
          <div
            className={workMenuClosed ? "aurenWorkMenu isClosed" : "aurenWorkMenu"}
            onMouseLeave={() => setWorkMenuClosed(false)}
          >
            <Link href="/#work" onClick={closeDesktopMenu}>WORK</Link>
            <div className="aurenWorkDropdown" aria-label="Work categories">
              {workLinks.map((link) => (
                <Link href={link.href} key={link.label} onClick={closeDesktopMenu}>{link.label}</Link>
              ))}
            </div>
          </div>
          {mainLinks.map((link) => (
            <Link href={link.href} key={link.label} onClick={closeDesktopMenu}>{link.label}</Link>
          ))}
        </nav>

        <ThemeToggle />

        <details className="aurenMobileNav" ref={mobileNavRef}>
          <summary>MENU</summary>
          <nav aria-label="Mobile navigation">
            <Link href="/#work" onClick={closeMobileMenu}>WORK</Link>
            {workLinks.map((link) => (
              <Link className="mobileSubLink" href={link.href} key={link.label} onClick={closeMobileMenu}>
                {link.label}
              </Link>
            ))}
            <Link href="/#about" onClick={closeMobileMenu}>ABOUT</Link>
            <Link href="/#contact" onClick={closeMobileMenu}>CONTACT</Link>
          </nav>
        </details>
      </header>
    </>
  );
}
