<template>
    <div class="flex flex-row">
        <OthersUserDropdown v-if="session?.data?.user" />
        <Button v-else variant="outline" @click="onSignIn">
            <img
                src="https://git.inpt.fr/inp-net/visual-identity/-/raw/main/derivations/auth.svg"
            />
            Connexion avec INP-net
        </Button>
    </div>
</template>

<script setup lang="ts">
    const {$authClient} = useNuxtApp()
    const session = $authClient.useSession()

    async function onSignIn() {
        await $authClient.signIn.oauth2({
            providerId: "churros",
            callbackURL: "/regles"
        }, {
            onSuccess: () => {
                console.log("Success");
            },
            onError: (error) => {
                console.log("Error", error);
            }
        });
    }

</script>
