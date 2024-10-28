<template>
    <CoincheDeck
        :hand="hand"
        :pressed="cardPressed"
        :atout="atout"
        :turn="turn"
        :colorAsked="colorAsked"
        :atoutIsAsked="atoutIsAsked"
        :highestAtoutInPli="highestAtoutInPli"
    />
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
    import { useToast } from '@/components/ui/toast/use-toast';
    import { generateRandomDeck } from '@/lib/utils/deck';

    const storeAbout = useAboutStore();
    const route = useRoute();
    const id = route.query.id as string;
    const surname = route.query.surname as string;
    storeAbout.setMyId(id);
    storeAbout.setMySurname(surname);

    const { toast } = useToast();

    let hand = ref<ICard[]>([]);
    let pli = ref<ICard[]>([]);

    let annonceActuelle = ref<IAnnonce>({ annonce: 0, suite: 'NA', playerId: 'NA' });

    let atout = ref<CardSuite>('spades');
    watch(atout, () => {});

    let turn = ref<boolean>(true);
    watch(turn, () => {});

    let timeToAnnonce = ref<boolean>(false);

    const colorAsked: ComputedRef<CardSuite | undefined> = computed(() =>
        pli.value.length > 0 ? pli.value[0].suite : undefined,
    );

    const hasAtout: ComputedRef<boolean> = computed(() =>
        hand.value.some((card) => card.suite === atout.value),
    );

    const hasAskedColor: ComputedRef<boolean> = computed(() =>
        hand.value.some((card) => card.suite === colorAsked.value),
    );

    const highestAtoutInPli: ComputedRef<number> = computed(() => {
        const atoutsInPli = pli.value.filter((c) => c.suite === atout.value);
        if (atoutsInPli.length === 0) return NaN;
        return atoutsInPli.sort((a, b) => b.valueNum - a.valueNum)[0].valueNum;
    });

    const atoutIsAsked = computed(() => colorAsked.value === atout.value);

    async function cardPressed(suite: CardSuite, value: CardValue) {
        const selectedCardIndex = hand.value.findIndex(
            (card) => card.suite === suite && card.value === value,
        );
        if (selectedCardIndex !== -1) {
            const [selectedCard] = hand.value.splice(selectedCardIndex, 1);
            pli.value = [...pli.value, selectedCard]; // Add the selected card to `pli`
        }
        hand.value = hand.value.filter((card) => card.suite !== suite || card.value !== value);

        console.log('Atout : ', atout.value);
        console.log('has atout : ', hasAtout.value);
        console.log('color Asked : ', colorAsked.value);
        console.log('atoutIsAsked  : ', atoutIsAsked.value);
        console.log('hasAskedColor : ', hasAskedColor.value);
        console.log('highestAtoutInPli : ', highestAtoutInPli.value);
    }

    async function emitAnnonce(ann: IAnnonce) {
        annonceActuelle.value = ann;
        console.log('Annonce faite : ', annonceActuelle.value.annonce);
    }
</script>
