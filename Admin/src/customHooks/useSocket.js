import { io } from "socket.io-client";
const socketUrl = import.meta.env.VITE_SOCKET_URL || "http://localhost:7000";

const socket = io(socketUrl, { transports: ["websocket"], } );

export default socket;




  // socket io backent configuration
