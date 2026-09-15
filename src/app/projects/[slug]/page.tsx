import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getPortfolioProject,
  portfolioProjects,
} from "@/data/portfolio";

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

  if (!project) {
    return {};
  }

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

  if (!project) {
    notFound();
  }

  const currentIndex = portfolioProjects.findIndex(
    (item) => item.slug === project.slug,
  );
  const nextProject = portfolioProjects[(currentIndex + 1) % portfolioProjects.length];

  return (
    <main className="projectPage">
      <header className="projectPageHeader">
        <Link href="/#portfolio" className="projectBack">
          ← All projects
        </Link>
        <Link href="/" className="wordmark" aria-label="Begum home">
          BEGUM
        </Link>
        <a href="mailto:begumgeveci@gmail.com">Start a conversation</a>
      </header>

      <section className="projectHero">
        <div className="projectHeroCopy">
          <p className="sectionLabel">{project.category} / {project.year}</p>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
        </div>
        <div className="projectHeroImage">
          <Image
            src={project.cover}
            alt={`${project.title} cover image`}
            fill
            priority
            sizes="100vw"
          />
        </div>
      </section>

      <section className="projectNarrative">
        <p className="sectionLabel">Project story</p>
        <div>
          {project.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {project.externalUrl ? (
            <a href={project.externalUrl} target="_blank" rel="noreferrer">
              {project.externalLabel ?? "View project"} ↗
            </a>
          ) : null}
        </div>
      </section>

      <section className="projectGallery" aria-label={`${project.title} gallery`}>
        {project.images.map((image, index) => (
          <figure key={`${image}-${index}`}>
            <Image
              src={image}
              alt={`${project.title} project image ${index + 1}`}
              fill
              sizes={index === 0 ? "100vw" : "(max-width: 760px) 100vw, 50vw"}
            />
          </figure>
        ))}
      </section>

      <section className="nextProject">
        <p className="sectionLabel">Next project</p>
        <Link href={`/projects/${nextProject.slug}`}>
          <span>{nextProject.category}</span>
          <strong>{nextProject.title}</strong>
          <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}
