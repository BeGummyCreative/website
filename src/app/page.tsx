import Image from "next/image";
import Link from "next/link";

import ContactSection from "@/components/ContactSection";
import GumHero from "@/components/GumHero";
import SiteHeader from "@/components/SiteHeader";
import { imageOrientation } from "@/lib/imageOrientation";
import {
  filmProjects,
  portfolioCategories,
  portfolioProjects,
  type PortfolioCategory,
} from "@/data/portfolio";

const featuredSlugs = [
  "tiktok-shop-internship",
  "london-fashion-week",
  "latrinalia",
  "into-wonderland",
];

const featuredProjects = featuredSlugs.flatMap((slug) => {
  const project = portfolioProjects.find((item) => item.slug === slug);
  return project ? [project] : [];
});

type ExperienceRole = {
  company: string;
  role: string;
  period: string;
  logo?: string;
  href?: string;
};

// Newest first by start date. Logos and links are the ones from the Wix "Work Experience" grid.
const experience: ExperienceRole[] = [
  {
    company: "TikTok Shop",
    role: "Videographer & Editor Intern",
    period: "Jun - Sep 2026",
    logo: "/portfolio/web/logos/tiktok-shop.png",
    href: "https://www.tiktok.com/@tiktokshop_uk",
  },
  {
    company: "HeySalad",
    role: "Creative Director",
    period: "May 2026 - Present",
    logo: "/portfolio/web/logos/heysalad.png",
    href: "https://heysalad.ai/",
  },
  {
    company: "ELO Humanoid",
    role: "Branding Executive",
    period: "Jan 2026 - Present",
    logo: "/portfolio/web/logos/elo.png",
    href: "https://elo.inc/",
  },
  {
    company: "The New Black Film Collective",
    role: "Social Media & Marketing",
    period: "Jan 2026 - Present",
    logo: "/portfolio/web/logos/tnbfc.png",
    href: "https://www.tnbfc.co.uk/",
  },
  {
    company: "Swift Food",
    role: "Freelance Videographer & Editor",
    period: "Nov 2025 - Jan 2026",
    logo: "/portfolio/web/logos/swift-food.png",
    href: "https://swiftfood.uk/",
  },
  {
    company: "UCL East Society",
    role: "Graphic Designer & Branding Manager",
    period: "Sep 2025 - Jun 2026",
    logo: "/portfolio/web/logos/ucl-east-society.png",
    href: "https://studentsunionucl.org/clubs-societies/ucl-east-society",
  },
  {
    company: "MeSnap",
    role: "Freelance Graphic Designer",
    period: "Jul 2025",
    logo: "/portfolio/web/logos/mesnap.png",
    href: "https://mesnap.app/",
  },
  {
    company: "Burju Cafe",
    role: "Graphic Designer & Branding Manager",
    period: "Jun 2025",
    logo: "/portfolio/web/logos/burju-cafe.png",
    href: "https://www.instagram.com/burju_cafe/",
  },
  {
    company: "British Film Institute",
    role: "Film Festival Marketing",
    period: "Apr - May 2025",
    logo: "/portfolio/web/logos/bfi.png",
    href: "https://www.bfi.org.uk/",
  },
  {
    company: "Effect Burson",
    role: "Marketing & PR Intern",
    period: "Jun - Jul 2024",
    logo: "/portfolio/web/logos/effect-burson.jpg",
    href: "https://www.bursonglobal.com/locations/turkey",
  },
  {
    company: "Pinewood Studios",
    role: "Camera Specialist Experience",
    period: "Aug 2023",
    logo: "/portfolio/web/logos/pinewood.jpg",
    href: "https://pinewoodgroup.com/pinewood-studios/",
  },
  {
    company: "Merlin Entertainments",
    role: "Creative Team Member",
    period: "Jun 2022",
    logo: "/portfolio/web/logos/merlin.png",
    href: "https://www.merlinentertainments.biz/",
  },
];

