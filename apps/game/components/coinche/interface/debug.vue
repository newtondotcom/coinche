<template>
  <div class="flex flex-col gap-2 border border-white p-4">
    Trick number : {{ storeGame.trick_number }}
    <br />
    Current player id : {{ storeGame.current_player_id }}
    <br />
    My id : {{ storeAbout.myId }}
    <br />
    team1_score : {{ storeGame.team1_score }}
    <br />
    team2_score : {{ storeGame.team2_score }}
    <br />
    <!-- ... rest of the template ... -->
  </div>
</template>

<script setup lang="ts">
const storeGame = useGameStore();
const storeAbout = useAboutStore();
</script>
