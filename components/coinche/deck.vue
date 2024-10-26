<script setup lang="ts">
    import Card from "@/components/coinche/card.vue";
    interface Props {
    }
const props = defineProps<Props>();
    const hand: IPlayCard[] = defineModel('hand');

async function cardPressed (suite : CardSuite, value : CardValue){
    console.log("Card pressed", suite, value);
}
</script>

<template>
<div class="flex flex-row absolute bottom-0 justify-center w-full">
    <Card v-for="card in hand" 
    :suite="card.suite" 
    :value="card.value" 
    :pressed="cardPressed"
    />
</div>
</template>