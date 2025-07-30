
export function useNotifications() {
  const { soundMuted, notificationsMuted } = useSoundSettings()
  
  // Track window focus state
  const isWindowFocused = ref<boolean>(true)
  
  // Track original document title
  const originalTitle = ref<string>('')
  
  // Initialize focus tracking on client side
  onMounted(() => {
    if (process.client) {
      originalTitle.value = document.title
      
      // Window focus/blur event listeners
      const handleFocus = () => {
        isWindowFocused.value = true
        clearNotificationBadge()
      }
      
      const handleBlur = () => {
        isWindowFocused.value = false
      }
      
      window.addEventListener('focus', handleFocus)
      window.addEventListener('blur', handleBlur)
      
      // Check initial focus state
      isWindowFocused.value = document.hasFocus()
      
      // Cleanup on unmount
      onUnmounted(() => {
        window.removeEventListener('focus', handleFocus)
        window.removeEventListener('blur', handleBlur)
        clearNotificationBadge()
      })
    }
  })
  
  // Play notification sound
  const playNotificationSound = (soundType: 'turn-to-play' | 'turn-to-bid') => {
    if (process.client && !soundMuted.value && !notificationsMuted.value && !isWindowFocused.value) {
      try {
        let soundFile = ''
        switch (soundType) {
          case 'turn-to-play':
            soundFile = '/sounds/mario.mp3' // Use existing mario sound for turn to play
            break
          case 'turn-to-bid':
            soundFile = '/sounds/porte.mp3' // Use existing porte sound for turn to bid
            break
        }
        
        const audio = new Audio(soundFile)
        audio.volume = 0.5 // Set moderate volume
        audio.play().catch(error => {
          console.warn('Could not play notification sound:', error)
        })
      } catch (error) {
        console.warn('Error playing notification sound:', error)
      }
    }
  }
  
  // Show notification badge in document title
  const showNotificationBadge = (message: string) => {
    if (process.client && !notificationsMuted.value && !isWindowFocused.value) {
      document.title = `🔔 ${message} - ${originalTitle.value}`
    }
  }
  
  // Clear notification badge from document title
  const clearNotificationBadge = () => {
    if (process.client && originalTitle.value) {
      document.title = originalTitle.value
    }
  }
  
  // Main notification function
  const showTurnNotification = (notificationType: 'turn-to-play' | 'turn-to-bid') => {
    if (!isWindowFocused.value) {
      // Play sound notification
      playNotificationSound(notificationType)
      
      // Show badge notification
      const message = notificationType === 'turn-to-play' ? 'Your turn to play!' : 'Your turn to bid!'
      showNotificationBadge(message)
    }
  }
  
  // Request notification permission (for future browser notifications)
  const requestNotificationPermission = async () => {
    if (process.client && 'Notification' in window) {
      try {
        const permission = await Notification.requestPermission()
        return permission === 'granted'
      } catch (error) {
        console.warn('Could not request notification permission:', error)
        return false
      }
    }
    return false
  }
  
  return {
    isWindowFocused: readonly(isWindowFocused),
    showTurnNotification,
    clearNotificationBadge,
    requestNotificationPermission,
    playNotificationSound,
    showNotificationBadge
  }
}