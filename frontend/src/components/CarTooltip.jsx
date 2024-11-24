import { useEffect, useRef, useState } from "react";
import TimeChart from "../charts/TimeChart.jsx";
import SingleSelect from "./SingleSelect.jsx";
import closeIcon from "../assets/close.svg";
import { faker } from "@faker-js/faker";

const CarTooltip = ({ isOpen, setIsOpen, selectedCar }) => {
    const ref = useRef(null);


    const car = {
        id: faker.string.uuid(), // Use faker.string.uuid() for unique IDs
        isAvailable: faker.datatype.boolean(),
        customer: faker.person.firstName(), // Updated API for names
        shortSummary: faker.lorem.sentence(),
        mostImportantMetricks: {
            availability: `${faker.number.int({ min: 80, max: 100 })}%`, // Updated for numbers
            energySpend: `${faker.number.int({ min: 10, max: 50 })}%`,
        },
        metrics: {
            distance: {
                withCustomer: `${faker.number.int({ min: 50, max: 90 })}%`,
                without: `${faker.number.int({ min: 10, max: 50 })}%`,
            },
            numberOfTrips: faker.number.int({ min: 100, max: 1000 }),
            errors: faker.number.int({ min: 0, max: 10 }),
            averageTravelTime: `${faker.number.int({ min: 5, max: 20 })} min`,
            energyFootprint: faker.number.int({ min: 1, max: 10 }).toString(),
        },
    };


    const [features] = useState(['time', 'distance']);
    const [timeframes] = useState(['hourly', 'daily']);

    const datasets = {
        time: {
            hourly: {
                data: Array.from({ length: 4 }, () => faker.number.int({ min: 5, max: 50 })),
                timeLabels: ["10:30", "10:40", "10:50", "11:00"],
            },
            daily: {
                data: Array.from({ length: 4 }, () => faker.number.int({ min: 1, max: 1000 })),
                timeLabels: ["Sunday", "Monday", "Tuesday", "Wednesday"],
            },
        },
        distance: {
            hourly: {
                data: Array.from({ length: 4 }, () => faker.number.int({ min: 1, max: 100 })),
                timeLabels: ["10:30", "10:40", "10:50", "11:00"],
            },
            daily: {
                data: Array.from({ length: 4 }, () => faker.number.int({ min: 1000, max: 2000 })),
                timeLabels: ["Sunday", "Monday", "Tuesday", "Wednesday"],
            },
        },
    };

    const [feature, setFeature] = useState(features[0]);
    const [timeFrame, setTimeFrame] = useState(timeframes[0])


    const capitalize = (str) => {
        return `${str[0].toUpperCase()}${str.slice(1)}`;
    }
    
    const featureValue = { value: feature, label: capitalize(feature) };
    const timeFrameValue = { value: timeFrame, label: capitalize(timeFrame) };


    const isAvailable = selectedCar?.type  === "TAXI_DRIVING_ALONE" ? true : false;

    return (
        <div
         ref={ref} 
         className={`bg-[#2E2E2E] p-10 absolute right-20 top-20 z-999 w-full max-w-[500px] rounded-2xl transition-all duration-300 transform ${
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
         >
            <img alt="close" src={closeIcon} className="absolute right-5 top-4 w-[20px] cursor-pointer" onClick={() => setIsOpen(false)} />
            <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-bold">Car #{selectedCar?.id.slice(0, 5) + '...' ?? car.id}</h2>
                <div className={`border font-bold border-1 px-14 py-1 ${ isAvailable ? 'border-white' : ' border-primary-800'} rounded-xl`}>
                    { isAvailable ? 'Available' : 'Busy' }
                </div>
            </div>
            <div className="rounded-3xl bg-[#252222] px-4 py-2 timechart-container">
                {datasets[feature] && <TimeChart {...datasets[feature][timeFrame]} />}
            </div>
            <div className="flex justify-evenly my-4">
                <SingleSelect
                 value={featureValue} 
                 options={features.map(i => ({ value: i, label: capitalize(i) }))} 
                 onChange={(data) => setFeature(data.value)}  
                 getOptionValue={e => e.label}
                />
                <SingleSelect
                 value={timeFrameValue} 
                 options={timeframes.map(i => ({ value: i, label: capitalize(i) }))} 
                 onChange={(data) => {
                    setTimeFrame(data.value)
                }}  
                 getOptionValue={e => e.label}
                />
            </div>
            <div className="mt-7">
                <h3 className="text-xl font-bold">Short Summary</h3>
                <h5 className="text-[#C0C0C0]">{car.shortSummary}</h5>
            </div>
            <div className="mt-7">
                <h3 className="text-xl font-bold pb-2">Important metrics</h3>
                <div className="flex justify-between">
                    <div className="rounded-xl bg-[#242424] px-4 py-2 border-1 border-[#383434] border-solid flex gap-4 items-center basis-[48%]">
                        <span className="font-bold text-[#C0C0C0]">Availability</span>
                        <span className="text-[#C0C0C0] text-sm">{car.mostImportantMetricks.availability}</span>
                    </div>
                    <div className="rounded-xl bg-[#242424] px-4 py-2 border-1 border-[#383434] border-solid flex gap-4 items-center basis-[48%]">
                        <span className="font-bold text-[#C0C0C0]">Energy Spend</span>
                        <span className="text-[#C0C0C0] text-sm">{car.mostImportantMetricks.energySpend}</span>
                    </div>
                </div>
            </div>
            <div className="mt-7">
                <h3 className="text-xl font-bold pb-2">Other metrics</h3>
                <div className="flex justify-between">
                    <div className="rounded-xl flex justify-between px-4 py-2 basis-[50%]">
                        <span className="font-bold text-sm text-[#C0C0C0]">Number of trips</span>
                        <span className="text-[#C0C0C0] text-sm">{car.metrics.numberOfTrips}</span>
                    </div>
                    <div className="rounded-xl border-solid flex justify-between px-4 py-2 basis-[50%]">
                        <span className="font-bold text-[#C0C0C0] text-sm">Average travel time</span>
                        <span className="text-[#C0C0C0] text-sm">{car.metrics.averageTravelTime}</span>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="rounded-xl flex justify-between px-4 py-2 basis-[50%]">
                        <span className="font-bold text-[#C0C0C0] text-sm">Errors of car</span>
                        <span className="text-[#C0C0C0] text-sm">{car.metrics.errors}</span>
                    </div>
                    <div className="rounded-xl border-solid flex justify-between px-4 py-2 basis-[50%]">
                        <span className="font-bold text-[#C0C0C0] text-sm">Energy footprint</span>
                        <span className="text-[#C0C0C0] text-sm">{car.metrics.energyFootprint}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default CarTooltip;