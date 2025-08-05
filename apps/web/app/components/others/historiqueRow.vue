<template>
    <div
        class="flex flex-row space-x-6 justify-center items-center border-2 px-4 py-2 rounded-lg my-2 w-[800px]"
        :class="playerWin ? 'bg-green-200' : 'bg-red-200'"
    >
        <div class="flex flex-col text-xl">
            <div class="font-semibold w-[300px]">{{ row.p1 }} & {{ row.p3 }}</div>
            <div class="font-semibold w-[300px]">{{ row.team1_score }}</div>
        </div>
        <div class="flex flex-col text-2xl font-bold text-red-500">VS</div>
        <div class="flex flex-col text-xl">
            <div class="font-semibold w-[300px]">{{ row.p2 }} & {{ row.p4 }}</div>
            <div class="font-semibold w-[300px]">{{ row.team2_score }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { HistoriqueRow } from '@coinche/shared';

    interface HistoriqueRowProps {
        row: HistoriqueRow;
    }
    const props = defineProps<HistoriqueRowProps>();

    const playerTeam1 = computed(() => {
        return props.row.p1 === storeState.myId || props.row.p3 === storeState.myId;
    });

    const team1Win = computed(() => {
        return props.row.team1_score > props.row.team2_score;
    });

    const playerWin = computed(() => {
        return (playerTeam1.value && team1Win.value) || (!playerTeam1.value && !team1Win.value);
    });
</script>
