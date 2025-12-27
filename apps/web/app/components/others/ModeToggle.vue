<script setup lang="ts">
import { computed } from "vue";
import { Moon, Sun } from "lucide-vue-next";
const colorMode = useColorMode()

const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set (value) {
    colorMode.preference = value ? 'dark' : 'light'
  }
})
</script>

<template>
  <div class="flex items-center">
    <Button variant="ghost" size="icon" @click="isDark = !isDark">
      <Moon v-if="isDark" />
      <Sun v-else />
    </Button>
  </div>
</template>
