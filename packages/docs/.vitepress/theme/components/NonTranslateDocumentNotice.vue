<script lang="ts" setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { page } = useData()

const props = defineProps<{
  fileName?: string
}>()

const name = computed<string>(() => {
  return page.value.filePath
    .split('/')
    .filter(segment => segment !== '')
    .pop() || ''
})

const fileName = computed<string>(() => {
  return props.fileName || name.value
})
</script>

<template>
  <div class="note custom-block non-translate-note">
    <p class="custom-block-title">
      번역을 도와주세요
      <span class="ani-rubberBand">🫠</span>
    </p>

    <p>
      <strong class="file-name">{{ fileName }}</strong> 파일은 아직 한글로 번역되지 않았습니다.
    </p>
  </div>
</template>
