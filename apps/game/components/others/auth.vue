<template>
    <div class="flex flex-row">
            <Button v-if="!loggedIn" variant="secondary" @click="SignIn">
                <img
                    src="https://git.inpt.fr/inp-net/visual-identity/-/raw/main/derivations/auth.svg"
                />
                Connexion avec INP-net
            </Button>
        <Button v-else @click="SignOut">Déconnexion</Button>
    </div>
</template>

<script setup lang="ts">
    const {signIn, loggedIn, signOut } = useAuth()

    async function SignIn(){
        await signIn.social({
            provider: "churros",
            callbackURL :"/regles"
        });
    }

    async function SignOut(){
        await signOut();
    }
</script>
