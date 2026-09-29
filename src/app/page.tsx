import Image from "next/image";
import Link from "next/link";

import { filmProjects, portfolioProjects } from "@/data/portfolio";

const capabilities = [
  "Art direction",
  "Brand identity",
  "Videography",
  "Photography",
  "Editing",
  "3D design",
];

const services = [
  {
    title: "Design",
    items: ["Brand identities", "Campaign systems", "Graphic design", "Art direction"],
  },
  {
    title: "Moving image",
    items: ["Film production", "Videography", "Editing", "Social content"],
  },
  {
    title: "Interactive",
    items: ["Game design", "Worldbuilding", "VR experiences", "3D design"],
  },
];

const experience = [
  {
    company: "TikTok Shop",
    role: "Videographer & Editor Intern",
    period: "Jun - Sep 2026",
    href: "https://www.tiktok.com/@tiktokshop_uk",
  },
  {
    company: "HeySalad",
    role: "Creative Director",
    period: "May 2026 - Present",
    href: "https://heysalad.ee/",
  },
  {
    company: "ELO Humanoid",
    role: "Branding Executive",
    period: "Jan 2026 - Present",
    href: "https://elo.inc/",
  },
  {
    company: "The New Black Film Collective",
    role: "Social Media & Marketing",
    period: "Jan 2026 - Present",
    href: "https://www.tnbfc.co.uk/",
  },
  {
    company: "British Film Institute",
    role: "Film Festival Marketing",
    period: "Apr - May 2025",
    href: "https://www.bfi.org.uk/",
  },
  {
    company: "Pinewood Studios",
    role: "Camera Specialist Experience",
    period: "Aug 2023",
    href: "https://pinewoodgroup.com/pinewood-studios/",
  },
];

type WorkItem = {
  title: string;
  category: string;
  image: string;
  summary: string;
  href: string;
  external: boolean;
};

const portfolioWork: WorkItem[] = portfolioProjects.map((project) => ({
  title: project.title,
  category: project.category,
  image: project.cover,
  summary: project.summary,
  href: `/projects/${project.slug}`,
  external: false,
}));

const filmWork: WorkItem[] = filmProjects.map((project) => ({
  title: project.title,
  category: "Film",
  image: project.image,
  summary: project.description,
  href: project.href,
  external: true,
}));

const workItems = portfolioWork.flatMap((project, index) =>
  filmWork[index] ? [project, filmWork[index]] : [project],
);

const indexedWork = workItems.map((item, index) => ({ item, index }));
const workColumns = [
  indexedWork.filter(({ index }) => index % 2 === 0),
  indexedWork.filter(({ index }) => index % 2 === 1),
];

function categoryAnchor(category: string) {
  if (category === "Social Content") return "social-content";
  if (category === "Graphic Design") return "design";
  if (category === "Game Design") return "game";
  if (category === "Film") return "film";
  return undefined;
}

function WorkCard({ item, index }: { item: WorkItem; index: number }) {
  const anchor = categoryAnchor(item.category);
  const isFirstInCategory =
    workItems.findIndex((candidate) => candidate.category === item.category) === index;
  const content = (
    <>
      <Image
        src={item.image}
        alt={`${item.title} - ${item.category}`}
        fill
        priority={index < 2}
        sizes="(max-width: 700px) 100vw, (max-width: 1100px) 66vw, 34vw"
      />
      <span className="workShade" aria-hidden="true" />
      <span className="workCardLabel">
        <strong>{item.title}</strong>
        <span>{item.category}</span>
      </span>
      <span className="workCardSummary">{item.summary}</span>
    </>
  );

  const className = `workCard workCardShape${index % 6}`;
  const id = isFirstInCategory ? anchor : undefined;

  return item.external ? (
    <a
      className={className}
      href={item.href}
      id={id}
      target="_blank"
      rel="noreferrer"
    >
      {content}
    </a>
  ) : (
    <Link className={className} href={item.href} id={id}>
      {content}
    </Link>
  );
}

