<template>
  <div>
    <CoincheInterfaceDebug />
    <CoincheDeck />

    <OthersSoundboard />

    <CoincheRiver />

    <CoincheInterfaceBiddings v-if="storeState.timeToBidding" />

    <div
      v-if="storeState.players.length == 4"
      class="flex flex-row justify-between"
    >
      <CoincheInterfacePoints />
      <CoincheInterfaceTurn />
    </div>

    <CoincheInterfaceSavedBidding v-if="storeState.biddingElected.suite != 'NA'" />

    <CoincheInterfaceJoin v-if="storeState.players.length < 4" />
    
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "@/composables/useAuth";
import { useTurnNotifications } from "@/composables/useTurnNotifications";
import { join, leave } from "@/shared/emitter/join";
import { isDevEnv } from "@/shared/utils/miscs";
import { getWS, onWSMessage, sendWS, closeWS } from "@/shared/utils/ws";
import { CHANGE_TYPE_STATE} from "@coinche/shared";
import type { WSPayload } from "@coinche/shared";
import { useStateStore } from '@/stores/state';
const storeState = useStateStore();    

const { loggedIn } = useAuth();
const route = useRoute();
const config = useRuntimeConfig();

const id = route.query.id as string;
const gameId = route.query.gameId as string;

// Check if loaded in an iframe
const isIframe = typeof window !== 'undefined' && window.self !== window.top;

if ((!id || !gameId) || (!isIframe && !loggedIn.value)) {
  navigateTo("/404");
}


// Store cleanup function for WebSocket listener
let cleanupListener: (() => void) | null = null;

onMounted(async () => {
  storeState.setMyId(id); 
  storeState.setGameId(gameId);
  // Reset loading state for player list
  storeState.setLoadingState(false);
  
  // Connect to WebSocket and set up listener
  getWS();
  
  // Set up message listener with cleanup function
  cleanupListener = onWSMessage((event : WSPayload) => {
    console.log('Received WebSocket event:', event.changeType);

    if (event.changeType === CHANGE_TYPE_STATE) {
      // Update game state
      storeState.setState(event.state);
    } else {
      console.warn('Unhandled WebSocket event type:', event.changeType);
    }
  });

  // Send join event
  try {
    join();
  } catch (error) {
    console.error('Failed to join game:', error);
  }
  
  // Initialize turn notifications for logged in users
  // if (loggedIn.value) {
  useTurnNotifications();
  // }

  // Set up beforeunload handler for non-dev environments
  if (!isDevEnv(config)) {
    window.onbeforeunload = (event) => {
      event.preventDefault();
      return "Are you sure you want to leave this page? Changes you made may not be saved.";
    };
  }
});

onBeforeUnmount(async () => {
  try {
    // Send leave event
    sendWS({ type: "leave_game", gameId });
    leave();
  } catch (error) {
    console.error('Failed to send leave event:', error);
  }
  
  // Clean up WebSocket listener
  if (cleanupListener) {
    cleanupListener();
    cleanupListener = null;
  }
  
  // Remove beforeunload handler
  if (!isDevEnv(config)) {
    window.onbeforeunload = null;
  }
});

// Clean up on route change as well
onBeforeRouteLeave(() => {
  if (cleanupListener) {
    cleanupListener();
    cleanupListener = null;
  }
});
</script>
