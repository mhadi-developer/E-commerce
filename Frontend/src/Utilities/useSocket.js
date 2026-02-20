import { io } from "socket.io-client"



const socketUrl = import.meta.env.VITE_SOCKET_URL || "httpl://localhost:7000";

const socket = io("http://localhost:7000", {
    withCredentials: true,
    transports: ['websocket']
});


export default socket;