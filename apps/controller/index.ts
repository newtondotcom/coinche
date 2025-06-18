import { translateEvent } from './src/listener';
import supabase from './src/supabase';

// delete all rows
await supabase.from('Events').delete().eq('gameId', '0');

const handleInserts = (payload: any) => {
    translateEvent(payload.new);
};

const gameId = '0';
supabase
    .channel(gameId)
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'Events' }, handleInserts)
    .subscribe();

console.log('Listening for changes in game', gameId);
