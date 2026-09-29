import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import SiteHeader from "@/components/SiteHeader";
import { getPortfolioProject, portfolioProjects } from "@/data/portfolio";

export const dynamicParams = false;

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getPortfolioProject(slug);

  if (!project) return {};

  return {
    title: `${project.title} | Begum Geveci`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);

  if (!project) notFound();

  const currentIndex = portfolioProjects.findIndex((item) => item.slug === project.slug);
  const nextProject = portfolioProjects[(currentIndex + 1) % portfolioProjects.length];

  return (
    <main className="aurenProject" id="project-top">
      <SiteHeader />

      <section className="projectHero">
        <Image
          src={project.cover}
          alt={`${project.title} cover`}
          fill
          priority
          sizes="100vw"
        />
        <span className="projectHeroShade" aria-hidden="true" />
        <Link className="projectBack" href="/#work">← ALL WORK</Link>
        <div className="projectHeroTitle">
          <p>{project.category} / {project.year}</p>
          <h1>{project.title}</h1>
        </div>
        <p className="projectScroll">SCROLL TO EXPLORE ↓</p>
      </section>

      <section className="projectIntroduction">
        <div className="projectNumber">{String(currentIndex + 1).padStart(2, "0")}</div>
        <h2>{project.summary}</h2>
        <div className="projectIntroMeta">
          <p><span>DISCIPLINE</span>{project.category}</p>
          <p><span>YEAR</span>{project.year}</p>
          <p><span>GALLERY</span>{project.images.length} IMAGES</p>
        </div>
        <div className="projectNarrative">
          {project.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {project.externalUrl ? (
            <a className="textArrow" href={project.externalUrl} target="_blank" rel="noreferrer">
              {project.externalLabel ?? "VIEW PROJECT"} <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>
      </section>

      <section className="projectGallery" aria-label={`${project.title} gallery`}>
        {project.images.map((image, index) => (
          <figure className={`projectGalleryItem galleryItem${index % 3}`} key={`${image}-${index}`}>
            <div>
              <Image
                src={image}
                alt={`${project.title} project image ${index + 1}`}
                fill
                sizes={index % 3 === 1 ? "(max-width: 760px) 100vw, 72vw" : "100vw"}
              />
            </div>
            <figcaption>{String(index + 1).padStart(2, "0")} / {project.title}</figcaption>
          </figure>
        ))}
      </section>

      <section className="nextProject">
        <Image src={nextProject.cover} alt="" fill sizes="100vw" />
        <span aria-hidden="true" />
        <p>NEXT PROJECT</p>
        <Link href={`/projects/${nextProject.slug}`}>
          <small>{nextProject.category}</small>
          <strong>{nextProject.title}</strong>
          <em>VIEW PROJECT ↗</em>
        </Link>
      </section>

      <footer className="projectFooter">
        <Link href="/#work">ALL WORK</Link>
        <a href="mailto:begumgeveci@gmail.com">BEGUMGEVECI@GMAIL.COM</a>
        <a href="#project-top">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}
