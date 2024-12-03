<template>
    <div class="flex flex-row">
        <NuxtLink v-if="!storeAbout.authentificated" :to="link">
            <Button variant="secondary">
                <img
                    src="https://git.inpt.fr/inp-net/visual-identity/-/raw/main/derivations/auth.svg"
                />
                Connexion avec INP-net
            </Button>
        </NuxtLink>
        <Button v-else @click="logout">Déconnexion</Button>
        <Button @click="test">Test</Button>
    </div>
</template>

<script setup lang="ts">
    const storeAbout = useAboutStore();
    const link = ref<string>('');

    async function fetchLink() {
        const data = await $fetch('/api/churros/link');
        link.value = data.url;
    }
    fetchLink();

    async function test() {
        const data = await $fetch('/api/churros/info');
        console.log(data);
    }

    async function logout() {
        await $fetch('/api/churros/revoke', {
            method: 'POST',
        });
        storeAbout.setAuthentificated(false);
    }
</script>
