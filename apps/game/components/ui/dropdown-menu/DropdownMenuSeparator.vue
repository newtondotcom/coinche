<script setup lang="ts">
import { DropdownMenuSeparator, type DropdownMenuSeparatorProps } from 'radix-vue'
import { cn } from '@/lib/utils'

interface Props extends DropdownMenuSeparatorProps {
  class?: string
}

const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <DropdownMenuSeparator
    :class="cn('-mx-1 my-1 h-px bg-muted', props.class)"
    v-bind="props"
  />
</template>