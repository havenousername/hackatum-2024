import { useEffect, useState } from "react";

import { useRealTimeSimulation } from "../api/useBackendConnection";
import NumberInput from "./NumberInput";



const Simulation = () => {
    const { lastJsonMessage, createScenario, createSubscription, stopScenario }= useRealTimeSimulation();
    const [numberOfCars, setNumberOfCars] = useState(5);
    const [numberOfCustomers, setNumberOfCustomers] = useState(11);

    const isRunning = lastJsonMessage?.customerPosition;

    const createSimulation = () => {
        createScenario(numberOfCars, numberOfCustomers);
        createSubscription('customerPosition');
        createSubscription('carPosition');
    };

    const stopSimulation = () => {
        stopScenario();
    }


    if (!isRunning) {
        return (
            <div className="flex flex-col gap-y-2">
                <h6 className='text-base'>Start New Simulation</h6>
                <div className="flex justify-between">
                <div className="flex flex-col gap-2 basis-[25%]">
                    <h6>Number of cars</h6>
                    <NumberInput 
                        className={'max-w-[150px] w-full'}
                        value={numberOfCars}
                        label={''}
                        placeholder={''} 
                        onChange={v => setNumberOfCars(v)}
                    />
                </div>
                <div className="flex flex-col gap-2 basis-[25%]">
                    <h6>Number of customers</h6>
                    <NumberInput 
                        className={'max-w-[150px] w-full'}
                        value={numberOfCustomers}
                        label={''}
                        placeholder={''} 
                        onChange={v => setNumberOfCustomers(v)}
                    />
                </div>
                </div>
                <div className="w-28 rounded text-center font-bold cursor-pointer bg-primary-800" onClick={createSimulation}>
                    <span>Start</span>
                </div>
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-y-2'>
                <div className="flex gap-4">
                    <h6 className='text-base'>Simulation running for</h6>
                    <span>{lastJsonMessage.update_similation_step} steps</span>
                </div>
                <div className="flex">
                    <div className="w-28 rounded text-center font-bold cursor-pointer bg-primary-800" onClick={stopSimulation}>
                        <span>Stop</span>
                    </div>
                    <div className='flex ml-7 gap-4'>
                        <h6 className='text-base'>until</h6>
                        <span>All customers are not satisfied :)</span>
                    </div>
                </div>
            </div>
    )
};

export default Simulation;