
const URL = import.meta.env.VITE_SOCKET_URL;
// const URL = 'https://echo.websocket.org/';


const connectToWS = () => {
    const socket = new WebSocket(URL);
    socket.addEventListener('open', () => {
        console.log("WebSocket connection opened");
        socket.send(JSON.stringify({ message: "Hello Server!" }));
    });

    // socket.addEventListener('message', (e) => {    
    //     console.log(e.data);
    // });

    socket.addEventListener('close', () => {
        console.log("WebSocket connection closed");
    });

    socket.addEventListener('error', (error) => {
        console.error("WebSocket error:", error);
    });
    return socket;
};



export default connectToWS;