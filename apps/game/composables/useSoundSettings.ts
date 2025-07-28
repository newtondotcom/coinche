export function useSoundSettings() {
  const SOUND_MUTED_KEY = 'coinche-sound-muted'
  
  // Initialize reactive state from localStorage
  const soundMuted = ref<boolean>(false)
  
  // Initialize from localStorage on client side
  onMounted(() => {
    if (process.client) {
      const stored = localStorage.getItem(SOUND_MUTED_KEY)
      soundMuted.value = stored === 'true'
    }
  })
  
  // Watch for changes and update localStorage
  watch(soundMuted, (newValue) => {
    if (process.client) {
      localStorage.setItem(SOUND_MUTED_KEY, String(newValue))
    }
  })
  
  const setSoundMuted = (value: boolean) => {
    soundMuted.value = value
  }
  
  const toggleSoundMuted = () => {
    soundMuted.value = !soundMuted.value
  }
  
  return {
    soundMuted: readonly(soundMuted),
    setSoundMuted,
    toggleSoundMuted,
  }
}