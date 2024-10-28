<template>
    <CoincheDeck :pressed="cardPressed" />
    <CoincheRiver :pli="pli" />
    <CoincheInterfaceAnnonces
        v-if="timeToAnnonce"
        :annonceActuelle="annonceActuelle"
        :emitAnnonce="emitAnnonce"
    />

    <div class="flex flex-row justify-between">
        <div class="flex flex-col">
            <CoincheInterfaceSavedAnnonce />
            <CoincheInterfacePoints />
        </div>

        <CoincheInterfaceTurn />
    </div>
</template>

<script setup lang="ts">
    const storeGame = useGameStore();
    const storePlayers = usePlayersStore();
    const storeAbout = useAboutStore();
    const route = useRoute();
    const id = route.query.id as string;
    const surname = route.query.surname as string;
    storeAbout.setMyId(id);
    storeAbout.setMySurname(surname);

    let pli: ICard[] = storeGame.game.current_pli;

    let annonceActuelle = ref<IAnnonce>({ annonce: 0, suite: 'NA', playerId: 'NA' });

    let atout = ref<CardSuite>('spades');
    watch(atout, () => {});

    let turn = ref<boolean>(true);
    watch(turn, () => {});

    let timeToAnnonce = ref<boolean>(false);

    async function cardPressed(suite: CardSuite, value: CardValue) {
        const selectedCardIndex = storeAbout.hand.findIndex(
            (card) => card.suite === suite && card.value === value,
        );
        if (selectedCardIndex !== -1) {
            const [selectedCard] = storeAbout.hand.splice(selectedCardIndex, 1);
            pli = [...pli, selectedCard]; // Add the selected card to `pli`
        }
        storeAbout.hand = storeAbout.hand.filter(
            (card: ICard) => card.suite !== suite || card.value !== value,
        );

        console.log('Atout : ', atout.value);
        console.log('has atout : ', storeAbout.hasAtout);
        console.log('color Asked : ', storeAbout.colorAsked);
        console.log('atoutIsAsked  : ', storeAbout.atoutIsAsked);
        console.log('hasAskedColor : ', storeAbout.hasAskedColor);
        console.log('highestAtoutInPli : ', storeAbout.highestAtoutInPli);
    }

    async function emitAnnonce(ann: IAnnonce) {
        annonceActuelle.value = ann;
        console.log('Annonce faite : ', annonceActuelle.value.annonce);
    }
</script>
