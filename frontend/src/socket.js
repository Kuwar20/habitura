import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL ='http://localhost:5000';

export const socket = io(URL,{
    autoConnect: false,
    withCredentials: true,
    transports: ['websocket'],
    reconnectionAttempts: 5, // Retry to connect 5 times before failing
    debug: true, // This enables debugging messages
});