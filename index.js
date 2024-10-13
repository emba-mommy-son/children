/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import websocket from 'websocket';
import {WebSocket as WSWebSocket} from 'ws';
import * as encoding from 'text-encoding';

// WebSocket 설정
if (!global.WebSocket) {
  if (websocket && websocket.w3cwebsocket) {
    global.WebSocket = websocket.w3cwebsocket;
  } else if (WSWebSocket) {
    global.WebSocket = WSWebSocket;
  }
}

// TextEncoder/TextDecoder 설정
if (typeof TextEncoder === 'undefined') {
  global.TextEncoder = encoding.TextEncoder;
}
if (typeof TextDecoder === 'undefined') {
  global.TextDecoder = encoding.TextDecoder;
}
AppRegistry.registerComponent(appName, () => App);
