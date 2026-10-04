import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import SiteHeader from "@/components/SiteHeader";
import { getPortfolioProject, portfolioProjects } from "@/data/portfolio";

const compactAssetPattern = /palette|swatch|logo|badge|ticket|sticker|detail/i;

function getGalleryScale(image: string) {
  return compactAssetPattern.test(image) ? "galleryCompact" : "galleryStandard";
}

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

      <section className="projectGallery" id="gallery" aria-label={`${project.title} gallery`}>
        {project.images.map((image, index) => (
          <figure className={`projectGalleryItem ${getGalleryScale(image)}`} key={`${image}-${index}`}>
            {/* Native sizing preserves each artwork's exact orientation in the masonry collage. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={`${project.title} project image ${index + 1}`}
              loading={index < 6 ? "eager" : "lazy"}
              decoding="async"
            />
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
