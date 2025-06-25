// WebSocket client utility for Bun server
// Usage: import { getWS, sendWS, onWSMessage } from '@/lib/utils/ws';

let ws: WebSocket | null = null;
const listeners: ((msg: any) => void)[] = [];

export function getWS() {
  if (!ws || ws.readyState === WebSocket.CLOSED) {
    // TODO: Replace with your actual server address/port
    ws = new WebSocket(`ws://${window.location.hostname}:3001`);
    ws.onmessage = (event) => {
      let data;
      try {
        data = JSON.parse(event.data);
      } catch (e) {
        data = event.data;
      }
      listeners.forEach((cb) => cb(data));
    };
  }
  return ws;
}

export function sendWS(event: object) {
  const socket = getWS();
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(event));
  } else {
    socket.addEventListener('open', () => {
      socket.send(JSON.stringify(event));
    }, { once: true });
  }
}

export function onWSMessage(cb: (msg: any) => void) {
  listeners.push(cb);
} 