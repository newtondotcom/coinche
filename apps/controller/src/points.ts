import supabase from '@/supabase';
import type { PlayerId } from '@coinche/shared';

export async function addPointsTo(points: number, playerId: PlayerId): Promise<void> {
    // Fetch the current points for the player
    const { data, error } = await supabase
        .from('Points')
        .select('points')
        .eq('playerId', playerId)
        .single();

    // Handle the error if no data is found
    if (error || !data) {
        console.error('Error fetching points or no points data found for player', error);
        await supabase.from('Points').insert([{ playerId, points }]);
        return;
    }

    // Calculate the new points
    const newPoints = data.points + points;

    // Update the points in the database
    const { error: updateError } = await supabase
        .from('Points')
        .update({ points: newPoints })
        .eq('playerId', playerId);

    // Handle any error during the update
    if (updateError) {
        console.error('Error updating points', updateError);
    } else {
        console.log('Points updated successfully');
    }
}
