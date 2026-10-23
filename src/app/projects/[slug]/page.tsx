import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import LoopVideo from "@/components/LoopVideo";
import SiteHeader from "@/components/SiteHeader";
import { getPortfolioProject, portfolioProjects, type ProjectLink } from "@/data/portfolio";
import { imageRatio } from "@/lib/imageOrientation";
import { justifiedRows } from "@/lib/justifiedRows";

const compactAssetPattern = /palette|swatch|logo|badge|ticket|sticker|detail/i;

function getGalleryScale(image: string) {
  return compactAssetPattern.test(image) ? "galleryCompact" : "galleryStandard";
}

function linkPlatform(href: string) {
  if (href.includes("tiktok.com")) return "TikTok";
  if (href.includes("linkedin.com")) return "LinkedIn";
  if (href.includes("youtu")) return "YouTube";
  if (href.includes("instagram.com")) return "Instagram";
  return "Watch";
}

function SectionLink({ link }: { link: ProjectLink }) {
  return link.href ? (
    <a href={link.href} target="_blank" rel="noreferrer">
      <span>{link.label}</span>
      <small>{linkPlatform(link.href)} ↗</small>
    </a>
  ) : (
    <p>
      <span>{link.label}</span>
      <small>Not posted yet</small>
    </p>
  );
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
    title: `${project.title} | Begüm Geveci`,
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
          <h1 className="chromeScript">{project.title}</h1>
        </div>
        <p className="projectScroll">SCROLL TO EXPLORE ↓</p>
      </section>

      <section className="projectIntroduction">
        <div className="projectNumber">{String(currentIndex + 1).padStart(2, "0")}</div>
        <h2>{project.summary}</h2>
        <div className="projectIntroMeta">
          <p><span>DISCIPLINE</span>{project.category}</p>
          <p><span>YEAR</span>{project.year}</p>
          {project.category !== "Game Design" ? (
            <p><span>GALLERY</span>{project.images.length} IMAGES</p>
          ) : null}
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

      {project.sections ? (
        <div className="projectSections" id="gallery">
          {project.sections.map((section, sectionIndex) => (
            <section className="projectSection" key={section.title} aria-labelledby={`section-${sectionIndex}`}>
              <header className="projectSectionHeader">
                {section.group ? <span>{section.group}</span> : null}
                <h3 id={`section-${sectionIndex}`}>{section.title}</h3>
                {section.text ? <p>{section.text}</p> : null}
              </header>
              {section.images?.length ? (
                <div className="projectSectionImages">
                  {justifiedRows(section.images, imageRatio).map(({ items, filler }) => (
                    <div className="projectSectionRow" key={items[0].item}>
                      {items.map(({ item: src, ratio }) => {
                        const imageLink = section.imageLinks?.[src];
                        return (
                          <figure
                            className="projectSectionFigure"
                            style={{ "--ratio": ratio } as CSSProperties}
                            key={src}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={src}
                              alt={`${section.title} ${section.images!.indexOf(src) + 1}`}
                              loading="lazy"
                              decoding="async"
                            />
                            {imageLink ? (
                              <figcaption className="projectSectionLinks">
                                <SectionLink link={imageLink} />
                              </figcaption>
                            ) : null}
                          </figure>
                        );
                      })}
                      {filler ? (
                        <span
                          className="projectSectionFiller"
                          style={{ "--ratio": filler } as CSSProperties}
                          aria-hidden="true"
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}
              {section.links?.length ? (
                <ul className="projectSectionLinks">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <SectionLink link={link} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      ) : (
        <section className="projectGallery" id="gallery" aria-label={`${project.title} gallery`}>
          {(() => {
            // "large" images lead in a row across the top; the rest fill the masonry columns.
            const sizes = project.gallerySizes ?? {};
            const items = project.images.map((image, index) => ({ image, index, size: sizes[image] }));
            const renderItem = ({ image, index, size }: (typeof items)[number]) => (
              <figure
                className={`projectGalleryItem ${size === "small" ? "gallerySmall" : getGalleryScale(image)}`}
                key={`${image}-${index}`}
              >
                {/* Native sizing preserves each artwork's exact orientation in the masonry collage. */}
                {image.endsWith(".mp4") ? (
                  // Clips play like GIFs; a .jpg of the same name is the still shown while loading.
                  <LoopVideo
                    src={image}
                    poster={image.replace(/\.mp4$/, ".jpg")}
                    label={`${project.title} video ${index + 1}`}
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={image}
                    alt={`${project.title} project image ${index + 1}`}
                    loading={index < 6 ? "eager" : "lazy"}
                    decoding="async"
                  />
                )}
                <figcaption>{String(index + 1).padStart(2, "0")} / {project.title}</figcaption>
              </figure>
            );
            const lead = items.filter((item) => item.size === "large");
            return (
              <>
                {lead.length ? <div className="projectGalleryLead">{lead.map(renderItem)}</div> : null}
                {items.filter((item) => item.size !== "large").map(renderItem)}
              </>
            );
          })()}
        </section>
      )}

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
        <a href="mailto:begumgeveci@gmail.com" target="_blank" rel="noreferrer">BEGUMGEVECI@GMAIL.COM</a>
        <a href="#project-top">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}
