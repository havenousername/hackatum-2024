import { useEffect, useMemo, useState } from "react";
import TimeChart from "../charts/TimeChart.jsx";
import Select from "react-select";
import SingleSelect from "./SingleSelect.jsx";

const CarTooltip = ({ isOpen }) => {
    const [car] = useState({
        id: 'randomId',
        isAvailable: true,
        customer: 'customerId',
        shortSummary: 'a car had more than 400 rides with 200 people',
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
            energyFootprint: '4% from norm'
        }
    });

    const [dataset] = useState({
        hourly: {
            data: [10, 15, 20, 35],
            timeLabels: ["10:30", "10:40", "10:50", "11:00"],
        },
        daily: {
            data: [190, 105, 200, 350],
            timeLabels: ["10:30", "10:40", "10:50", "11:00"],
        },
    });

    const options = useMemo(() => Object.keys(dataset).map(key => ({ 
        value: dataset[key],
        label: key
    })), [dataset]);

    useEffect(() => {
        console.log(options);
    }, []);

    const [selectedData, setSelectedData] = useState(options[0]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className="bg-[#2E2E2E] p-10 absolute right-20 top-20 z-999 w-full max-w-[500px] rounded-xl">
            <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-bold">Car #{car.id}</h2>
                <div className={`border font-bold border-1 px-14 py-1 ${car.isAvailable ? 'border-white' : ' border-primary-800'} rounded-xl`}>
                    { car.isAvailable ? 'Available' : 'Busy' }
                </div>
            </div>
            <div className="rounded-3xl bg-[#252222] px-4 py-2 timechart-container">
                <TimeChart {...selectedData} />
            </div>
            <div>
                <SingleSelect value={selectedData} options={options}  />
                {/* <div className="max-w-[220px] w-full rounded-3xl">  
                </div> */}
            </div>
        </div>
    );
};


export default CarTooltip;