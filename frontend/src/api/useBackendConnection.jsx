import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useState, useEffect, useEffect, useCallback } from 'react';

const URL = 'ws://localhost:9876';


const useBackendConnection = () => {
    const [socketUrl] = useState(URL);
    const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);
    const { sendJsonMessage, lastJsonMessage, close } = useWebSocket(socketUrl, {
        onOpen: () => console.log('Connected to web socket'),
        onClose: () => console.log('Disconnected from WebSocket server'),
        onMessage: (message) => {
            setMessageHistory((prevHistory) => [...prevHistory, message]);
        },
        onError: (error) => console.log('WebSocket error:', error),
    });


    const createSubsription = useCallback((substribeTo) => {
        sendJsonMessage({ substribeTo });
    }, []);

    const unsubscribe = useCallback((unsubscribeFrom) => {
        sendJsonMessage({ unsubscribeFrom });
    }, []);

    return { createSubsription, messageHistory, lastJsonMessage, close, sendJsonMessage };
};


const useRealTimeSimulation = () => {
    const { sendJsonMessage, ...conn  } = useBackendConnection();

    const createScenario = () => {
        sendJsonMessage({ scenario: 'create' })
    }

    const stopScenario = () => {
        sendJsonMessage({ scenario: 'stop' })
    }

    return {...conn, createScenario, stopScenario, sendJsonMessage };
};


export default useBackendConnection;