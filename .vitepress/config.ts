import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Rollkit",
  description: "The open modular framework for sovereign rollups.",
  
  head: [
    // ['link', { rel: 'icon', href: '/favicon-dark.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: dark)' }],
    // ['link', { rel: 'icon', href: '/favicon-dark.png', type: 'image/png', media: '(prefers-color-scheme: dark)' }],
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'icon', href: '/favicon.png', type: 'image/png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#fff' }],
    ['meta', { name: 'theme-color', content: '#fff' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' }],
    ['meta', { property: 'og:title', content: 'Rollkit' }],
    ['meta', { property: 'og:description', content: 'The open modular framework for sovereign rollups.' }],
    ['meta', { property: 'description', content: 'The open modular framework for sovereign rollups.' }],
    ['meta', { httpEquiv: 'Content-Language', content: 'en' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: '/Rollkit-og.png' }],
    ['meta', { name: 'twitter:site:domain', content: 'rollkit.dev' }],
    ['meta', { name: 'twitter:url', content: 'https://rollkit.dev' }],
    ['meta', { name: 'og:image', content: '/Rollkit-og.png' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'Rollkit' }],
  ],

  appearance: 'dark',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/rollup-starter' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Rollup Starter', link: '/rollup-starter'},
          { text: 'Polaris EVM Starter', link: '/polaris'},
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    logo: {
      alt: 'Rollkit Logo',
      light: '/logo.svg',
      dark: '/logo-dark.svg'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/rollkit/docs' },
      { icon: 'twitter', link: 'https://twitter.com/RollkitDev' }
    ]
  }
})
