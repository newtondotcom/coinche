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
    const isMyTurn = storeGame.current_player_id === storeAbout.myId
    const turnToPlay = storeAbout.turnToPlay
    
    // Check if it's now my turn to play (and it wasn't before)
    if (isMyTurn && turnToPlay && (!previousTurnToPlay.value || previousCurrentPlayerId.value !== storeAbout.myId)) {
      showTurnNotification('turn-to-play')
    }
    
    // Update previous states
    previousCurrentPlayerId.value = storeGame.current_player_id
    previousTurnToPlay.value = turnToPlay
  })
  
  // Watch for turn to announce/bid changes
  watchEffect(() => {
    const turnToAnnonce = storeAbout.turnToAnnonce
    
    // Check if it's now my turn to announce (and it wasn't before)
    if (turnToAnnonce && !previousTurnToAnnonce.value) {
      showTurnNotification('turn-to-bid')
    }
    
    // Update previous state
    previousTurnToAnnonce.value = turnToAnnonce
  })
  
  return {
    // Expose for debugging if needed
    previousCurrentPlayerId: readonly(previousCurrentPlayerId),
    previousTurnToPlay: readonly(previousTurnToPlay),
    previousTurnToAnnonce: readonly(previousTurnToAnnonce)
  }
}