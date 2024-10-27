<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <Card>
            <CardHeader>
                <CardTitle>Annonces</CardTitle>
                <CardDescription>Annonce actuelle : 100 coeur</CardDescription>
            </CardHeader>
            <CardContent>
                <div class="flex flex-row align-middle justify-center">
                    <div class="grid grid-cols-4 gap-4">
                        <div
                            v-for="annonce in annonces"
                            class="w-full h-full rounded-md border-gray-500 px-5 py-2.5 shadow-sm sm:text-sm place-content-center items-center text-black"
                        >
                            {{ annonce }}
                        </div>
                    </div>
                    <div class="grid-cols-4 gap-4">
                        <div
                            v-for="annonce in suites"
                            class="w-full rounded-md border-gray-500 px-5 py-2.5 shadow-sm sm:text-sm place-content-center items-center text-black"
                        >
                            {{ annonce }}
                        </div>
                    </div>

                    <div class="flex flex-col">
                        <div>Annonce actuelle : 100 coeur</div>
                        <button
                            class="flex rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow text-center"
                            @click="{()"
                            =""
                        >
                            joinParty()} > Passer
                        </button>
                        <button
                            class="flex rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow text-center"
                            @click="{()"
                            =""
                        >
                            joinParty()} > Coincher
                        </button>
                    </div>
                </div>
            </CardContent>
            <CardFooter class="flex justify-between px-6 pb-6">
                <Button variant="outline">Cancel</Button>
            </CardFooter>
        </Card>
    </div>
</template>

<script setup lang="ts">
    let annonces = [80, 90, 100, 110, 120, 130, 140, 150, 160];
    let suites = ['♠️', '♥️', '♦️', '♣️'];
</script>
