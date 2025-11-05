<template>
  <div class="fixed top-4 right-4 z-50" aria-live="polite">
    <div
      class="relative flex h-4 w-4 items-center justify-center"
      :title="isConnected ? 'Connected to the game' : 'Disconnected from the game'"
      :aria-label="isConnected ? 'Game connection active' : 'Game connection lost'"
      role="status"
    >
      <span
        class="absolute inline-flex h-3 w-3 rounded-full opacity-75 transition-colors duration-300 animate-ping"
        :class="isConnected ? 'bg-green-400' : 'bg-red-400'"
      />
      <span
        class="relative inline-flex h-3 w-3 rounded-full transition-colors duration-300"
        :class="isConnected ? 'bg-green-500' : 'bg-red-500'"
      />
    </div>
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
