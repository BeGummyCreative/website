import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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

  const currentIndex = portfolioProjects.findIndex(
    (item) => item.slug === project.slug,
  );
  const nextProject = portfolioProjects[(currentIndex + 1) % portfolioProjects.length];
  const indexedImages = project.images.map((image, index) => ({ image, index }));
  const imageColumns = [
    indexedImages.filter(({ index }) => index % 2 === 0),
    indexedImages.filter(({ index }) => index % 2 === 1),
  ];

  return (
    <main className="projectSplit" id="project-top">
      <section className="projectInfoPanel">
        <div className="projectInfoInner">
          <Link className="darkPill" href="/#work">
            <span aria-hidden="true">←</span> Back
          </Link>

          <div className="projectTitleBlock">
            <p>{project.category}</p>
            <h1>{project.title}</h1>
            <p>{project.summary}</p>
            {project.externalUrl ? (
              <a
                className="lightButton"
                href={project.externalUrl}
                target="_blank"
                rel="noreferrer"
              >
                {project.externalLabel ?? "Live preview"}
              </a>
            ) : null}
          </div>

          <dl className="projectMeta">
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>Scope</dt>
              <dd>{project.category}</dd>
            </div>
            <div>
              <dt>Gallery</dt>
              <dd>{project.images.length} images</dd>
            </div>
          </dl>

          <div className="projectStory">
            {project.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="projectNext">
            <p>Next project</p>
            <Link href={`/projects/${nextProject.slug}`}>
              <span>
                <strong>{nextProject.title}</strong>
                <small>{nextProject.category}</small>
              </span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <section className="projectContact">
            <a className="backToTop" href="#project-top" aria-label="Back to top">
              ↑
            </a>
            <h2>Reach out.</h2>
            <p>Let&apos;s work together to bring your ideas to life.</p>
            <a href="mailto:begumgeveci@gmail.com">begumgeveci@gmail.com</a>
          </section>
        </div>
      </section>

      <section className="projectVisualPanel" aria-label={`${project.title} gallery`}>
        <div className="projectImageColumns">
          {imageColumns.map((column, columnIndex) => (
            <div className="projectImageColumn" key={columnIndex}>
              {column.map(({ image, index }) => (
                <figure className={`projectImage projectImageShape${index % 4}`} key={`${image}-${index}`}>
                  <Image
                    src={image}
                    alt={`${project.title} project image ${index + 1}`}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 700px) 100vw, 34vw"
                  />
                </figure>
              ))}
            </div>
          ))}
        </div>
        <div className="projectVisualFooter">
          <a className="lightButton" href="mailto:begumgeveci@gmail.com">
            Start a project
          </a>
          <a className="backToTop" href="#project-top" aria-label="Back to project top">
            ↑
          </a>
        </div>
      </section>
    </main>
  );
}
