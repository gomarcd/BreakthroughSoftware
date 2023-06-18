import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export const get = async () => {
  const posts = await getCollection('news');

  return rss({
    title: 'Digipom',
    description: 'News',
    site: 'https://digipom.com',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedDate,
      link: post.slug,
      content: sanitizeHtml(parser.render(post.body)),
      ...post.data,
    })),
  });
};