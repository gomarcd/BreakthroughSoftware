export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/'/g, '') // Remove apostrophes
    .replace(/[^\w-]+/g, '') // Remove non-word characters except hyphens
    .replace(/--+/g, '-'); // Replace multiple consecutive hyphens with a single hyphen
}