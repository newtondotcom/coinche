<template>
  <div class="grid grid-cols-2 grid-rows-2 gap-4">
    <iframe
      v-if="visibleFrames[0]"
      class="w-full"
      src="/partie?id=0&surname=robebs&gameId=0"
      width="1080"
      height="420"
    />
    <iframe
      v-if="visibleFrames[1]"
      class="w-full"
      src="/partie?id=1&surname=robebs1&gameId=0"
      width="1080"
      height="420"
    />
    <iframe
      v-if="visibleFrames[2]"
      class="w-full"
      src="/partie?id=2&surname=robebs2&gameId=0"
      width="1080"
      height="420"
    />
    <iframe
      v-if="visibleFrames[3]"
      class="w-full"
      src="/partie?id=3&surname=robebs3&gameId=0"
      width="1080"
      height="420"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const visibleFrames = ref([false, false, false, false])

onMounted(() => {
  visibleFrames.value.forEach((_, index) => {
    setTimeout(() => {
      visibleFrames.value[index] = true
    }, 1000 * index)
  })
})
</script>
