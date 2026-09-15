import Image from "next/image";
import Link from "next/link";

import {
  filmProjects,
  portfolioCategories,
  portfolioProjects,
} from "@/data/portfolio";

const designProjects = [
  {
    title: "FOMI 2025",
    category: "Festival identity",
    image: "/portfolio/web/fomi-poster.png",
    summary:
      "A vivid campaign system spanning posters, social assets, certificates, ticketing, and launch graphics.",
    tags: ["Identity", "Campaign", "Print"],
    tone: "cobalt",
  },
  {
    title: "MeSnap",
    category: "Experience visuals",
    image: "/portfolio/web/mesnap-0504.jpg",
    summary:
      "Product imagery and visual direction for an interactive photo experience built around energy and shared moments.",
    tags: ["Photography", "Product", "Social"],
    tone: "acid",
  },
  {
    title: "Burju Cafe",
    category: "Brand system",
    image: "/portfolio/web/burju-banner.png",
    summary:
      "A warm hospitality identity with a flexible logo, profile system, colour palette, and digital campaign assets.",
    tags: ["Brand", "Hospitality", "Logo"],
    tone: "coral",
  },
  {
    title: "BeGummy",
    category: "Logo design",
    image: "/portfolio/web/begummy-logo-black.png",
    summary:
      "A clean, playful mark designed to move easily across web, packaging, and social surfaces.",
    tags: ["Logo", "Consumer", "System"],
    tone: "white",
    contain: true,
  },
];

const capabilities = [
  "Art direction",
  "Brand identity",
  "Videography",
  "Photography",
  "Editing",
  "3D design",
];

const experience = [
  {
    company: "TikTok Shop",
    role: "Videographer & Editor Intern",
    period: "Jun — Sep 2026",
    href: "https://www.tiktok.com/@tiktokshop_uk",
  },
  {
    company: "HeySalad",
    role: "Creative Director",
    period: "May 2026 — Present",
    href: "https://heysalad.ee/",
  },
  {
    company: "ELO Humanoid",
    role: "Branding Executive",
    period: "Jan 2026 — Present",
    href: "https://elo.inc/",
  },
  {
    company: "The New Black Film Collective",
    role: "Social Media & Marketing",
    period: "Jan 2026 — Present",
    href: "https://www.tnbfc.co.uk/",
  },
  {
    company: "British Film Institute",
    role: "Film Festival Marketing",
    period: "Apr — May 2025",
    href: "https://www.bfi.org.uk/",
  },
  {
    company: "Pinewood Studios",
    role: "Camera Specialist Experience",
    period: "Aug 2023",
    href: "https://pinewoodgroup.com/pinewood-studios/",
  },
];