const categoryIds: Record<PortfolioCategory, string> = {
  "Graphic Design": "design",
  "Game Design": "game",
  Photography: "photography",
  "Social Content": "social-content",
};

export default function Home() {
  return (
    <main className="aurenSite" id="top">
      <SiteHeader />

      <section className="aurenHero" aria-labelledby="hero-title">
        <div className="aurenHeroStage">
          <GumHero />

          <div className="heroMark">
            <Image
              src="/portfolio/web/begummy-logo-white.png"
              alt="BeGummy Creative"
              width={1800}
              height={1661}
              priority
            />
          </div>

          <p className="heroQuote">Ideas you can<br />chew on</p>

          <h1 className="visuallyHidden" id="hero-title">
            Begüm Geveci, multidisciplinary creative
          </h1>

          <p className="heroCaption heroCaptionLeft">BEGÜM GEVECI<br />MULTIDISCIPLINARY CREATIVE</p>
          <p className="heroCaption heroCaptionRight">LONDON<br />2026</p>
        </div>
      </section>

      <section className="imageInterlude" id="about" aria-labelledby="about-title">
        <div className="interludeStage">
          <div className="interludeMedia">
            <Image
              src="/portfolio/web/contact-begum-tiktok.jpg"
              alt="Begüm Geveci speaking at a creative event"
              fill
              sizes="100vw"
            />
          </div>
          <p>FILM / DESIGN / IMAGE / PLAY</p>
          <div className="interludeBlurb">
            <div className="sectionKicker inverse">
              <span>01</span>
              <p id="about-title">WHO IS BEGUMMY?</p>
            </div>
            <p className="interludeCopy">
              I&apos;m Begüm, a London-based multidisciplinary creative and UCL Film
              and Game Design graduate. I shape playful visual worlds across art
              direction, brand identity, photography, film, social content, and
              game design.
            </p>
            <a className="textArrow" href="#contact">
              START A CONVERSATION <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="featuredWork" id="work" aria-labelledby="featured-title">
        <header className="featuredIntro">
          <span>02</span>
          <h2 className="chromeScript" id="featured-title">Selected Work</h2>
          <p>A highlight of my favourite projects</p>
        </header>

        {featuredProjects.map((project, index) => (
          <article className="featureSlide" key={project.slug}>
            <Image
              className="featureBackdrop"
              src={project.cover}
              alt=""
              fill
              sizes="100vw"
            />
            <div className="featureScrim" aria-hidden="true" />
            <Link className="featureCard" href={`/projects/${project.slug}`}>
              <Image
                className={project.featureFocus ? "featureCover" : undefined}
                src={project.cover}
                alt={`${project.title} project`}
                fill
                sizes="(max-width: 760px) 78vw, 34vw"
                style={project.featureFocus ? { objectPosition: project.featureFocus } : undefined}
              />
              <span className="featureCardShade" aria-hidden="true" />
              <span className="featureIndex">0{index + 1}</span>
              <span className="featureWords">
                <small>{project.category}</small>
                <strong>{project.title}</strong>
                <em>VIEW PROJECT ↗</em>
              </span>
            </Link>
          </article>
        ))}
      </section>

      <section className="workArchive" aria-labelledby="archive-title">
        <header className="archiveHeader">
          <div className="sectionKicker">
            <span>03</span>
            <p>FULL ARCHIVE</p>
          </div>
          <h2 className="chromeScript" id="archive-title">The Work,<br />in Full.</h2>
        </header>

        {portfolioCategories.map((category) => {
          const projects = portfolioProjects.filter((project) => project.category === category);
          return (
            <section className="archiveCategory" id={categoryIds[category]} key={category}>
              <div className="archiveCategoryHeading">
                <h3 className="chromeScript">{category}</h3>
                <span>{String(projects.length).padStart(2, "0")}</span>
              </div>
              <div className="archiveGrid">
                {projects.map((project) => (
                  <Link
                    className={[
                      "archiveCard",
                      // Graphic design covers all share one landscape frame.
                      category === "Graphic Design" ? "landscape" : imageOrientation(project.cover),
                      project.coverStyle === "logo" ? "logoCover" : "",
                      project.coverInvertsInLight ? "invertsInLight" : "",
                    ].join(" ")}
                    href={`/projects/${project.slug}`}
                    key={project.slug}
                  >
                    <span className="archiveImage">
                      <Image
                        className={project.coverLight ? "coverDarkOnly" : undefined}
                        src={project.cover}
                        alt=""
                        fill
                        sizes="(max-width: 760px) 100vw, 33vw"
                        style={project.archiveFocus ? { objectPosition: project.archiveFocus } : undefined}
                      />
                      {project.coverLight ? (
                        <Image className="coverLightOnly" src={project.coverLight} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" />
                      ) : null}
                    </span>
                    <span className="archiveDetails">
                      <strong>{project.title}</strong>
                      <small>{project.year}</small>
                    </span>
                    <span className="archiveSummary">{project.summary}</span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        <section className="archiveCategory" id="film">
          <div className="archiveCategoryHeading">
            <h3 className="chromeScript">Film</h3>
            <span>{String(filmProjects.length).padStart(2, "0")}</span>
          </div>
          <div className="archiveGrid filmGrid">
            {filmProjects.map((project) => (
              // Links can't nest, so a film with extra clips wraps its card link and the clips in a div.
              <div className={`archiveCard ${imageOrientation(project.image)}`} key={project.title}>
                <a className="archiveCardLink" href={project.href} target="_blank" rel="noreferrer">
                  <span className="archiveImage">
                    <Image src={project.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" />
                  </span>
                  <span className="archiveDetails">
                    <strong>{project.title}</strong>
                    <small>{project.role}</small>
                  </span>
                  <span className="archiveSummary">{project.description}</span>
                </a>
                {project.clips?.length ? (
                  <ul className="archiveClips" aria-label={`${project.title} behind the scenes`}>
                    {project.clips.map((clip) => (
                      <li key={clip.href}>
                        <a href={clip.href} target="_blank" rel="noreferrer">
                          <Image src={clip.image} alt="" width={120} height={218} />
                          <span>{clip.label} ↗</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      </section>

      <section className="experienceSection" id="experience">
        <div className="sectionKicker inverse">
          <span>04</span>
          <p>EXPERIENCE</p>
        </div>
        <div className="experienceRows">
          {experience.map(({ company, role, period, logo, href }) => (
            <article key={company}>
              <span className="experienceLogo">
                {logo && href ? (
                  // The logo repeats the company link for pointer users; keyboard users get the name.
                  <a href={href} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true">
                    <Image src={logo} alt="" fill sizes="56px" />
                  </a>
                ) : logo ? (
                  <Image src={logo} alt="" fill sizes="56px" />
                ) : null}
              </span>
              <h3>
                {href ? (
                  <a href={href} target="_blank" rel="noreferrer">
                    {company}
                  </a>
                ) : (
                  company
                )}
              </h3>
              <p>{role}</p>
              <time>{period}</time>
            </article>
          ))}
        </div>
      </section>

      <ContactSection />

      <footer className="aurenFooter">
        <Image src="/portfolio/web/begummy-logo-white.png" alt="BeGummy Creative" width={1800} height={1661} />
        <nav aria-label="Social links">
          <a href="https://www.instagram.com/be.gummy.creative/" target="_blank" rel="noreferrer">INSTAGRAM</a>
          <a href="https://www.linkedin.com/in/begum-geveci" target="_blank" rel="noreferrer">LINKEDIN</a>
          <a href="https://www.youtube.com/@begummy.creative" target="_blank" rel="noreferrer">YOUTUBE</a>
        </nav>
        <p>© 2026 BEGÜM GEVECI / LONDON</p>
      </footer>
    </main>
  );
}
