import Image from "next/image";
import Link from "next/link";

import SiteHeader from "@/components/SiteHeader";
import {
  filmProjects,
  portfolioCategories,
  portfolioProjects,
  type PortfolioCategory,
} from "@/data/portfolio";

const featuredSlugs = [
  "cake-sit-rebrand",
  "latrinalia",
  "architecture-photography",
  "tiktok-shop-internship",
  "elo-design-work",
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
          <div className="heroSpiral" aria-hidden="true">
            <div className="spiralFrame spiralFrame1">
              <Image src="/portfolio/wix/graphic/wonderland-cover.jpg" alt="" width={1600} height={931} priority />
            </div>
            <div className="spiralFrame spiralFrame2">
              <Image src="/portfolio/wix/graphic/cake-sit-cover.jpg" alt="" width={1600} height={731} priority />
            </div>
            <div className="spiralFrame spiralFrame3">
              <Image src="/portfolio/wix/photo/architecture-cover.jpg" alt="" width={1600} height={1066} />
            </div>
            <div className="spiralFrame spiralFrame4">
              <Image src="/portfolio/wix/social/tiktok-live-cover.jpg" alt="" width={899} height={1600} />
            </div>
            <div className="spiralFrame spiralFrame5">
              <Image src="/portfolio/wix/photo/fashion-cover.jpg" alt="" width={1600} height={1066} />
            </div>
            <div className="spiralFrame spiralFrame6">
              <Image src="/portfolio/wix/social/oakberry-cover.jpg" alt="" width={1600} height={1066} />
            </div>
            <div className="spiralFrame spiralFrame7">
              <Image src="/portfolio/wix/game/latrinalia-cover.jpg" alt="" width={1600} height={896} priority />
            </div>
            <div className="spiralFrame spiralFrame8">
              <Image src="/portfolio/wix/social/holistic-cover.jpg" alt="" width={1600} height={1283} />
            </div>
            <div className="spiralFrame spiralFrame9">
              <Image src="/portfolio/web/contact-begum-tiktok.jpg" alt="" width={842} height={788} priority />
            </div>
          </div>

          <div className="heroMark">
            <Image
              src="/portfolio/web/begummy-logo-black.png"
              alt="BeGummy Creative"
              width={1800}
              height={1661}
              priority
            />
          </div>

          <h1 className="heroManifesto" id="hero-title">
            Stories with texture.<br />Ideas with a pulse.
          </h1>

          <p className="heroCaption heroCaptionLeft">BEGUM GEVECI<br />MULTIDISCIPLINARY CREATIVE</p>
          <p className="heroCaption heroCaptionRight">LONDON<br />2026</p>
        </div>
      </section>

      <section className="imageInterlude" aria-label="Begum at work">
        <Image
          src="/portfolio/web/contact-begum-tiktok.jpg"
          alt="Begum Geveci speaking at a creative event"
          fill
          sizes="100vw"
        />
        <p>FILM / DESIGN / IMAGE / PLAY</p>
      </section>

      <section className="aboutEditorial" id="about">
        <div className="sectionKicker">
          <span>01</span>
          <p>ABOUT THE STUDIO</p>
        </div>
        <div className="aboutCopy">
          <h2>
            I shape playful visual worlds across design, moving image, and
            interactive experiences.
          </h2>
          <p>
            I&apos;m Begum, a London-based multidisciplinary creative and UCL Film
            and Game Design graduate. My practice moves between art direction,
            brand identity, photography, film, social content, and game design.
          </p>
          <a className="textArrow" href="mailto:begumgeveci@gmail.com">
            START A CONVERSATION <span aria-hidden="true">↗</span>
          </a>
        </div>
        <figure className="aboutPortrait">
          <Image
            src="/portfolio/web/about-portrait.jpg"
            alt="Portrait of Begum Geveci"
            fill
            sizes="(max-width: 760px) 100vw, 42vw"
          />
          <figcaption>BEGUM GEVECI / CREATIVE DIRECTOR</figcaption>
        </figure>
      </section>

      <section className="statementBand" aria-label="Creative approach">
        <p>STRATEGY IN THE DETAILS.</p>
        <h2>MADE TO BE<br />FELT, NOT JUST SEEN.</h2>
      </section>

      <section className="featuredWork" id="work" aria-labelledby="featured-title">
        <header className="featuredIntro">
          <span>02</span>
          <h2 id="featured-title">SELECTED WORK</h2>
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
          <h2 id="archive-title">THE WORK,<br />IN FULL.</h2>
        </header>

        {portfolioCategories.map((category) => {
          const projects = portfolioProjects.filter((project) => project.category === category);
          return (
            <section className="archiveCategory" id={categoryIds[category]} key={category}>
              <div className="archiveCategoryHeading">
                <h3>{category}</h3>
                <span>{String(projects.length).padStart(2, "0")}</span>
              </div>
              <div className="archiveGrid">
                {projects.map((project, index) => (
                  <Link className={`archiveCard archiveCard${index % 3}`} href={`/projects/${project.slug}`} key={project.slug}>
                    <span className="archiveImage">
                      <Image src={project.cover} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" />
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
            <h3>Film</h3>
            <span>{String(filmProjects.length).padStart(2, "0")}</span>
          </div>
          <div className="archiveGrid filmGrid">
            {filmProjects.map((project, index) => (
              <a className={`archiveCard archiveCard${index % 3}`} href={project.href} target="_blank" rel="noreferrer" key={project.title}>
                <span className="archiveImage">
                  <Image src={project.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" />
                </span>
                <span className="archiveDetails">
                  <strong>{project.title}</strong>
                  <small>{project.role}</small>
                </span>
                <span className="archiveSummary">{project.description}</span>
              </a>
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

      <section className="contactSection" id="contact">
        <p>HAVE A STORY IN MIND?</p>
        <h2>LET&apos;S MAKE<br />IT MEMORABLE.</h2>
        <a href="mailto:begumgeveci@gmail.com">begumgeveci@gmail.com <span aria-hidden="true">↗</span></a>
        <div className="contactPortrait">
          <Image src="/portfolio/web/contact-begum-tiktok.jpg" alt="Begum Geveci" fill sizes="(max-width: 760px) 56vw, 22vw" />
        </div>
      </section>

      <footer className="aurenFooter">
        <Image src="/portfolio/web/begummy-logo-white.png" alt="BeGummy Creative" width={1800} height={1661} />
        <nav aria-label="Social links">
          <a href="https://www.instagram.com/be.gummy.creative/" target="_blank" rel="noreferrer">INSTAGRAM</a>
          <a href="https://www.linkedin.com/in/begum-geveci" target="_blank" rel="noreferrer">LINKEDIN</a>
          <a href="https://www.youtube.com/@begummy.creative" target="_blank" rel="noreferrer">YOUTUBE</a>
        </nav>
        <p>© 2026 BEGUM GEVECI / LONDON</p>
      </footer>
    </main>
  );
}
