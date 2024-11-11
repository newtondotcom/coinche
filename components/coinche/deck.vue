<template>
    <div
        class="flex flex-row absolute bottom-0 justify-center w-full"
        v-if="storeAbout.hand.length > 0"
    >
        <Card
            v-for="card in storeAbout.hand"
            :key="card.value + card.suite"
            :card="card"
            :inDeck="true"
        />
    </div>
</template>

<script setup lang="ts">
    import Card from '@/components/coinche/card.vue';

    const storeAbout = useAboutStore();
</script>
