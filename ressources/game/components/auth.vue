<template>
    <div class="flex flex-row">
        <Button>Connexion avec Churros</Button>
        <Button>Déconnexion</Button>
    </div>
</template>

<script setup lang="ts">
    onMounted(async () => {
        const url = await $fetch('/api/churros/link');
        console.log(url);
    });
</script>
