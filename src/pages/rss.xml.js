import rss from '@astrojs/rss';

export const get = () => rss({
  title: 'Hello Astro | Testing',
  description: 'Just my sandbox where i test Astro',
  site: 'https://testingastro.netlify.app/',
  items: import.meta.glob('./posts/*.md'),
  customData: `<language>en-us</language>`,
});