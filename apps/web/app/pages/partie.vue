<template>
  <div>
    <CoincheInterfaceDebug />
    <CoincheDeck />

    <OthersSoundboard />

    <CoincheRiver />

    <CoincheInterfaceBiddings v-if="storeAbout.timeTobidding" />

    <div
      v-if="storePlayers.players.length == 4"
      class="flex flex-row justify-between"
    >
      <CoincheInterfacePoints />
      <CoincheInterfaceTurn />
    </div>

    <CoincheInterfaceSavedBidding v-if="storeGame.last_bidding.suite != 'NA'" />

    <CoincheInterfaceJoin v-if="storePlayers.players.length < 4" />
    
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "@/composables/useAuth";
import { useTurnNotifications } from "@/composables/useTurnNotifications";
import { join, leave } from "@/shared/emitter/join";
import { isDevEnv } from "@/shared/utils/miscs";
import { getWS, onWSMessage, sendWS, closeWS } from "@/shared/utils/ws";
import { useGameStore } from "@/stores/game";
import { CHANGE_TYPE_STATE, WSPayload } from "@coinche/shared";

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

storeAbout.setMyId(id);
storeAbout.setGameId(gameId);

// Store cleanup function for WebSocket listener
let cleanupListener: (() => void) | null = null;

onMounted(async () => {
  // Reset loading state for player list
  storePlayers.resetLoadingState();
  
  // Connect to WebSocket and set up listener
  getWS();
  
  // Set up message listener with cleanup function
  cleanupListener = onWSMessage((payload : WSPayload) => {
    console.log('Received WebSocket payload:', payload);
    
    if (payload.changeType === CHANGE_TYPE_STATE) {
      const gameStore = useGameStore();
      gameStore.setGameState(payload.state);
    } else {
      //console.warn("Event not for current game room:", event.gameId, "expected:", gameId);
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
    window.onbeforeunload = (event: BeforeUnloadEvent) => {
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
