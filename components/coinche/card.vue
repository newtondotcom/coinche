<script lang="ts" setup>
    import { maxCardWidth } from '@/lib/constants';
    import { spaceJoin } from '@/lib/utils/cards';

    interface Props {
        suite: CardSuite;
        value: CardValue;
        classStr?: string;
        pressed?: (suite: CardSuite, value: CardValue) => void;
    }

    const props = defineProps<Props>();
    const classStr = ref(props.classStr || '');
    const svgFolder = '/cards';

    const cardSvgPath = computed(() => {
        return `${svgFolder}/${props.value === '10' ? 'T' : props.value}${props.suite.charAt(0).toUpperCase()}.svg`;
    });
</script>

<template>
    <div :class="spaceJoin(['card', classStr])">
        <img
            :src="cardSvgPath"
            :alt="`${props.value} of ${props.suite} card.`"
            :style="`max-width:${maxCardWidth}px; height: auto;`"
            class="hover:scale-125 transition-transform"
            @click="pressed ? pressed(props.suite, props.value) : () => {}"
        />
    </div>
</template>
