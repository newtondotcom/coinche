<template>
    <Sheet>
        <SheetTrigger>Sound</SheetTrigger>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                    This action cannot be undone. This will permanently delete your account and
                    remove your data from our servers.
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
    </Sheet>
</template>

<script setup lang="ts">
    import { Howl, Howler } from 'howler';

    // sounds/mario.mp3
    // sounds/combien.mp3
    // sounds/porte.mp3
</script>
