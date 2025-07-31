<template>
    <div class="flex flex-row">
            <Button v-if="!loggedIn" variant="secondary" @click="SignIn">
                <img
                    src="https://git.inpt.fr/inp-net/visual-identity/-/raw/main/derivations/auth.svg"
                />
                Connexion avec INP-net
            </Button>
            <OthersUserDropdown v-else />
    </div>
</template>

<script setup lang="ts">
    const { signIn, loggedIn } = useAuth();

    async function SignIn() {
        console.log("SignIn");  
        await signIn.social({
            provider: "churros",
            callbackURL :"/regles"
        });
        console.log("SignIn");  
    }
</script>
