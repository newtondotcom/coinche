import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useStateStore } from './state';

export const usePlayersStore = defineStore('players', () => {
    const state = useStateStore();

    const players = computed(() => state.players);
    const team1 = computed(() => players.value.filter((p) => p.position === 0 || p.position === 2));
    const team2 = computed(() => players.value.filter((p) => p.position === 1 || p.position === 3));
    const isLoadingPlayerList = ref<boolean>(true);

    
    function resetLoadingState() {
        isLoadingPlayerList.value = true;
    }

    return {
      players,
      team1,
      team2,
      resetLoadingState
    };
});
