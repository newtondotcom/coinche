<template></template>

<script setup lang="ts">
    import { useToast } from '@/components/ui/toast/use-toast';

    const { toast } = useToast();
    onMounted(() => {
        startListening();
    });

    async function startListening() {
        const response = await $fetch<ReadableStream>('/api/test', {
            responseType: 'stream',
        });
        const reader = response.pipeThrough(new TextDecoderStream()).getReader();
        toast({
            title: `Listening to stream`,
            description: `Listening to stream`,
        });

        // Read the chunk of data as we get it
        while (true) {
            const { value, done } = await reader.read();

            if (done) break;

            console.log('Received:', value);
        }
    }
</script>
