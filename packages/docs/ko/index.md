---
layout: home

title: Pinia
titleTemplate: 직관적인 Vue.js 상태 관리 라이브러리

hero:
  name: Pinia
  text: 직관적인 Vue.js 상태 관리 라이브러리
  tagline: Type-safe, 확장 가능, 모듈식 설계. 상태 관리 라이브러리를 사용하고 있다는 사실조차 잊게 만듭니다.
  image:
    src: /logo.png
    alt: Pinia
  actions:
    - theme: brand
      text: 시작하기
      link: /getting-started.html
    - theme: alt
      text: 대모
      link: https://stackblitz.com/github/piniajs/example-vue-3-vite
    - theme: cta mastering-pinia
      text: ' '
      link: https://masteringpinia.com
    - theme: cta vueschool
      text: 비디오 소개 보기
      link: https://vueschool.io/lessons/introduction-to-pinia?friend=vuerouter&utm_source=pinia&utm_medium=link&utm_campaign=homepage
    - theme: cta vue-mastery
      text: Pinia 치트 시트 받기
      link: https://www.vuemastery.com/pinia?coupon=PINIA-DOCS&via=eduardo

features:
  - title: 💡 직관적
    details: Store는 컴포넌트처럼 익숙합니다. API는 좋은 구조의 Store를 작성할 수 있도록 설계되었습니다.
  - title: 🔑 Type-safe
    details: 타입이 추론되므로, JavaScript에서도 자동 완성 기능을 제공합니다!
  - title: ⚙️ 개발 도구 지원
    details: Pinia는 Vue devtools와 연결되어 Vue 2 및 Vue 3에서 향상된 개발 경험을 제공합니다.
  - title: 🔌 확장 가능
    details: Store의 변경 사항 및 actions에 반응하여 트랜잭션, 로컬 스토리지 동기화 등으로 Pinia를 확장할 수 있습니다.
  - title: 🏗 모듈식 설계
    details: 여러 개의 Store를 구성하고 번들러가 자동으로 이를 분할하도록 할 수 있습니다.
  - title: 📦 극도로 가벼움
    details: Pinia의 크기는 약 1.5kb로, 존재조차 잊게 될 것입니다!
---

<script setup>
import HomeSponsors from '../.vitepress/theme/components/HomeSponsors.vue'
import '../.vitepress/theme/styles/home-links.css'
</script>

<HomeSponsors />
