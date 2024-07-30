import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const META_URL = 'https://pinia.vuejs.org'
export const META_TITLE = 'Pinia 🍍'
export const META_DESCRIPTION = '직관적, Type-safe 그리고 유연한 Vue Store'

export const koConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  description: META_DESCRIPTION,
  head: [
    ['meta', { property: 'og:url', content: META_URL }],
    ['meta', { property: 'og:description', content: META_DESCRIPTION }],
    ['meta', { property: 'twitter:url', content: META_URL }],
    ['meta', { property: 'twitter:title', content: META_TITLE }],
    ['meta', { property: 'twitter:description', content: META_DESCRIPTION }],
  ],

  themeConfig: {
    editLink: {
      pattern:
        'https://github.com/niceplugin/Vuejs-Pinia-KO/edit/main-korean/packages/docs/ko/:path',
      text: '이 페이지 편집 제안하기',
    },

    outline: {
      label: '이 페이지 목차',
    },

    docFooter: {
      prev: '이전',
      next: '다음',
    },

    nav: [
      // { text: 'Config', link: '/config/' },
      // { text: 'Plugins', link: '/plugins/' },
      {
        text: '가이드',
        link: '/core-concepts/',
        activeMatch: '^/core-concepts/',
      },
      {
        text: 'API <span class="VPBadge danger non-translate-badge-inline">영문</span>',
        link: '/api/',
        activeMatch: '^/api/',
      },
      { text: 'Cookbook', link: '/cookbook/', activeMatch: '^/cookbook/' },
      {
        text: '링크',
        items: [
          {
            text: '토론',
            link: 'https://github.com/vuejs/pinia/discussions',
          },
          {
            text: '변경사항',
            link: 'https://github.com/vuejs/pinia/blob/v2/packages/pinia/CHANGELOG.md',
          },
          {
            text: 'Vue.js 자격증',
            link: 'https://certificates.dev/vuejs/?friend=VUEROUTER&utm_source=pinia_vuejs&utm_medium=link&utm_campaign=pinia_vuejs_links&utm_content=navbar',
          },
        ],
      },
    ],
    sidebar: {
      '/api/': [
        {
          text: 'packages',
          items: [
            { text: 'pinia', link: '/api/pinia/' },
            {
              text: '@pinia/nuxt',
              link: '/api/@pinia/nuxt/',
            },
            {
              text: '@pinia/testing',
              link: '/api/@pinia/testing/',
            },
          ],
        },
      ],
      '/': [
        {
          text: '소개',
          items: [
            {
              text: 'Pinia가 뭔가요?',
              link: '/introduction.html',
            },
            {
              text: '시작하기',
              link: '/getting-started.html',
            },
          ],
        },
        {
          text: '핵심 개념',
          items: [
            { text: 'Store (스토어) 다루기', link: '/core-concepts/' },
            { text: 'State (상태)', link: '/core-concepts/state.html' },
            { text: 'Getters (개터)', link: '/core-concepts/getters.html' },
            { text: 'Actions (액션)', link: '/core-concepts/actions.html' },
            { text: 'Plugins (플러그인)', link: '/core-concepts/plugins.html' },
            {
              text: '컴포넌트 외부에서 Store 사용하기',
              link: '/core-concepts/outside-component-usage.html',
            },
          ],
        },
        {
          text: '서버 사이드 렌더링 (SSR)',
          items: [
            {
              text: 'Vue & Vite',
              link: '/ssr/',
            },
            {
              text: 'Nuxt.js',
              link: '/ssr/nuxt.html',
            },
          ],
        },
        {
          text: 'Cookbook',
          collapsed: false,
          items: [
            {
              text: '개요',
              link: '/cookbook/',
            },
            {
              text: 'Vuex ≤4 → 마이그레이션 <span class="VPBadge danger non-translate-badge">영문</span>',
              link: '/cookbook/migration-vuex.html',
            },
            {
              text: '핫 모듈 교체 (HMR)',
              link: '/cookbook/hot-module-replacement.html',
            },
            {
              text: '테스팅 <span class="VPBadge danger non-translate-badge">영문</span>',
              link: '/cookbook/testing.html',
            },
            {
              text: 'setup() 없이 사용하기',
              link: '/cookbook/options-api.html',
            },
            {
              text: 'Store 조합하기',
              link: '/cookbook/composing-stores.html',
            },
            {
              text: 'VSCode 스니펫',
              link: '/cookbook/vscode-snippets.html',
            },
            {
              text: 'v0/v1 → v2 마이그레이션 <span class="VPBadge danger non-translate-badge">영문</span>',
              link: '/cookbook/migration-v1-v2.html',
            },
            {
              text: '컴포저블 다루기',
              link: '/cookbook/composables.html',
            },
          ],
        },
      ],
    },
  },
}

export const koSearch: DefaultTheme.AlgoliaSearchOptions = {
  appId: 'PTO6MRQ22K',
  apiKey: 'e0f61835af3061f18d9b9fdb0f49aa9f',
  indexName: 'pinia-vuejs',
  placeholder: '문서 검색',
  translations: {
    button: {
      buttonText: '검색',
      buttonAriaLabel: '검색',
    },
    modal: {
      searchBox: {
        resetButtonTitle: '검색 지우기',
        resetButtonAriaLabel: '검색 지우기',
        cancelButtonText: '취소',
        cancelButtonAriaLabel: '취소',
      },
      startScreen: {
        recentSearchesTitle: '검색 기록',
        noRecentSearchesText: '최근 검색 없음',
        saveRecentSearchButtonTitle: '검색 기록에 저장',
        removeRecentSearchButtonTitle: '검색 기록에서 삭제',
        favoriteSearchesTitle: '즐겨찾기',
        removeFavoriteSearchButtonTitle: '즐겨찾기에서 삭제',
      },
      errorScreen: {
        titleText: '결과를 가져올 수 없습니다',
        helpText: '네트워크 연결을 확인하세요',
      },
      footer: {
        selectText: '선택',
        navigateText: '탐색',
        closeText: '닫기',
        searchByText: '검색 기준',
      },
      noResultsScreen: {
        noResultsText: '결과를 찾을 수 없습니다',
        suggestedQueryText: '새로운 검색을 시도할 수 있습니다',
        reportMissingResultsText: '해당 검색어에 대한 결과가 있어야 합니까?',
        reportMissingResultsLinkText: '피드백 보내기 클릭',
      },
    },
  },
}
