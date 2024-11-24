import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useState, useEffect, useCallback } from 'react';

const URL = 'ws://localhost:9876';


const useBackendConnection = () => {
    const [socketUrl] = useState(URL);
    const [messageHistory, setMessageHistory] = useState([]);
    const { sendJsonMessage, lastJsonMessage, close } = useWebSocket(socketUrl, {
        onOpen: () => console.log('Connected to web socket'),
        onClose: () => console.log('Disconnected from WebSocket server'),
        onMessage: (message) => {
            setMessageHistory((prevHistory) => [...prevHistory, message]);
        },
        onError: (error) => console.log('WebSocket error:', error),
    });


    const createSubscription = useCallback((subscribeTo) => {
        sendJsonMessage({ subscribeTo });
    }, []);

    const unsubscribe = useCallback((unsubscribeFrom) => {
        sendJsonMessage({ unsubscribeFrom });
    }, []);

    return { createSubscription, unsubscribe, messageHistory, lastJsonMessage, close, sendJsonMessage };
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