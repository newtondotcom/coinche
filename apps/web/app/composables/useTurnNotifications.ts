import { ref, watchEffect, readonly } from 'vue'
import { useGameStore } from '@/stores/game'
import { useAboutStore } from '@/stores/about'
import { useNotifications } from '@/composables/useNotifications'

export function useTurnNotifications() {
  const storeGame = useGameStore()
  const storeAbout = useAboutStore()
  const { showTurnNotification } = useNotifications()
  
  // Track previous states to detect changes
  const previousCurrentPlayerId = ref<string>('')
  const previousTurnToPlay = ref<boolean>(false)
  const previousTurnToAnnonce = ref<boolean>(false)
  
  // Watch for turn to play changes
  watchEffect(() => {
    const isMyTurn = storeGame.currentPlayerId === storeAbout.myId
    const turnToPlay = storeAbout.turnToPlay
    
    // Check if it's now my turn to play (and it wasn't before)
    if (isMyTurn && turnToPlay && (!previousTurnToPlay.value || previousCurrentPlayerId.value !== storeAbout.myId)) {
      showTurnNotification('turn-to-play')
    }
    
    // Update previous states
    previousCurrentPlayerId.value = storeGame.currentPlayerId
    previousTurnToPlay.value = turnToPlay
  })
  
  // Watch for turn to announce/bid changes
  watchEffect(() => {
    const turnTobidding = storeAbout.turnTobidding
    
    // Check if it's now my turn to announce (and it wasn't before)
    if (turnTobidding && !previousTurnToAnnonce.value) {
      showTurnNotification('turn-to-bid')
    }
    
    // Update previous state
    previousTurnToAnnonce.value = turnTobidding
  })
  
  return {
    // Expose for debugging if needed
    previousCurrentPlayerId: readonly(previousCurrentPlayerId),
    previousTurnToPlay: readonly(previousTurnToPlay),
    previousTurnToAnnonce: readonly(previousTurnToAnnonce)
  }
}