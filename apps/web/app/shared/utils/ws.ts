// WebSocket client utility for Bun server
// Usage: import { getWS, sendWS, onWSMessage, offWSMessage } from '@/lib/utils/ws';

let ws: WebSocket | null = null;
const listeners = new Set<(msg: any) => void>();
const config = useRuntimeConfig();

export function getWS() {
  if (!ws || ws.readyState === WebSocket.CLOSED) {
    // Construct WebSocket URL from server URL
    const serverURL = config.public.serverURL || 'http://localhost:3000';
    const wsURL = serverURL.replace(/^http(s)?:\/\//, 'ws$1://') + '/ws';
    console.log('Connecting to WebSocket:', wsURL);
    ws = new WebSocket(wsURL);
    
    ws.onopen = () => {
      console.log('WebSocket connected');
    };
    
    ws.onmessage = (event) => {
      let data;
      try {
        data = JSON.parse(event.data);
      } catch (e) {
        console.warn('Failed to parse WebSocket message as JSON:', e);
        data = event.data;
      }
      
      // Notify all listeners
      listeners.forEach((cb) => {
        try {
          cb(data);
        } catch (error) {
          console.error('Error in WebSocket listener:', error);
        }
      });
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    ws.onclose = (event) => {
      console.log('WebSocket closed:', event.code, event.reason);
      ws = null;
    };
  }
  return ws;
}

export function sendWS(event: object) {
  const socket = getWS();
  
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(event));
  } else if (socket.readyState === WebSocket.CONNECTING) {
    // Wait for connection to open
    socket.addEventListener('open', () => {
      socket.send(JSON.stringify(event));
    }, { once: true });
  } else {
    console.error('WebSocket is not connected and cannot send message');
  }
}

export function onWSMessage(cb: (msg: any) => void) {
  listeners.add(cb);
  
  // Return cleanup function
  return () => {
    listeners.delete(cb);
  };
}

export function offWSMessage(cb: (msg: any) => void) {
  listeners.delete(cb);
}

export function clearAllListeners() {
  listeners.clear();
}

export function closeWS() {
  if (ws) {
    ws.close();
    ws = null;
  }
  listeners.clear();
}