<template>
    <div class="container mx-auto max-w-4xl px-4 py-8">
      <article class="prose lg:prose-lg">
        <ContentRenderer v-if="rules" :value="rules"/>
        <div v-else> Règles de la coinche absentes du site...</div>
      </article>
    </div>
</template>


<script setup lang="ts">
const { data: rules } = await useAsyncData(() => queryCollection('content').path('/rules').first())

useSeoMeta({
  title: rules.value?.title,
  description: rules.value?.description
})
</script>