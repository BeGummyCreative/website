import Image from "next/image";

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

const filmProjects = [
  {
    title: "FOMI 2026",
    role: "Event photography",
    image: "/portfolio/web/film-fomi-3839.jpg",
  },
  {
    title: "HENRY",
    role: "Music video / behind the scenes",
    image: "/portfolio/web/henry-1938.jpg",
  },
  {
    title: "Wishbone Fever",
    role: "Film / BTS photography",
    image: "/portfolio/web/wishbone-bts-6646.jpg",
  },
];

const capabilities = [
  "Brand identity",
  "Campaign design",
  "Film stills",
  "BTS photography",
  "Social assets",
  "Event visuals",
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
          <a href="#film">Film</a>
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

      <section className="introSection">
        <p className="sectionLabel">01 / Practice</p>
        <div className="introCopy">
          <h2>Visual systems with cinematic instinct.</h2>
          <p>
            I work where graphic design, photography, and film meet — creating
            identities with clarity, campaigns with energy, and images that
            hold attention.
          </p>
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

      <section className="filmSection" id="film">
        <div className="sectionTitle filmTitle">
          <p className="sectionLabel">03 / Film & photography</p>
          <h2>Frames that carry the atmosphere.</h2>
        </div>
        <div className="filmGrid">
          {filmProjects.map((project, index) => (
            <article key={project.title}>
              <div className="filmMedia">
                <Image
                  src={project.image}
                  alt={`${project.title} — ${project.role}`}
                  fill
                  sizes="(max-width: 760px) 100vw, 33vw"
                />
              </div>
              <div className="filmInfo">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p>{project.role}</p>
                  <h3>{project.title}</h3>
                </div>
              </div>
            </article>
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
          <p className="sectionLabel">04 / Start a conversation</p>
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
        <p>Visual design / Film / Photography</p>
        <p>© 2026</p>
      </footer>
    </main>
  );
}
