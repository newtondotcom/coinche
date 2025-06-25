<template>
  <div>
    <!--<CoincheInterfaceDebug />-->
    <CoincheDeck />

    <OthersSoundboard />

    <CoincheRiver />

    <CoincheInterfaceAnnonces v-if="storeAbout.timeToAnnonce" />

    <div
      v-if="storePlayers.players.length == 4"
      class="flex flex-row justify-between"
    >
      <CoincheInterfacePoints />
      <CoincheInterfaceTurn />
    </div>

    <CoincheInterfaceSavedAnnonce v-if="storeGame.last_annonce.suite != 'NA'" />

    <CoincheInterfaceJoin v-if="storePlayers.players.length < 4" />
  </div>
</template>

<script setup lang="ts">
import { join, leave } from "@/shared/emitter/join";
import translateEvent from "@/shared/utils/listener";
import { isDevEnv } from "@/shared/utils/miscs";
import { getWS, onWSMessage, sendWS } from "@/lib/utils/ws";
const { loggedIn } = useAuth();

const storeGame = useGameStore();
const storePlayers = usePlayersStore();
const storeAbout = useAboutStore();
const route = useRoute();
const id = route.query.id as string;
const gameId = route.query.gameId as string;
const config = useRuntimeConfig();

// Check if loaded in an iframe
const isIframe = typeof window !== 'undefined' && window.self !== window.top;

if ((!id || !gameId) || (!isIframe && !loggedIn.value)) {
  navigateTo("/404");
}
storeAbout.setMyId(id);
storeAbout.setGameId(gameId);

onMounted(async () => {
  // Connect to WebSocket and listen for events
  getWS();
  onWSMessage((event) => {
    if (event.type === 'player_list' && event.gameId == gameId) {
      // Update the player store with the full player list
      // Assume storePlayers.setPlayers expects an array of player IDs
      // You may need to map to IPlayer objects if needed
      const buildPlayers = event.players.map((playerId: string, index: number) => ({
        id: playerId,
        position: index,
        hands: [],
        classement: 0,
      }));
      storePlayers.setPlayers(buildPlayers);
      return;
    }
    if (event.gameId == gameId) {
      translateEvent(event);
    }
  });
  // Send join event
  sendWS({ type: "join_game", gameId });
  join();
  if (!isDevEnv(config)) {
    window.onbeforeunload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      return "Are you sure you want to leave this page? Changes you made may not be saved.";
    };
  }
});

onBeforeUnmount(async () => {
  sendWS({ type: "leave_game", gameId });
  leave();
});
</script>
