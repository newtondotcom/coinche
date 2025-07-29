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
import { createClient } from "@supabase/supabase-js";
import { isDevEnv } from "@/shared/utils/miscs";
import type { EventInsert } from "@coinche/shared";
const { loggedIn} = useAuth();

const config = useRuntimeConfig();

const storeGame = useGameStore();
const storePlayers = usePlayersStore();
const storeAbout = useAboutStore();
const route = useRoute();
const id = route.query.id as string;
const gameId = route.query.gameId as string;

// Check if loaded in an iframe
const isIframe = typeof window !== 'undefined' && window.self !== window.top;

if ((!id || !gameId) || (!isIframe && !loggedIn.value)) {
  navigateTo("/404");
}
storeAbout.setMyId(id);
storeAbout.setGameId(gameId);

onMounted(async () => {
  await startListening();
  join();
  
  // Initialize turn notifications for logged in users
  // if (loggedIn.value) {
    useTurnNotifications();
  // }
  
  if (!isDevEnv(config)) {
    window.onbeforeunload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      return "Are you sure you want to leave this page? Changes you made may not be saved.";
    };
  }
});

onBeforeUnmount(async () => {
  leave();
});

async function startListening() {
  const config = useRuntimeConfig();
  const supabase = createClient(
    config.public.SUPABASE_URL,
    config.public.SUPABASE_ANON_KEY,
  );

  const handleInserts = (payload: EventInsert) => {
    const event = payload.new as EventInsert;
    if (event.gameId == gameId) {
      translateEvent(event);
    }
  };

  supabase
    .channel(gameId)
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "Events" },
      handleInserts,
    )
    .subscribe();
}
</script>
