import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import icon from 'astro-icon';

export default defineConfig({
  integrations: [
    tailwind(),
    icon({
      include: {
        'mdi': ['*'],
        'ph': ['*'],
        'ion': ['*'],
        'fa': ['*'],
        'lucide': ['*'],
      }
    }),
  ],
  site: 'https://breakthrough.software',
  output: 'static'
});