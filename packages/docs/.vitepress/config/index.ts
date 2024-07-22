import { defineConfig } from 'vitepress'
import { sharedConfig } from './shared'
import { koConfig } from './ko'

export default defineConfig({
  ...sharedConfig,

  locales: {
    root: { label: '한국어', lang: 'ko-KR', link: '/', ...koConfig },
    en: { label: 'English', lang: 'en-US', link: 'https://pinia.vuejs.org/' },
  },
})
