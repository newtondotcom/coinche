<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="secondary" class="flex items-center gap-2">
        <User class="h-4 w-4" />
        {{ user?.name || 'Utilisateur' }}
        <ChevronDown class="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="toggleMute" class="flex items-center gap-2">
        <component :is="soundMuted ? VolumeX : Volume2" class="h-4 w-4" />
        {{ soundMuted ? 'Activer le son' : 'Désactiver le son' }}
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
import { User, ChevronDown, LogOut, Volume2, VolumeX } from 'lucide-vue-next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const { user, signOut } = useAuth();
const { soundMuted, toggleSoundMuted } = useSoundSettings();

function toggleMute() {
  toggleSoundMuted();
}

async function handleSignOut() {
  await signOut();
}
</script>