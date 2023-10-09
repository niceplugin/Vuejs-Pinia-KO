import { defineConfig } from 'vitepress'
import { koConfig } from './ko'
import { sharedConfig } from './shared'

export default defineConfig({
  ...sharedConfig,

  locales: {
    root: { label: '한국어', lang: 'ko-KR', link: '/', ...koConfig },
    en: {
      label: 'English',
      lang: 'en-US',
      link: 'https://pinia.vuejs.org/',
    },
    pt: {
      label: 'Português',
      lang: 'pt-PT',
      link: 'https://pinia-docs-pt.netlify.app/',
    },
    uk: {
      label: 'Українська',
      lang: 'uk-UA',
      link: 'https://pinia-ua.netlify.app',
    },
  },
})