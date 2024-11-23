import { useRef, useState } from "react";
import TimeChart from "../charts/TimeChart.jsx";
import Select from "react-select";
import SingleSelect from "./SingleSelect.jsx";
import closeIcon from "../assets/close.svg";

const CarTooltip = ({ isOpen, setIsOpen }) => {
    const ref = useRef(null);
    const [car] = useState({
        id: 'randomId',
        isAvailable: true,
        customer: 'customerId',
        shortSummary: 'A car had more than 400 rides with 200 people',
        mostImportantMetricks: {
            availability: '90%',
            energySpend: '30%',
        },
        metrics: {
            distance: {
                withCustomer: '80%',
                without: '20%'
            },
            numberOfTrips: 499,
            errors: 2,
            averageTravelTime: '6min',
            energyFootprint: '4'
        }
    });


    const [features] = useState(['time', 'distance']);
    const [timeframes] = useState(['hourly', 'daily']);

    const [datasets] = useState({
        time: {
            hourly: {
                data: [10, 15, 20, 35],
                timeLabels: ["10:30", "10:40", "10:50", "11:00"],
            },
            daily: {
                data: [190, 105, 200, 350],
                timeLabels: ["10:30", "10:40", "10:50", "11:00"],
            },
        },
        distance: {
            hourly: {
                data: [3, 40, 240, 305],
                timeLabels: ["10:30", "10:40", "10:50", "11:00"],
            },
            daily: {
                data: [1900, 1305, 2000, 1350],
                timeLabels: ["10:30", "10:40", "10:50", "11:00"],
            },
        },
    });

    const [feature, setFeature] = useState(features[0]);
    const [timeFrame, setTimeFrame] = useState(timeframes[0])


    const capitalize = (str) => {
        return `${str[0].toUpperCase()}${str.slice(1)}`;
    }
    
    const featureValue = { value: feature, label: capitalize(feature) };
    const timeFrameValue = { value: timeFrame, label: capitalize(timeFrame) };

    if (!isOpen) {
        return null;
    }

    return (
        <div ref={ref} className="bg-[#2E2E2E] p-10 absolute right-20 top-20 z-999 w-full max-w-[500px] rounded-2xl">
            <img alt="close" src={closeIcon} className="absolute right-5 top-4 w-[20px] cursor-pointer" onClick={() => setIsOpen(false)} />
            <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-bold">Car #{car.id}</h2>
                <div className={`border font-bold border-1 px-14 py-1 ${car.isAvailable ? 'border-white' : ' border-primary-800'} rounded-xl`}>
                    { car.isAvailable ? 'Available' : 'Busy' }
                </div>
            </div>
            <div className="rounded-3xl bg-[#252222] px-4 py-2 timechart-container">
                <TimeChart {...datasets[feature][timeFrame]} />
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