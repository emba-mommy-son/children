// import {Client} from '@stomp/stompjs';
// import {create} from 'zustand';

// interface SocketState {
//   stompClient: Client | null;
//   connect: (userId: number, onMessage: (message: string) => void) => void;
//   disconnect: () => void;
// }

// export const useSocketStore = create<SocketState>((set, get) => ({
//   stompClient: null,

//   connect: (userId: number, onMessage: (message: string) => void) => {
//     console.log(userId);
//     const client = new Client({
//       brokerURL: 'wss://www.mommy-son.kro.kr/ws',
//       debug: str => {
//         console.log('STOMP Debug:', str);
//       },
//       onConnect: () => {
//         // console.log('Connected:', frame);
//         console.log('123123');
//         client.subscribe(`/sub/chat/user/${userId}`, message => {
//           console.log('Received message:', message);
//           onMessage(message.body);
//         });
//       },
//       onStompError: frame => {
//         console.error('Broker reported error:', frame.headers['message']);
//         console.error('Additional details:', frame.body);
//       },
//       onWebSocketError: event => {
//         console.error('WebSocket error', event);
//       },
//       onWebSocketClose: event => {
//         console.log('WebSocket closed', event);
//       },
//     });

//     client.activate();
//     set({stompClient: client});
//   },

//   disconnect: () => {
//     const client = get().stompClient;
//     if (client) {
//       client.deactivate();
//       console.log('Disconnected');
//       set({stompClient: null});
//     }
//   },
// }));
