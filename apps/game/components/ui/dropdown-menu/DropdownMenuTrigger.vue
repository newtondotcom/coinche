<script setup lang="ts">
import { DropdownMenuTrigger, type DropdownMenuTriggerProps } from 'radix-vue'
import { cn } from '@/lib/utils'

interface Props extends DropdownMenuTriggerProps {
  class?: string
}

const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <DropdownMenuTrigger
    v-bind="props"
    :class="cn('outline-none', props.class)"
  >
    <slot />
  </DropdownMenuTrigger>
</template>