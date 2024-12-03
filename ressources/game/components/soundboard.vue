<template>
    <Sheet>
        <SheetTrigger class="absolute bottom-10 right-10"><AudioLines /></SheetTrigger>
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
                    @click="triggerSound(sound)"
                >
                    {{ sound }}
                </Button>
            </div>
        </SheetContent>
    </Sheet>
</template>

<script setup lang="ts">
    import { Howl } from 'howler';
    import { AudioLines } from 'lucide-vue-next';

    const mapSound = {
        mario: 'Waaaaaa',
        combien: 'Combien',
        porte: 'Porte',
    };

    function triggerSound(name: string): void {
        const sound = new Howl({
            src: `sounds/${name.toLowerCase()}.mp3`,
        });
        sound.play();
    }
</script>
