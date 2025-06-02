import useWebSocket, { ReadyState } from 'react-use-websocket';
import {useState, useEffect, useCallback, useMemo, useRef} from 'react';

const URL = import.meta.env.VITE_SOCKET_URL;


const useBackendConnection = () => {
    const [socketUrl] = useState(URL);
    const [messageHistory, setMessageHistory] = useState([]);
    const [counter, setCounter] = useState(0);
    const { sendJsonMessage, close, lastJsonMessage } = useWebSocket(socketUrl, {
        onOpen: () => console.log('Connected to web socket'),
        onClose: (reason) => console.log('Disconnected from WebSocket server'),
        onMessage: (message) => {
                // const data = JSON.parse(message.data);
                // setMessageHistory((prevHistory) => [...prevHistory, data]);
                console.log('Received new message from WebSocket server');
        },
        onError: (error) => console.log('WebSocket error:', error),
    });


    const lastMessageRef = useRef(null);

    useEffect(() => {
        if (lastJsonMessage) {
            lastMessageRef.current = lastJsonMessage;
            setCounter(counter + 1);
        }
    }, [lastJsonMessage]);

    const createSubscription = useCallback((subscribeTo) => {
        sendJsonMessage({ subscribeTo });
    }, []);

    const unsubscribe = useCallback((unsubscribeFrom) => {
        sendJsonMessage({ unsubscribeFrom });
    }, []);


    return { createSubscription, unsubscribe, messageHistory, lastJsonMessage, lastMessageRef, close, sendJsonMessage, counter };
};


const useRealTimeSimulation = () => {
    const { sendJsonMessage, ...conn  } = useBackendConnection();

    const createScenario = (numberOfVehicles, numberOfCustomers) => {
        sendJsonMessage({ scenario: 'create', numberOfVehicles, numberOfCustomers })
    }

    const stopScenario = () => {
        sendJsonMessage({ scenario: 'stop' })
    }

    return {...conn, createScenario, stopScenario, sendJsonMessage };
};

export { useRealTimeSimulation };


export default useBackendConnection;