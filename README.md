## Coinche / Contrée

This is an implementation of a web application for playing the French card game called Coinche / Contrée, which is played at my school, ENSEEIHT.
This repo also contains a `controller` package which rules the game and a `game` package which is the front end.

### Game Overview

Coinche / Contrée is a trick-taking card game that involves four players divided into two teams. The game uses a 32-card deck and follows specific rules regarding card play and scoring.

### Technical choices

Since this is a multiplayer game, I have chosen to work with a [publish-subscribe WebSocket server with Bun](https://bun.sh/guides/websocket/pubsub) and a Postgres db for persistant data such as player score.
The game is made using [nuxt](https://nuxt.com/).

I would love to port it to native app using [Tauri](https://tauri.app/) and includes paid dlc purchases made possible in app using [PWA](https://whatpwacando.today/payment).
