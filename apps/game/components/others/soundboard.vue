<template>
    <Sheet>
        <SheetTrigger class="absolute bottom-10 right-10">
            <AudioLines />
        </SheetTrigger>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>La meilleure soundboard</SheetTitle>
            </SheetHeader>
            <div class="flex flex-col justify-center items-center h-full">
                <Button
                    v-for="(sound, key) in mapSound"
                    :key="key"
                    variant="outline"
                    class="my-2"
                    @click="emitAndPlaySound(sound)"
                >
                    {{ sound }}
                </Button>
            </div>
        </SheetContent>
    </Sheet>
</template>

<script setup lang="ts">
    import { emitSound } from '@/shared/emitter/sound';
    import { triggerSound } from '@/shared/listener/sound';
    import { AudioLines } from 'lucide-vue-next';

    const mapSound = {
        mario: 'Waaaaaa',
        combien: 'Combien',
        porte: 'Porte',
    };

    async function emitAndPlaySound(name: string) {
        triggerSound(name);
        await emitSound(name);
    }
</script>
