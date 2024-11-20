## Coinche / Contrée

This is an implementation of a web application for playing the French card game called Coinche / Contrée, which is played at my school, ENSEEIHT.

### Game Overview

Coinche / Contrée is a trick-taking card game that involves four players divided into two teams. The game uses a 32-card deck and follows specific rules regarding card play and scoring.

### Trump Suit

In Coinche, a trump suit (`atout`in french) is established at the beginning of the game, which beats all other suits. The trump suit is crucial because it can change the outcome of the tricks:

-   **Trump Cards**: Cards of the trump suit are stronger than cards of any other suit.
-   **Playing Trump Cards**: When a player plays a trump card, other players are obligated to play a higher trump card if they have one.

### Basic Rules

1. **Dealing Cards**: Each player is dealt a specific number of cards (usually 8), and the game proceeds in a clockwise manner.
2. **Bidding**: Before playing, players bid on the number of tricks their team can win, considering the strength of their hands and the trump suit.
3. **Playing Tricks**: Players take turns playing one card at a time, and the player who plays the highest card (following the rules of the current trick) wins the trick.
4. **Scoring**: Points are awarded based on the number of tricks won and the cards held in hand at the end of the game. The team that meets or exceeds their bid scores points, while failing to meet the bid can lead to penalties.

The game combines strategy and teamwork, making it an engaging experience for players.

### Technical choices

Since this is a multiplayer game, I have chosen to work with a real time db and `prisma` to suscribe to those. Each of the 4 clients listens for events and update locally their ui.