export default function Home() {
  return (
    <main>
      <header className="siteHeader">
        <a href="#top" className="wordmark" aria-label="Begum, back to top">
          BEGUM
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#film">Film</a>
          <a href="#social-content">Social</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="availability" href="mailto:begumgeveci@gmail.com">
          <span aria-hidden="true" />
          Available for projects
        </a>
      </header>

      <section className="hero" id="top">
        <Image
          src="/portfolio/web/about-portrait.jpg"
          alt="Begum, visual designer and film creative"
          fill
          priority
          sizes="100vw"
          className="heroImage"
        />
        <div className="heroWash" aria-hidden="true" />
        <div className="heroContent">
          <p className="heroEyebrow">Visual designer / Film creative</p>
          <h1>Begum</h1>
          <div className="heroFooter">
            <p>
              Building expressive identities, campaign worlds, and image-led
              stories across culture and moving image.
            </p>
            <a href="#work">Explore selected work</a>
          </div>
        </div>
        <p className="heroLocation">London / Istanbul</p>
      </section>

      <section className="introSection" id="about">
        <p className="sectionLabel">01 / About & practice</p>
        <div className="introCopy">
          <h2>Visual systems with cinematic instinct.</h2>
          <p>
            I&apos;m a UCL Film and Game Design graduate with First Class
            Honours, working where graphic design, photography, film, and
            gamification meet. My ambition is to shape memorable visual worlds
            as an art director.
          </p>
        </div>
        <div className="profileFacts" aria-label="Profile highlights">
          <p><span>Education</span>University College London</p>
          <p><span>Degree</span>BA Film & Game Design, First Class</p>
          <p><span>Based</span>London / Istanbul</p>
        </div>
        <div className="capabilityRail" aria-label="Creative capabilities">
          {capabilities.map((capability) => (
            <span key={capability}>{capability}</span>
          ))}
        </div>
      </section>

      <section className="workSection" id="work">
        <div className="sectionTitle">
          <p className="sectionLabel">02 / Selected work</p>
          <h2>Projects with a point of view.</h2>
          <p>Identity / Campaign / Image-making</p>
        </div>

        <div className="projectGrid">
          {designProjects.map((project, index) => (
            <article
              className={`project project${index + 1} ${project.tone}`}
              key={project.title}
            >
              <div className="projectMedia">
                <Image
                  src={project.image}
                  alt={`${project.title} — ${project.category}`}
                  fill
                  sizes={
                    index === 0
                      ? "(max-width: 760px) 100vw, 66vw"
                      : "(max-width: 760px) 100vw, 50vw"
                  }
                  className={project.contain ? "contain" : undefined}
                />
                <span className="projectNumber">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="projectInfo">
                <div>
                  <p>{project.category}</p>
                  <h3>{project.title}</h3>
                </div>
                <p className="projectSummary">{project.summary}</p>
                <div className="projectTags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="featureSection">
        <div className="featureStatement">
          <p className="sectionLabel">A closer look</p>
          <h2>Every touchpoint belongs to the same story.</h2>
        </div>
        <figure className="featureTall">
          <Image
            src="/portfolio/web/fomi-ticket.png"
            alt="FOMI campaign ticket design"
            fill
            sizes="(max-width: 760px) 100vw, 36vw"
          />
          <figcaption>FOMI / Campaign detail</figcaption>
        </figure>
        <figure className="featureWide">
          <Image
            src="/portfolio/web/mesnap-0506.jpg"
            alt="MeSnap product photograph"
            fill
            sizes="(max-width: 760px) 100vw, 54vw"
          />
          <figcaption>MeSnap / Product moment</figcaption>
        </figure>
      </section>

      <section className="portfolioArchive" id="portfolio">
        <div className="archiveIntro">
          <p className="sectionLabel">03 / Full portfolio</p>
          <h2>Explore the wider practice.</h2>
          <p>
            Graphic design, interactive worlds, photography, and social
            storytelling. Open any project for the complete story and gallery.
          </p>
        </div>

        {portfolioCategories.map((category) => {
          const projects = portfolioProjects.filter(
            (project) => project.category === category,
          );

          return (
            <div
              className="archiveGroup"
              id={category === "Social Content" ? "social-content" : undefined}
              key={category}
            >
              <div className="archiveGroupTitle">
                <h3>{category}</h3>
                <span>{String(projects.length).padStart(2, "0")} projects</span>
              </div>
              <div className="archiveGrid">
                {projects.map((project) => (
                  <Link
                    href={`/projects/${project.slug}`}
                    className="archiveCard"
                    key={project.slug}
                  >
                    <div className="archiveMedia">
                      <Image
                        src={project.cover}
                        alt={`${project.title} project cover`}
                        fill
                        sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                      />
                      <div className="archiveHover">
                        <p>{project.summary}</p>
                        <span>View project ↗</span>
                      </div>
                    </div>
                    <div className="archiveCardInfo">
                      <h4>{project.title}</h4>
                      <span>{project.year}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <section className="filmSection" id="film">
        <div className="sectionTitle filmTitle">
          <p className="sectionLabel">04 / Film</p>
          <h2>Stories revealed frame by frame.</h2>
        </div>
        <div className="filmGrid">
          {filmProjects.map((project, index) => (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="filmCard"
              key={project.title}
            >
              <div className="filmMedia">
                <Image
                  src={project.image}
                  alt={`${project.title} — ${project.role}`}
                  fill
                  sizes="(max-width: 760px) 100vw, 33vw"
                />
                <div className="filmReveal">
                  <p>{project.description}</p>
                  <span>Watch project ↗</span>
                </div>
              </div>
              <div className="filmInfo">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p>{project.role}</p>
                  <h3>{project.title}</h3>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="experienceSection" id="experience">
        <div className="experienceIntro">
          <p className="sectionLabel">05 / Selected experience</p>
          <h2>Building ideas inside ambitious creative teams.</h2>
        </div>
        <div className="experienceList">
          {experience.map((item, index) => (
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="experienceItem"
              key={item.company}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.company}</h3>
              <p>{item.role}</p>
              <time>{item.period}</time>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="contactSection" id="contact">
        <div className="contactImage">
          <Image
            src="/portfolio/web/contact-begum-tiktok.jpg"
            alt="Begum speaking at a TikTok event"
            fill
            sizes="(max-width: 760px) 100vw, 50vw"
          />
        </div>
        <div className="contactCopy">
          <p className="sectionLabel">06 / Start a conversation</p>
          <h2>Let&apos;s make something worth remembering.</h2>
          <p>
            Available for visual identity, campaigns, photography, and
            film-led creative work.
          </p>
          <a href="mailto:begumgeveci@gmail.com">begumgeveci@gmail.com</a>
        </div>
      </section>

      <footer>
        <a href="#top">Begum</a>
        <nav className="footerSocials" aria-label="Social links">
          <a href="https://www.linkedin.com/in/begum-geveci" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://www.youtube.com/@begummy.creative" target="_blank" rel="noreferrer">YouTube</a>
          <a href="https://www.instagram.com/be.gummy.creative/" target="_blank" rel="noreferrer">Instagram</a>
        </nav>
        <p>© 2026</p>
      </footer>
    </main>
  );
}
