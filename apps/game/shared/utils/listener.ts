import { translateDealing } from '@/shared/listener/distribution';
import translatePlay from '@/shared/listener/play';
import translateBid from '@/shared/listener/bidding';
import { translateEndRound } from "@/shared/listener/end_round";
import { translateCanBid } from "@/shared/listener/can_bid";
import { translateCanPlay } from "@/shared/listener/can_play";
import { translateJoin } from "@/shared/listener/join";
import { translateStartDealing } from "@/shared/listener/start_dealing";
import { translateScore } from "@/shared/listener/score";
import { translateStartTrick } from "@/shared/listener/start_trick";
import { translateWinTrick } from "@/shared/listener/win_trick";
import type { EventInsert } from '@coinche/shared';

export const onWSMessage = (callback: (event: EventInsert) => void) => {
    const { $supabase } = useNuxtApp();
    const storeAbout = useAboutStore();
    
    const channel = $supabase
        .channel('events')
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'Events',
                filter: `gameId=eq.${storeAbout.gameId}`,
            },
            async (payload) => {
                const event = payload.new as EventInsert;
                callback(event);
                console.log('Event received:', event);
                
                switch (event.type) {
                    case 'join':
                        await translateJoin(event);
                        break;
                    case 'start_distribution':
                        await translateStartDealing(event);
                        break;
                    case 'distribution':
                        await translateDealing(event);
                        break;
                    case 'can_bid':
                        await translateCanBid(event);
                        break;
                    case 'bid':
                        await translateBid(event);
                        break;
                    case 'can_play':
                        await translateCanPlay(event);
                        break;
                    case 'start_trick':
                        await translateStartTrick(event);
                        break;
                    case 'play':
                        await translatePlay(event);
                        break;
                    case 'win_trick':
                        await translateWinTrick(event);
                        break;
                    case 'score':
                        await translateScore(event);
                        break;
                    case 'score_round':
                        await translateScore(event);
                        break;
                    case 'end_round':
                        await translateEndRound(event);
                        break;
                    default:
                        console.warn('Unknown event type:', event.type);
                }
            }
        )
        .subscribe();

    return () => {
        channel.unsubscribe();
    };
};

export const supabase = useSupabaseClient();
