// Founder digital footprint — rendered in the footer and on the About page.
// NOTE: the blog link is the site root; the /in/sean-deardorff/ path 404s.

export interface FounderLink {
  label: string;
  href: string;
}

export const FOUNDER_LINKS: FounderLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sean-deardorff/" },
  { label: "What Is AI Slop?", href: "https://whatisaislop.com/" },
  { label: "Substack", href: "https://substack.com/@the1seandeardorff" },
  { label: "Medium", href: "https://medium.com/@deardorff.sean" },
  { label: "Crunchbase", href: "https://www.crunchbase.com/person/sean-deardorff" },
  { label: "YouTube", href: "https://www.youtube.com/@the1seandeardorff" },
  { label: "DSIE Codex on YouTube", href: "https://www.youtube.com/@TheDSIECodex" },
];