export default function Home() {
  return (
    <main className="portfolioShell" id="top">
      <section className="profilePanel" aria-label="About Begum">
        <div className="profileInner">
          <div className="profileIntro">
            <div className="identityRow">
              <div className="identity">
                <Image
                  src="/portfolio/web/about-profile.jpg"
                  alt="Begum Geveci"
                  width={112}
                  height={112}
                  priority
                />
                <div>
                  <h1>Begum Geveci</h1>
                  <p>Visual designer / Film creative</p>
                </div>
              </div>
              <a className="panelLogo" href="#top" aria-label="Back to top">
                <Image
                  src="/portfolio/web/begummy-nav-logo.png"
                  alt=""
                  width={520}
                  height={480}
                  priority
                />
              </a>
            </div>

            <nav className="panelNav" aria-label="Primary navigation">
              <div className="panelWorkMenu">
                <a href="#work">Work</a>
                <div className="panelWorkDropdown" aria-label="Work categories">
                  <a href="#social-content">Social</a>
                  <a href="#film">Film</a>
                  <a href="#design">Design</a>
                  <a href="#game">Game</a>
                </div>
              </div>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </nav>

            <p className="profileStatement">
              I build expressive identities, campaign worlds, and image-led
              stories across culture and moving image.
            </p>
            <p className="statusLine">
              <span aria-hidden="true" /> Available for work in London.
            </p>
            <a className="lightButton" href="mailto:begumgeveci@gmail.com">
              Get in touch
            </a>
          </div>

          <div className="disciplineRail" aria-label="Creative disciplines">
            <div>
              {[...capabilities, ...capabilities].map((capability, index) => (
                <span key={`${capability}-${index}`}>{capability}</span>
              ))}
            </div>
          </div>

          <section className="profileSection" id="about">
            <h2>About me.</h2>
            <p className="sectionLead">
              I&apos;m a UCL Film and Game Design graduate with First Class
              Honours, working where graphic design, photography, film, and
              gamification meet. My ambition is to shape memorable visual
              worlds as an art director.
            </p>
            <div className="profileStats">
              <div>
                <strong>1st</strong>
                <span>Class honours</span>
              </div>
              <div>
                <strong>4</strong>
                <span>Creative disciplines</span>
              </div>
              <div>
                <strong>24+</strong>
                <span>Portfolio projects</span>
              </div>
              <div>
                <strong>LDN</strong>
                <span>Based in London</span>
              </div>
            </div>
          </section>

          <section className="profileSection">
            <h2>Services.</h2>
            <div className="serviceList">
              {services.map((service, index) => (
                <article key={service.title}>
                  <span>{index + 1}.</span>
                  <div>
                    <h3>{service.title}</h3>
                    {service.items.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="profileSection">
            <h2>Practice.</h2>
            <div className="practiceGrid">
              {capabilities.map((capability, index) => (
                <div key={capability}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{capability}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="profileSection">
            <h2>Experience.</h2>
            <div className="compactExperience">
              {experience.map((item) => (
                <a href={item.href} target="_blank" rel="noreferrer" key={item.company}>
                  <div>
                    <h3>{item.role}</h3>
                    <p>{item.company}</p>
                  </div>
                  <time>{item.period}</time>
                </a>
              ))}
            </div>
          </section>

          <section className="profileContact" id="contact">
            <a className="backToTop" href="#top" aria-label="Back to top">
              ↑
            </a>
            <h2>Reach out.</h2>
            <p>Let&apos;s make something worth remembering.</p>
            <a className="contactEmail" href="mailto:begumgeveci@gmail.com">
              begumgeveci@gmail.com
            </a>
            <nav aria-label="Social links">
              <a href="https://www.linkedin.com/in/begum-geveci" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://www.instagram.com/be.gummy.creative/" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://www.youtube.com/@begummy.creative" target="_blank" rel="noreferrer">YouTube</a>
            </nav>
            <p className="copyright">© 2026 Begum Geveci</p>
          </section>
        </div>
      </section>

      <section className="workPanel" id="work" aria-label="Portfolio projects">
        <div className="mobileWorkHeading">
          <p>Selected and recent work</p>
          <h2>Portfolio.</h2>
        </div>
        <div className="workColumns">
          {workColumns.map((column, columnIndex) => (
            <div className="workColumn" key={columnIndex}>
              {column.map(({ item, index }) => (
                <WorkCard item={item} index={index} key={`${item.title}-${index}`} />
              ))}
            </div>
          ))}
        </div>
        <footer className="workFooter">
          <div>
            <p>Have a project in mind?</p>
            <h2>Let&apos;s work together.</h2>
          </div>
          <a className="lightButton" href="mailto:begumgeveci@gmail.com">
            Start a project
          </a>
          <a className="backToTop" href="#work" aria-label="Back to portfolio top">
            ↑
          </a>
        </footer>
      </section>
    </main>
  );
}
