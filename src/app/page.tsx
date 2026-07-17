import Image from "next/image";

const designProjects = [
  {
    title: "FOMI 2025",
    category: "Festival identity",
    image: "/portfolio/web/fomi-poster.png",
    summary:
      "Campaign posters, social materials, certificate design, ticketing artwork, and launch graphics for Festival of the Moving Image.",
    tags: ["Identity", "Campaign", "Print"],
  },
  {
    title: "MeSnap",
    category: "Experience visuals",
    image: "/portfolio/web/mesnap-0504.jpg",
    summary:
      "Product stills and visual direction for an interactive photo experience, with a strong focus on energy and shareable moments.",
    tags: ["Photography", "Product", "Social"],
  },
  {
    title: "Burju Cafe",
    category: "Brand system",
    image: "/portfolio/web/burju-banner.png",
    summary:
      "Cafe identity materials spanning logo usage, profile assets, colour palette, and polished transparent banner treatments.",
    tags: ["Brand", "Hospitality", "Logo"],
  },
  {
    title: "BeGummy",
    category: "Logo design",
    image: "/portfolio/web/begummy-logo-black.png",
    summary:
      "A clean, playful mark prepared in black and white variants for flexible use across web, packaging, and social surfaces.",
    tags: ["Logo", "Consumer", "System"],
  },
];

const filmProjects = [
  {
    title: "FOMI 2026",
    role: "Event photography",
    image: "/portfolio/web/film-fomi-3839.jpg",
  },
  {
    title: "HENRY Music Video",
    role: "Behind the scenes",
    image: "/portfolio/web/henry-1938.jpg",
  },
  {
    title: "Wishbone Fever",
    role: "BTS photography",
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
        <a href="#" className="brandMark" aria-label="Begum home">
          <span aria-hidden="true" />
          <strong>Begum</strong>
        </a>
        <nav className="nav" aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#film">Film</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero">
        <Image
          src="/portfolio/web/about-portrait.jpg"
          alt="Begum portrait"
          width={1400}
          height={1800}
          priority
          sizes="100vw"
          className="heroImage"
        />
        <div className="heroRule" aria-hidden="true" />
        <div className="heroContent">
          <p className="eyebrow">Visual identity / campaign / film</p>
          <h1>Image-led design for culture, brands, and moving stories.</h1>
          <p className="heroCopy">
            Visual designer and film creative building identities, campaign
            systems, and image-led stories across brand, culture, and moving
            image.
          </p>
          <div className="heroActions">
            <a href="#work">View selected work</a>
            <a href="#contact">Start a project</a>
          </div>
        </div>
      </section>

      <section className="introBand">
        <div>
          <p className="sectionKicker">Practice</p>
          <h2>Design systems with cinematic instincts and a precise visual hand.</h2>
        </div>
        <div className="capabilityGrid">
          {capabilities.map((capability) => (
            <span key={capability}>{capability}</span>
          ))}
        </div>
      </section>

      <section className="splitFeature">
        <div className="featureText">
          <p className="sectionKicker">Current signal</p>
          <h2>Festival worlds, product moments, and brand marks with memory.</h2>
          <p>
            The downloaded portfolio material points to a body of work that
            combines graphic design, event storytelling, brand identity, and
            on-set visual documentation.
          </p>
        </div>
        <div className="featureImages">
          <Image
            src="/portfolio/web/fomi-ticket.png"
            alt="FOMI ticket poster design"
            width={900}
            height={1200}
            loading="eager"
          />
          <Image
            src="/portfolio/web/mesnap-0506.jpg"
            alt="MeSnap product still"
            width={1200}
            height={900}
            loading="eager"
          />
        </div>
      </section>

      <section className="workSection" id="work">
        <div className="sectionHeader">
          <p className="sectionKicker">Selected design work</p>
          <h2>Identity, campaign, and social systems.</h2>
        </div>
        <div className="projectGrid">
          {designProjects.map((project) => (
            <article className="projectCard" key={project.title}>
              <div className="projectImage">
                <Image
                  src={project.image}
                  alt={`${project.title} portfolio image`}
                  fill
                  loading="eager"
                  sizes="(max-width: 760px) 100vw, 50vw"
                />
              </div>
              <div className="projectBody">
                <p>{project.category}</p>
                <h3>{project.title}</h3>
                <span>{project.summary}</span>
                <div className="tagRow">
                  {project.tags.map((tag) => (
                    <strong key={tag}>{tag}</strong>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="filmSection" id="film">
        <div className="sectionHeader">
          <p className="sectionKicker">Film and photography</p>
          <h2>Frames with atmosphere, evidence, and motion.</h2>
        </div>
        <div className="filmGrid">
          {filmProjects.map((project) => (
            <article key={project.title}>
              <Image
                src={project.image}
                alt={`${project.title} still`}
                width={900}
                height={700}
                loading="eager"
              />
              <div>
                <p>{project.role}</p>
                <h3>{project.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contactSection" id="contact">
        <Image
          src="/portfolio/web/about-bts.jpg"
          alt="Begum behind the scenes"
          width={1000}
          height={700}
          loading="eager"
        />
        <div>
          <p className="sectionKicker">Next step</p>
          <h2>Available for visual identity, campaign, and film-led work.</h2>
          <p>
            The first pass is built around the strongest downloaded categories:
            personal imagery, brand marks, graphic campaigns, and film stills.
          </p>
          <a href="mailto:hello@heysalad.io">hello@heysalad.io</a>
        </div>
      </section>
    </main>
  );
}
