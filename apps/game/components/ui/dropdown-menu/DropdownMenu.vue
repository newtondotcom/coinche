<script setup lang="ts">
import { DropdownMenuRoot, type DropdownMenuRootProps } from 'radix-vue'

interface Props extends DropdownMenuRootProps {}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <DropdownMenuRoot v-bind="props">
    <slot />
  </DropdownMenuRoot>
</template>