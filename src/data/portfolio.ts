export type PortfolioCategory =
  | "Graphic Design"
  | "Game Design"
  | "Photography"
  | "Social Content";

export type PortfolioProject = {
  slug: string;
  title: string;
  category: PortfolioCategory;
  year: string;
  cover: string;
  summary: string;
  description: string[];
  images: string[];
  externalUrl?: string;
  externalLabel?: string;
};

export const filmProjects = [
  {
    title: "Pressure",
    role: "Choreography video",
    image: "/portfolio/wix/film/pressure.jpg",
    href: "https://youtu.be/pZxLC36jzWw",
    description:
      "A dance film created with an international group of professional dancers, choreographed by Diezel Morar to Roma to Paris by June Freedom.",
  },
  {
    title: "WHYTE Jeans",
    role: "Commercial film",
    image: "/portfolio/wix/film/whyte-jeans.jpg",
    href: "https://www.instagram.com/reel/DafE3qIt4eN/",
    description:
      "A fast-turnaround Shoreditch campaign for WHYTE Addict, supporting camera, sound, and lighting across a three-hour production.",
  },
  {
    title: "UCL vs KCL Varsity",
    role: "Sports campaign",
    image: "/portfolio/wix/film/varsity.jpg",
    href: "https://www.instagram.com/reel/DWRpn6njJcW/",
    description:
      "A storyboarded football campaign made with UCL Film Society and screened on the big screen before the Varsity final.",
  },
  {
    title: "Wishbone Fever",
    role: "Short film / Production",
    image: "/portfolio/wix/film/wishbone-fever.jpg",
    href: "https://www.imdb.com/name/nm18369899/",
    description:
      "Audience Choice winner at FOMI. Begum worked as production assistant and runner on this psychological thriller about healing from domestic violence.",
  },
  {
    title: "HENRY",
    role: "Music video / Lighting",
    image: "/portfolio/wix/film/henry.jpg",
    href: "https://youtu.be/VytNsdTkoAI",
    description:
      "Flo Wilkes' music video exploring performative male stereotypes. Begum worked across lighting, set assistance, and production running.",
  },
  {
    title: "The Nurturer",
    role: "Installation",
    image: "/portfolio/wix/film/the-nurturer.jpg",
    href: "https://youtu.be/wwhwcVAdiYw",
    description:
      "An installation paying homage to mothers while using Mother Earth as a metaphor for nurture, comfort, and ecological care.",
  },
  {
    title: "Left Behind",
    role: "Psychological thriller",
    image: "/portfolio/wix/film/left-behind.jpg",
    href: "https://youtu.be/-nAyaumk4jQ",
    description:
      "A quiet reflection on abandonment, lost innocence, and the ache of outgrowing pieces of ourselves.",
  },
  {
    title: "Remembrance & Roots",
    role: "Documentary",
    image: "/portfolio/wix/film/remembrance-roots.jpg",
    href: "https://youtu.be/ehVIgs9hMhU",
    description:
      "A two-person experimental documentary about Turks in London and the way Ataturk's Remembrance Day connects a community far from home.",
  },
  {
    title: "AI & Artistic Expression",
    role: "Experimental documentary",
    image: "/portfolio/wix/film/ai-artistic-expression.jpg",
    href: "https://youtu.be/rn9_T7td3Ss",
    description:
      "A practice-led documentary combining AI, fine art, and interviews to examine technology's influence on artistic process and expression.",
  },
  {
    title: "Glimpse",
    role: "Fiction film / Editor",
    image: "/portfolio/wix/film/glimpse.jpg",
    href: "https://youtu.be/1elslE4nq9I",
    description:
      "A ten-minute fiction film about destiny, seen through a clairvoyant young man forced into independence from an early age.",
  },
  {
    title: "Disconnected",
    role: "Fiction film / Director",
    image: "/portfolio/wix/film/disconnected.jpg",
    href: "https://youtu.be/dywTeuZ5iT4",
    description:
      "A short film about the gap between online and in-person identities and how that disconnect can erode relationships.",
  },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "cake-sit-rebrand",
    title: "Cake Sit Rebrand",
    category: "Graphic Design",
    year: "2026",
    cover: "/portfolio/wix/graphic/cake-sit-cover.jpg",
    summary: "A refreshed identity for Peckham's monthly queer performance night.",
    description: [
      "Cake Sit hosts a monthly queer performance event at The Old Nun's Head pub in Peckham.",
      "The rebrand creates a more expressive, flexible identity that can move across event promotion and social media while retaining the event's playful character.",
    ],
    images: [
      "/portfolio/wix/graphic/cake-sit-cover.jpg",
      "/portfolio/wix/graphic/cake-sit-identity.jpg",
      "/portfolio/wix/graphic/cake-sit-application-1.jpg",
      "/portfolio/wix/graphic/cake-sit-application-2.jpg",
    ],
    externalUrl: "https://www.instagram.com/cake.sit/",
    externalLabel: "Visit Cake Sit",
  },
  {
    slug: "elo-design-work",
    title: "ELO Design Work",
    category: "Graphic Design",
    year: "2026",
    cover: "/portfolio/wix/graphic/elo-cover.jpg",
    summary: "Brand and campaign design for a London open-source humanoid start-up.",
    description: [
      "ELO is an open-source humanoid start-up based in London.",
      "The work brings its identity into real-world events and campaign materials, balancing technical credibility with an accessible, human visual language.",
    ],
    images: [
      "/portfolio/wix/graphic/elo-cover.jpg",
      "/portfolio/wix/graphic/elo-event.jpg",
      "/portfolio/wix/graphic/elo-display.jpg",
      "/portfolio/wix/graphic/elo-poster.jpg",
    ],
    externalUrl: "https://elo.inc/",
    externalLabel: "Visit ELO",
  },
  {
    slug: "into-wonderland",
    title: "Into Wonderland",
    category: "Graphic Design",
    year: "2025",
    cover: "/portfolio/wix/graphic/wonderland-cover.jpg",
    summary: "An exhibition campaign that sees Wonderland through Alice's eyes.",
    description: [
      "Into Wonderland is an advertising campaign for an Alice in Wonderland exhibition.",
      "The identity uses shifting scale, saturated colour, and theatrical compositions to place the audience inside Alice's altered perspective.",
    ],
    images: [
      "/portfolio/wix/graphic/wonderland-cover.jpg",
      "/portfolio/wix/graphic/wonderland-logo.jpg",
      "/portfolio/wix/graphic/wonderland-poster-1.jpg",
      "/portfolio/wix/graphic/wonderland-poster-2.jpg",
    ],
  },
  {
    slug: "world-tour-branding",
    title: "World Tour Branding",
    category: "Graphic Design",
    year: "2023",
    cover: "/portfolio/wix/graphic/world-tour-cover.jpg",
    summary: "A full tour identity spanning posters, tickets, merchandise, and print.",
    description: [
      "A speculative world-tour identity inspired by Melanie Martinez, developed as an A Level branding project.",
      "The system combines custom lettering, risograph texture, offset print, posters, brochures, tickets, stickers, and merchandise. Selected products also support the Safe Stay refuge charity.",
    ],
    images: [
      "/portfolio/wix/graphic/world-tour-cover.jpg",
      "/portfolio/wix/graphic/world-tour-logo.jpg",
      "/portfolio/wix/graphic/world-tour-poster-1.jpg",
      "/portfolio/wix/graphic/world-tour-poster-2.jpg",
      "/portfolio/wix/graphic/world-tour-ticket.jpg",
      "/portfolio/wix/graphic/world-tour-tote.jpg",
    ],
  },
  {
    slug: "monologue-festival",
    title: "Monologue Festival",
    category: "Graphic Design",
    year: "2024",
    cover: "/portfolio/wix/graphic/monologue-cover.jpg",
    summary: "A family of promotional posters for UCL Drama Society.",
    description: [
      "A set of poster directions created for UCL Drama Society's Monologue Festival in May 2024.",
      "The variations explore hierarchy, expressive typography, and a recognisable campaign language for social promotion.",
    ],
    images: [
      "/portfolio/wix/graphic/monologue-cover.jpg",
      "/portfolio/wix/graphic/monologue-2.jpg",
      "/portfolio/wix/graphic/monologue-3.jpg",
      "/portfolio/wix/graphic/monologue-live.jpg",
    ],
  },
  {
    slug: "film-festival-branding",
    title: "Film Festival Branding",
    category: "Graphic Design",
    year: "2024",
    cover: "/portfolio/wix/graphic/film-festival-cover.jpg",
    summary: "A gothic festival identity inspired by the cinema of Tim Burton.",
    description: [
      "A film-festival identity focused on films produced or directed by Tim Burton and his distinctive visual language.",
      "The project expands from logos and vector illustration into posters, badges, and lanyards, creating a playful but coherent gothic event system.",
    ],
    images: [
      "/portfolio/wix/graphic/film-festival-cover.jpg",
      "/portfolio/wix/graphic/film-festival-logo.jpg",
      "/portfolio/wix/graphic/film-festival-poster.jpg",
      "/portfolio/wix/graphic/film-festival-badge.jpg",
      "/portfolio/wix/graphic/film-festival-lanyards.jpg",
    ],
  },
  {
    slug: "autism-acceptance-stickers",
    title: "Autism Acceptance Stickers",
    category: "Graphic Design",
    year: "2023",
    cover: "/portfolio/wix/graphic/autism-stickers-cover.jpg",
    summary: "A competition-winning sticker set created for Autism Acceptance Week.",
    description: [
      "Designed for an Autism Acceptance Week competition in April 2023.",
      "The winning stickers were printed and distributed throughout Begum's sixth form, turning a compact illustration system into a visible awareness campaign.",
    ],
    images: [
      "/portfolio/wix/graphic/autism-stickers-cover.jpg",
      "/portfolio/wix/graphic/autism-stickers-process.jpg",
    ],
  },
  {
    slug: "latrinalia",
    title: "Latrinalia",
    category: "Game Design",
    year: "2026",
    cover: "/portfolio/wix/game/latrinalia-cover.jpg",
    summary: "An immersive, open-ended degree-show installation set in club bathrooms.",
    description: [
      "Latrinalia takes its name from the anonymous messages and drawings found on bathroom walls. Its female, male, and gender-neutral club-bathroom stalls each hold different traces and stories.",
      "The installation asks how anonymous, ephemeral marks can explore self-disclosure, collective belonging, and existential meaning-making. Visitors choose their own route through the space.",
    ],
    images: [
      "/portfolio/wix/game/latrinalia-cover.jpg",
      "/portfolio/wix/game/latrinalia-playthrough.jpg",
      "/portfolio/wix/game/latrinalia-stalls.jpg",
      "/portfolio/wix/game/latrinalia-installation.jpeg",
    ],
    externalUrl: "https://www.bamedia.uk/artwork/latrinalia",
    externalLabel: "View degree show feature",
  },
  {
    slug: "interactive-toy",
    title: "Interactive Toy",
    category: "Game Design",
    year: "Year 1",
    cover: "/portfolio/wix/game/interactive-toy.jpg",
    summary: "A modelled, animated, and coded character with a Blade Runner atmosphere.",
    description: [
      "Begum's first complete character design, developed individually within a shared sci-fi world.",
      "The project moved through modelling, animation, and code to produce a finished interactive toy with a Blade Runner-inspired visual atmosphere.",
    ],
    images: ["/portfolio/wix/game/interactive-toy.jpg"],
  },
  {
    slug: "cinematic",
    title: "Cinematic",
    category: "Game Design",
    year: "Year 1",
    cover: "/portfolio/wix/game/cinematic.jpg",
    summary: "A Blender and Unreal Engine collaboration seen through an escaped goldfish.",
    description: [
      "A group cinematic built with Blender characters and an Unreal Engine environment.",
      "The scene adopts the perspective of a goldfish that has just escaped a fisherman, using scale and camera movement to make a familiar world feel newly precarious.",
    ],
    images: ["/portfolio/wix/game/cinematic.jpg"],
    externalUrl: "https://youtu.be/xqEk0qQua4M",
    externalLabel: "Watch cinematic",
  },
  {
    slug: "mini-game",
    title: "Mini Game",
    category: "Game Design",
    year: "Year 1",
    cover: "/portfolio/wix/game/mini-game.jpg",
    summary: "Three expressive characters driven by random text and custom sound.",
    description: [
      "An Unreal Engine mini-game featuring three characters whose dialogue is randomly selected from individual word pools.",
      "Custom mumbling sounds add personality and make each encounter feel unpredictable.",
    ],
    images: ["/portfolio/wix/game/mini-game.jpg"],
    externalUrl: "https://youtu.be/Tx8QSE5rRVo",
    externalLabel: "Watch game",
  },
  {
    slug: "nyctophobia",
    title: "Nyctophobia",
    category: "Game Design",
    year: "Year 2",
    cover: "/portfolio/wix/game/nyctophobia.jpg",
    summary: "A point-and-click horror game about guiding a child through the dark.",
    description: [
      "Nyctophobia is a three-person perspective horror game named after the extreme fear of darkness.",
      "The player must guide a little girl from the living room to her bed before the creatures hidden in the shadows find her.",
    ],
    images: ["/portfolio/wix/game/nyctophobia.jpg"],
    externalUrl: "https://youtu.be/P9vK6fcxpco",
    externalLabel: "Watch playthrough",
  },
  {
    slug: "vr-experience",
    title: "VR Experience",
    category: "Game Design",
    year: "Year 2",
    cover: "/portfolio/wix/game/vr-experience.jpg",
    summary: "A simulated hallway where every object exposes a crack in reality.",
    description: [
      "A VR experience designed for the Now Play This festival at Somerset House.",
      "Players follow objects as clues through a simulated hallway, searching for an uncertain escape while the world unravels around them.",
    ],
    images: ["/portfolio/wix/game/vr-experience.jpg"],
    externalUrl: "https://youtu.be/XgnqgFvV6ac",
    externalLabel: "Watch experience",
  },
  {
    slug: "vault-of-genesis",
    title: "The Vault of Genesis",
    category: "Game Design",
    year: "Year 3",
    cover: "/portfolio/wix/game/worldbuilding.jpg",
    summary: "An interactive worldbuilding project set after atmospheric collapse.",
    description: [
      "Earth's atmosphere has ruptured and almost all human life has burned away. The last survivor discovers a sanctuary for the planet's final organisms.",
      "The interactive walkthrough reveals how each species came to an end while constructing a fragile archive of life.",
    ],
    images: ["/portfolio/wix/game/worldbuilding.jpg"],
    externalUrl: "https://youtu.be/shUdWmNveU8",
    externalLabel: "Watch walkthrough",
  },
  {
    slug: "fashion-society-photowalk",
    title: "Fashion Society Photowalk",
    category: "Photography",
    year: "2025",
    cover: "/portfolio/wix/photo/fashion-cover.jpg",
    summary: "Street portraits and fashion details captured on a collaborative photowalk.",
    description: [
      "A fashion-led portrait series balancing spontaneous street energy with controlled framing and colour.",
      "The collection focuses on styling, gesture, and the relationship between each subject and the city around them.",
    ],
    images: [
      "/portfolio/wix/photo/fashion-cover.jpg",
      "/portfolio/wix/photo/fashion-2.jpg",
      "/portfolio/wix/photo/fashion-3.jpg",
    ],
  },
  {
    slug: "architecture-photography",
    title: "Architecture Photography",
    category: "Photography",
    year: "Portfolio series",
    cover: "/portfolio/wix/photo/architecture-cover.jpg",
    summary: "Studies of rhythm, geometry, light, and structure in the built environment.",
    description: [
      "An architectural study attentive to repetition, scale, surface, and the way light reorganises physical space.",
      "The images move between broad structural views and quieter geometric details.",
    ],
    images: [
      "/portfolio/wix/photo/architecture-cover.jpg",
      "/portfolio/wix/photo/architecture-2.jpg",
      "/portfolio/wix/photo/architecture-3.jpg",
    ],
  },
  {
    slug: "a-level-media",
    title: "A Level Media",
    category: "Photography",
    year: "2023",
    cover: "/portfolio/wix/photo/alevel-cover.jpg",
    summary: "Narrative photography developed into theatrical posters and a DVD identity.",
    description: [
      "A narrative image-making project spanning staged photography, teaser artwork, theatrical promotion, and a DVD cover.",
      "The work explores how a consistent visual tone can carry a story across multiple formats.",
    ],
    images: [
      "/portfolio/wix/photo/alevel-cover.jpg",
      "/portfolio/wix/photo/alevel-dvd.jpg",
      "/portfolio/wix/photo/alevel-poster.jpg",
    ],
  },
  {
    slug: "personal-photography",
    title: "Personal Photography",
    category: "Photography",
    year: "Ongoing",
    cover: "/portfolio/wix/photo/personal-cover.jpg",
    summary: "An ongoing visual notebook of people, places, and unexpected moments.",
    description: [
      "A looser collection made outside commissioned and academic briefs.",
      "These photographs keep observation playful, moving between portraiture, landscape, colour, and everyday visual coincidences.",
    ],
    images: [
      "/portfolio/wix/photo/personal-cover.jpg",
      "/portfolio/wix/photo/personal-2.jpg",
      "/portfolio/wix/photo/personal-3.jpg",
    ],
  },
  {
    slug: "tiktok-shop-internship",
    title: "TikTok Shop Internship",
    category: "Social Content",
    year: "2026",
    cover: "/portfolio/wix/social/tiktok-live-cover.jpg",
    summary: "B2C and B2B video production across campaigns, LIVE events, and seller stories.",
    description: [
      "As a videographer and editor within TikTok Shop Marketing, Begum created social content for product campaigns, events, seller testimonials, podcasts, and behind-the-scenes stories.",
      "Projects included a Rita Ora and Anna Lahey TYPEBEA LIVE, the Be Iconic campaign, Meet The Shop, product videos, event coverage, and more than ten seller testimonials.",
    ],
    images: [
      "/portfolio/wix/social/tiktok-live-cover.jpg",
      "/portfolio/wix/social/tiktok-be-iconic-1.jpg",
      "/portfolio/wix/social/tiktok-be-iconic-2.jpg",
      "/portfolio/wix/social/tiktok-meet-shop.jpg",
    ],
    externalUrl: "https://www.tiktok.com/@tiktokshop_uk",
    externalLabel: "View TikTok Shop",
  },
  {
    slug: "asian-delights",
    title: "Asian Delights",
    category: "Social Content",
    year: "2025",
    cover: "/portfolio/wix/social/asian-delights-cover.jpg",
    summary: "Styled food photography produced for Swift Food and Asian Delights.",
    description: [
      "A freelance food-photography commission for Asian Delights through Swift Food.",
      "Begum set the lighting, styled each dish, photographed the menu, and edited the final images for use across the restaurant's website and social channels.",
    ],
    images: [
      "/portfolio/wix/social/asian-delights-cover.jpg",
      "/portfolio/wix/social/asian-delights-2.jpg",
      "/portfolio/wix/social/asian-delights-3.jpg",
    ],
    externalUrl: "https://swiftfood.uk/",
    externalLabel: "Visit Swift Food",
  },
  {
    slug: "oakberry-rave",
    title: "OakBerry Matcha Acai Rave",
    category: "Social Content",
    year: "2025",
    cover: "/portfolio/wix/social/oakberry-cover.jpg",
    summary: "Colour-rich event photography and video for an OakBerry community activation.",
    description: [
      "Photography and moving-image coverage for OakBerry's Matcha Acai Rave.",
      "The series captures product, people, and atmosphere with a bright editorial treatment designed for social storytelling.",
    ],
    images: [
      "/portfolio/wix/social/oakberry-cover.jpg",
      "/portfolio/wix/social/oakberry-2.jpg",
      "/portfolio/wix/social/oakberry-3.jpg",
    ],
  },
  {
    slug: "holistic-ai-hackathon",
    title: "Holistic AI: Great Agent Hack",
    category: "Social Content",
    year: "2025",
    cover: "/portfolio/wix/social/holistic-cover.jpg",
    summary: "Event photography and social edits for an agentic AI hackathon.",
    description: [
      "Social media coverage for Holistic AI's Great Agent Hack, combining event photography with fast-turnaround edits.",
      "Deliverables included an event montage, participant Q&A, leadership and judges' perspectives, and a broad photographic record for LinkedIn.",
    ],
    images: [
      "/portfolio/wix/social/holistic-cover.jpg",
      "/portfolio/wix/social/holistic-2.jpg",
      "/portfolio/wix/social/holistic-3.jpg",
    ],
    externalUrl: "https://www.linkedin.com/company/holisticai/posts/",
    externalLabel: "View published work",
  },
  {
    slug: "agentverse-hackathon",
    title: "AgentVerse Hackathon",
    category: "Social Content",
    year: "2025",
    cover: "/portfolio/wix/social/agentverse-cover.jpg",
    summary: "A recap film and event-photo series for a UCL hackathon.",
    description: [
      "Social media content for UCL's AgentVerse Hackathon.",
      "The commission combined an energetic recap montage with event photography designed for the organisers' Instagram channels.",
    ],
    images: [
      "/portfolio/wix/social/agentverse-cover.jpg",
      "/portfolio/wix/social/agentverse-2.jpg",
      "/portfolio/wix/social/agentverse-3.jpg",
    ],
    externalUrl: "https://www.instagram.com/agentversehackathon/",
    externalLabel: "View AgentVerse",
  },
  {
    slug: "kasa-cafe-social",
    title: "Kasa Cafe Social",
    category: "Social Content",
    year: "2025",
    cover: "/portfolio/wix/social/kasa-cover.jpg",
    summary: "Event imagery for UCL Entrepreneurs and Bloomberg Startup Academy.",
    description: [
      "A social photography assignment for a Kasa Cafe gathering connected to the Bloomberg Startup Academy.",
      "The images focus on candid exchange, community, and the working atmosphere of the event.",
    ],
    images: [
      "/portfolio/wix/social/kasa-cover.jpg",
      "/portfolio/wix/social/kasa-2.jpg",
      "/portfolio/wix/social/kasa-3.jpg",
    ],
    externalUrl: "https://www.instagram.com/uclentrepreneurs/",
    externalLabel: "View UCL Entrepreneurs",
  },
];

export const portfolioCategories: PortfolioCategory[] = [
  "Graphic Design",
  "Game Design",
  "Photography",
  "Social Content",
];

export function getPortfolioProject(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}
