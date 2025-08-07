<template>
  <div class="fixed top-4 right-[50vw] z-50">
    <div 
      class="w-3 h-3 rounded-full transition-colors duration-300"
      :class="isConnected ? 'bg-green-500' : 'bg-red-500'"
      :title="isConnected ? 'Connected' : 'Disconnected'"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { getConnectionStatus, onConnectionChange } from '@/shared/utils/ws';

const isConnected = ref(false);

// Store cleanup function for connection listener
let cleanupConnectionListener: (() => void) | null = null;

onMounted(() => {
  // Initial check
  isConnected.value = getConnectionStatus();
  
  // Set up connection change listener
  cleanupConnectionListener = onConnectionChange((connected) => {
    isConnected.value = connected;
  });
});

onUnmounted(() => {
  if (cleanupConnectionListener) {
    cleanupConnectionListener();
    cleanupConnectionListener = null;
  }
});
</script>
