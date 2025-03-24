## Coinche / Contrée

This is an implementation of a web application for playing the French card game called Coinche / Contrée, which is played at my school, ENSEEIHT.
This repo also contains a `controller` package which rules the game and a `game` package which is the front end.

### Game Overview

Coinche / Contrée is a trick-taking card game that involves four players divided into two teams. The game uses a 32-card deck and follows specific rules regarding card play and scoring.

### Technical choices

Since this is a multiplayer game, I have chosen to work with a real time db and `supabase-js` to suscribe to those. Each of the 4 clients emits events and update locally their ui based on events published by the `controller`.
