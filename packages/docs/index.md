---
layout: home

title: 피니아
titleTemplate: Vue.js를 위한 직관적인 스토어

hero:
  name: 피니아
  text: Vue.js를 위한 직관적인 스토어
  tagline: 타입 안전, 확장 가능, 모듈식 디자인. 스토어를 사용하고 있다는 것을 잊게 해줍니다.
  image:
    src: /logo.svg
    alt: 피니아
  actions:
    - theme: brand
      text: 시작하기
      link: /introduction
    - theme: alt
      text: 데모
      link: https://stackblitz.com/github/piniajs/example-vue-3-vite
    - theme: cta mastering-pinia
      text: ' '
      link: https://masteringpinia.com
    - theme: cta vueschool
      text: 비디오 소개 보기
      link: https://vueschool.io/lessons/introduction-to-pinia?friend=vuerouter&utm_source=pinia&utm_medium=link&utm_campaign=homepage
    - theme: cta vue-mastery
      text: 피니아 요령 시트 받기
      link: https://www.vuemastery.com/pinia?coupon=PINIA-DOCS&via=eduardo

features:
  - title: 💡 직관적
    details: 스토어는 컴포넌트만큼 친숙합니다. 잘 조직된 스토어를 작성하게 해주는 API를 설계했습니다.
  - title: 🔑 타입 안전
    details: 타입은 추론되므로, JavaScript에서도 스토어가 자동완성을 제공합니다!
  - title: ⚙️ 개발자 도구 지원
    details: 피니아는 Vue 개발자 도구에 연결되어 Vue 2와 Vue 3 모두에서 개선된 개발 경험을 제공합니다.
  - title: 🔌 확장 가능
    details: 스토어 변경에 반응하여 트랜잭션, 로컬 스토리지 동기화 등으로 피니아를 확장할 수 있습니다.
  - title: 🏗 모듈식 디자인
    details: 여러 스토어를 구축하고 번들러가 자동으로 코드를 분할하게 하십시오.
  - title: 📦 매우 가벼움
    details: 피니아는 약 1.5kb로, 그것이 거기에 있다는 것조차 잊게 만듭니다!
---

<script setup>
import HomeSponsors from './.vitepress/theme/components/HomeSponsors.vue'
import './.vitepress/theme/styles/home-links.css'
</script>

<HomeSponsors />
