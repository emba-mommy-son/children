/**
 * @format
 */

import {AppRegistry} from 'react-native';
import 'react-native-get-random-values';
import * as encoding from 'text-encoding';
import websocket from 'websocket';
import {WebSocket as WSWebSocket} from 'ws';
import App from './App';
import {name as appName} from './app.json';

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

// Foreground Service 설정
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
ReactNativeForegroundService.register({
  config: {
    alert: false,
    onServiceErrorCallBack: () => {
      console.log('Foreground Service Error');
    },
  },
});

AppRegistry.registerComponent(appName, () => App);
