import Image from "next/image";
import Link from "next/link";

const workLinks = [
  { label: "SOCIAL", href: "/#social-content" },
  { label: "FILM", href: "/#film" },
  { label: "DESIGN", href: "/#design" },
  { label: "GAME", href: "/#game" },
];

const mainLinks = [
  { label: "ABOUT", href: "/#about" },
  { label: "CONTACT", href: "/#contact" },
];

export default function SiteHeader() {
  return (
    <header className="aurenHeader">
      <Link className="aurenHeaderLogo" href="/#top" aria-label="Begum Geveci home">
        <Image
          src="/portfolio/web/begummy-logo-black.png"
          alt=""
          width={1800}
          height={1661}
          priority
        />
      </Link>

      <nav className="aurenDesktopNav" aria-label="Primary navigation">
        <div className="aurenWorkMenu">
          <Link href="/#work">WORK</Link>
          <div className="aurenWorkDropdown" aria-label="Work categories">
            {workLinks.map((link) => (
              <Link href={link.href} key={link.label}>{link.label}</Link>
            ))}
          </div>
        </div>
        {mainLinks.map((link) => (
          <Link href={link.href} key={link.label}>{link.label}</Link>
        ))}
      </nav>

      <details className="aurenMobileNav">
        <summary>MENU</summary>
        <nav aria-label="Mobile navigation">
          <Link href="/#work">WORK</Link>
          {workLinks.map((link) => (
            <Link className="mobileSubLink" href={link.href} key={link.label}>
              {link.label}
            </Link>
          ))}
          <Link href="/#about">ABOUT</Link>
          <Link href="/#contact">CONTACT</Link>
        </nav>
      </details>
    </header>
  );
}
