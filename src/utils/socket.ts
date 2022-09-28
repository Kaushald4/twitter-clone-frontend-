import { io } from "socket.io-client";

let token: any = localStorage.getItem("user");
if (token) {
    token = JSON.parse(token);
    token = token.jwtToken;
}

const socket: any = io("http://localhost:5000", { autoConnect: false, auth: { token } });

// socket.onAny((event: any, ...args: any) => {
//     console.log(event, args);
// });

export { socket };
