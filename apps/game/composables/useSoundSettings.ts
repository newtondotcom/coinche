export function useSoundSettings() {
  const SOUND_MUTED_KEY = 'coinche-sound-muted'
  const NOTIFICATIONS_MUTED_KEY = 'coinche-notifications-muted'
  
  // Initialize reactive state from localStorage
  const soundMuted = ref<boolean>(false)
  const notificationsMuted = ref<boolean>(false)
  
  // Initialize from localStorage on client side
  onMounted(() => {
    if (process.client) {
      const stored = localStorage.getItem(SOUND_MUTED_KEY)
      soundMuted.value = stored === 'true'
      
      const storedNotifications = localStorage.getItem(NOTIFICATIONS_MUTED_KEY)
      notificationsMuted.value = storedNotifications === 'true'
    }
  })
  
  // Watch for changes and update localStorage
  watch(soundMuted, (newValue) => {
    if (process.client) {
      localStorage.setItem(SOUND_MUTED_KEY, String(newValue))
    }
  })
  
  watch(notificationsMuted, (newValue) => {
    if (process.client) {
      localStorage.setItem(NOTIFICATIONS_MUTED_KEY, String(newValue))
    }
  })
  
  const setSoundMuted = (value: boolean) => {
    soundMuted.value = value
  }
  
  const toggleSoundMuted = () => {
    soundMuted.value = !soundMuted.value
  }
  
  const setNotificationsMuted = (value: boolean) => {
    notificationsMuted.value = value
  }
  
  const toggleNotificationsMuted = () => {
    notificationsMuted.value = !notificationsMuted.value
  }
  
  return {
    soundMuted: readonly(soundMuted),
    notificationsMuted: readonly(notificationsMuted),
    setSoundMuted,
    toggleSoundMuted,
    setNotificationsMuted,
    toggleNotificationsMuted,
  }
}