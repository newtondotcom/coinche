<template>
  <DropdownMenu>
    <DropdownMenuTrigger class="flex items-center gap-2">
        <User class="h-4 w-4" />
        {{ session.data?.user?.name || 'Utilisateur' }}
        <ChevronDown class="h-4 w-4" />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem @click="toggleMute" class="flex items-center gap-2">
        <component :is="soundMuted ? VolumeX : Volume2" class="h-4 w-4" />
        {{ soundMuted ? 'Activer le son' : 'Désactiver le son' }}
      </DropdownMenuItem>
      <DropdownMenuItem @click="toggleNotifications" class="flex items-center gap-2">
        <component :is="notificationsMuted ? BellOff : Bell" class="h-4 w-4" />
        {{ notificationsMuted ? 'Activer les notifications' : 'Désactiver les notifications' }}
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="handleSignOut" class="flex items-center gap-2 text-red-600">
        <LogOut class="h-4 w-4" />
        Déconnexion
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { User, ChevronDown, LogOut, Volume2, VolumeX, Bell, BellOff } from 'lucide-vue-next';

const { $authClient } = useNuxtApp();
const session = $authClient.useSession();
const { soundMuted, notificationsMuted, toggleSoundMuted, toggleNotificationsMuted } = useSoundSettings();

function toggleMute() {
  toggleSoundMuted();
}

function toggleNotifications() {
  toggleNotificationsMuted();
}

async function handleSignOut() {
  await $authClient.signOut();
}
</script>