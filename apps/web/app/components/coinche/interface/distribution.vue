<template>
    <div
        v-if="storeAbout.timeDistrib"
        class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
    >
        <Card>
            <CardHeader>
                <CardTitle>Distribution</CardTitle>
                <CardDescription>en cours</CardDescription>
            </CardHeader>
            <CardContent>
                <div
                    class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-neutral-200"
                />
            </CardContent>
        </Card>
    </div>
</template>

<script setup lang="ts">
    const storeAbout = useAboutStore();
</script>
