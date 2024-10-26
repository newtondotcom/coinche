<script lang="ts" setup>
    import { maxCardWidth } from '@/lib/constants';
    import { cn } from '@/lib/utils';

    interface Props {
        suite: CardSuite;
        value: CardValue;
        classStr?: string;
        pressed?: (suite: CardSuite, value: CardValue) => void;
        inDeck: boolean;
        canBePlayed: boolean;
    }

    const props = defineProps<Props>();
    const classStr = ref(props.classStr || '');
    const svgFolder = '/cards';

    const cardSvgPath = computed(() => {
        return `${svgFolder}/${props.value === '10' ? 'T' : props.value}${props.suite.charAt(0).toUpperCase()}.svg`;
    });
</script>

<template>
    <div :class="cn(['card', classStr])">
        <img
            :src="cardSvgPath"
            :alt="`${props.value} of ${props.suite} card.`"
            :style="`max-width:${maxCardWidth}px; height: auto;`"
            :class="
                cn(
                    inDeck && canBePlayed ? 'cursor-pointer' : '',
                    inDeck && !canBePlayed ? 'cursor-wait' : '',
                    inDeck ? 'hover:scale-125 transition-transform' : 'cursor-auto',
                )
            "
            @click="pressed && canBePlayed ? pressed(props.suite, props.value) : () => {}"
        />
    </div>
</template>
