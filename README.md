# Digipom Website

The Digipom website redesign is implemented using [Astro](https://astro.build) and [Tailwind](https://tailwindcss.com).


## Project Structure

The project structure looks like this:

```
/
├── src/
│   ├── content/
│   │   ├── news/
│   │   │   └── welcome-to-digipom.md
│   │   └── config.ts
│   ├── pages/
│   │   ├── index.astro
│   │   └── about.astro
│   ├── styles/   
│   │   └── digipom.css
│   └── utils/
│       └── slugify.js
├── astro.config.mjs 
├── tailwind.config.cjs
└── package.json
```

## Adding new posts

Astro looks for `.md` files in the `src/content/news` directory; any new `.md` files will appear as new posts on the site. The markdown frontmatter schema is defined in `src/content/config.ts`. An example new post with valid frontmatter might look like this:

```
---
title: 'This is a new post!'
description: 'This is a short description of the new post.'
publishedDate: 2023-06-18
tags: ["Blog", "Updates"]
---

# This is an H1 heading

## H2 heading

Here we'll say in bold, this is a **new post**!
```

Content between opening and closing --- are the "frontmatter".

Dates should be entered as YYYY-MM-DD, they will be displayed in a friendly format automatically.

When a new post is pushed to the repo, the CI/CD pipeline will be triggered and automatically rebuild the site with the new post and upload it to the server. Thus the workflow to add new posts to the site should resemble this:

- Use editor to add, edit and save the new post in src/content/news/newpost.md and then either use the editor's built in git functionality or return to the terminal to push the changes
- git add src/content/news/newpost.md
- git commit -m "add new post"
- git push

## Tags

Tags should be entered like an array, as shown above, and while spaces and apostraphes can be used in tag names, the generated URLs for tags will automatically be slugified.