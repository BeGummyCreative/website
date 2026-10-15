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

const experience = [
  ["TikTok Shop", "Videographer & Editor Intern", "Jun - Sep 2026"],
  ["HeySalad", "Creative Director", "May 2026 - Present"],
  ["ELO Humanoid", "Branding Executive", "Jan 2026 - Present"],
  ["The New Black Film Collective", "Social Media & Marketing", "Jan 2026 - Present"],
  ["British Film Institute", "Film Festival Marketing", "Apr - May 2025"],
  ["Pinewood Studios", "Camera Specialist Experience", "Aug 2023"],
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
          <p>A collection of identities, worlds, images, and stories.</p>
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
                src={project.cover}
                alt={`${project.title} project`}
                fill
                sizes="(max-width: 760px) 78vw, 34vw"
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
          {experience.map(([company, role, period]) => (
            <article key={company}>
              <h3>{company}</h3>
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
