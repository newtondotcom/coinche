<template>
  <div v-show="storeAbout.turnTobidding" class="grid grid-cols-1 gap-2">
    <div
      class="border border-white bg-slate-800 rounded p-2 h-[50px] flex gap-2"
    >
      {{ storeGame.last_bid.bidding }}
      {{ storeGame.last_bid.suite == 'diamonds' ? '♦️' : '' }}
      {{ storeGame.last_bid.suite == 'hearts' ? '♥️' : '' }}
      {{ storeGame.last_bid.suite == 'clubs' ? '♣️' : '' }}
      {{ storeGame.last_bid.suite == 'spades' ? '♠️' : '' }}
      {{ storeGame.last_bid.suite == 'tout-atout' ? 'TA' : '' }}
      {{ storeGame.last_bid.suite == 'sans-atout' ? 'SA' : '' }}
      par
      {{ storeGame.last_bid.playerId }}
    </div>

    <!-- bidding buttons -->
    <div class="grid grid-cols-5 gap-2">
      <div
        class="border border-white bg-blue-900 hover:bg-blue-700 cursor-pointer hover:scale-105 transition-all rounded p-2 h-[50px] flex justify-center items-center"
        @click="pass"
      >
        Passe
      </div>
      <div
        v-for="bid in availableBids"
        :key="bid"
        class="border border-white bg-blue-900 hover:bg-blue-700 cursor-pointer hover:scale-105 transition-all rounded p-2 h-[50px] flex justify-center items-center"
        @click="setBidding(bid)"
      >
        {{ bid }}
      </div>
    </div>

    <!-- suites picker -->
    <div
      v-show="biddingEnCours.bidding != 0"
      class="grid grid-cols-3 gap-2"
    >
      <div
        v-for="suite in availableSuites"
        :key="suite"
        class="border border-white bg-blue-900 hover:bg-blue-700 cursor-pointer hover:scale-105 transition-all rounded p-2 h-[50px] flex justify-center items-center"
        @click="setSuite(suite)"
      >
        {{ formatSuite(suite) }}
      </div>
    </div>

    <!-- coinche/surcoinche buttons -->
    <div class="grid grid-cols-2 gap-2">
      <div
        v-show="canCoincheBid(storeGame.bids_round)"
        class="border border-white bg-red-900 hover:bg-red-700 cursor-pointer hover:scale-105 transition-all rounded p-2 h-[50px] flex justify-center items-center"
        @click="coinche"
      >
        Coinche
      </div>
      <div
        v-show="canSurcoincheBid(storeGame.bids_round)"
        class="border border-white bg-red-900 hover:bg-red-700 cursor-pointer hover:scale-105 transition-all rounded p-2 h-[50px] flex justify-center items-center"
        @click="surcoinche"
      >
        Surcoinche
      </div>
    </div>

    <!-- confirm button -->
    <div
      v-show="biddingEnCours.bidding != 0 && biddingEnCours.suite != 'NA'"
      class="border border-white bg-green-900 hover:bg-green-700 cursor-pointer hover:scale-105 transition-all rounded p-2 h-[50px] flex justify-center items-center"
      @click="confirm"
    >
      Valider {{ biddingEnCours.bidding }} {{ formatSuite(biddingEnCours.suite) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { bidding, CardSuite, IBid, IPlayer } from '@coinche/shared';
import emitBid from '~/shared/emitter/bidding';

const storeGame = useGameStore();
const storeAbout = useAboutStore();
const storePlayers = usePlayersStore();

const availableBids = ref<bidding[]>([80, 90, 100, 110, 120, 130, 140, 150, 160]);

const availableSuites = ref<CardSuite[]>([
  'diamonds',
  'clubs',
  'hearts',
  'spades',
  'tout-atout',
  'sans-atout',
]);

const canPass = computed(() =>
  storeGame.bids_round.slice(0, 3).every((bid: IBid) => bid.bidding === 0),
);

const biddingEnCours = ref<IBid>({ bidding: 0, suite: 'NA', playerId: storeAbout.myId });

function pass() {
  const bid = { bidding: 0, suite: 'NA', playerId: storeAbout.myId } as IBid;
  emitBid(bid);
}

function canCoincheBid(bids: IBid[]) {
  const myPlayer = storePlayers.getPlayer(storeAbout.myId);
  if (!myPlayer) return false;
  
  const isMyTeam = (playerId: string) => {
    const player = storePlayers.getPlayer(playerId);
    return player && (player.position + myPlayer.position) % 2 === 0;
  };

  const announceDiffThanPass = bids.filter((bid: IBid) => bid.bidding !== 0);
  
  if (announceDiffThanPass.length === 0) return false;
  
  const lastValidBid = announceDiffThanPass[announceDiffThanPass.length - 1];
  
  return !isMyTeam(lastValidBid.playerId) && 
         !storeGame.coinched && 
         !storeGame.surcoinched;
}

function setBidding(bid: bidding) {
  if (canBid(bid)) {
    biddingEnCours.value.bidding = bid;
  }
}

function canSurcoincheBid(bids: IBid[]) {
  const myPlayer = storePlayers.getPlayer(storeAbout.myId);
  if (!myPlayer) return false;
  
  const isMyTeam = (playerId: string) => {
    const player = storePlayers.getPlayer(playerId);
    return player && (player.position + myPlayer.position) % 2 === 0;
  };

  const announceDiffThanPass = bids.filter((bid: IBid) => bid.bidding !== 0);
  
  if (announceDiffThanPass.length === 0) return false;
  
  const lastValidBid = announceDiffThanPass[announceDiffThanPass.length - 1];
  
  return isMyTeam(lastValidBid.playerId) && 
         storeGame.coinched && 
         !storeGame.surcoinched;
}

function setSuite(suite: CardSuite) {
  biddingEnCours.value.suite = suite;
}

function canBid(bid: bidding): boolean {
  return !(storeGame.last_bid.bidding < bid);
}

function confirm() {
  emitBid(biddingEnCours.value);
  reset();
}

function coinche() {
  const lastBid = storeGame.last_bid.bidding;
  let coincheBid: bidding;
  
  if (lastBid >= 250 && lastBid <= 252) {
    coincheBid = (lastBid + 1) as bidding;
  } else if (lastBid >= 500 && lastBid <= 502) {
    coincheBid = (lastBid + 1) as bidding;
  } else {
    // Regular bids - use the coinche variants
    // and let the scoring logic handle the multiplier
    coincheBid = lastBid as bidding;
  }

  const bid: IBid = {
    bidding: coincheBid,
    suite: storeGame.last_bid.suite,
    playerId: storeAbout.myId,
  };
  
  emitBid(bid);
}

function surcoinche() {
  const lastBid = storeGame.last_bid.bidding;
  let surcoincheBid: bidding;
  
  if (lastBid >= 250 && lastBid <= 252) {
    surcoincheBid = (lastBid + 1) as bidding;
  } else if (lastBid >= 500 && lastBid <= 502) {
    surcoincheBid = (lastBid + 1) as bidding;
  } else {
    // For regular bids, track surcoinche state and let scoring logic handle the multiplier
    surcoincheBid = lastBid as bidding;
  }

  const bid: IBid = {
    bidding: surcoincheBid,
    suite: storeGame.last_bid.suite,
    playerId: storeAbout.myId,
  };
  
  emitBid(bid);
}

function reset() {
  biddingEnCours.value = { bidding: 0, suite: 'NA', playerId: storeAbout.myId };
}

function formatSuite(suite: CardSuite): string {
  switch (suite) {
    case 'diamonds': return '♦️';
    case 'hearts': return '♥️';
    case 'clubs': return '♣️';
    case 'spades': return '♠️';
    case 'tout-atout': return 'TA';
    case 'sans-atout': return 'SA';
    default: return '';
  }
}
</script>
