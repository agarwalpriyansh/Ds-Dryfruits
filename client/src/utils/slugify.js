export const slugifyThemeName = (name = '') =>
  name
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');

export const deslugifyThemeName = (slug = '') =>
  slug
    .toString()
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

