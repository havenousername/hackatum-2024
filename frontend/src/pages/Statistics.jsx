
import { GridStack } from 'gridstack';
import { useEffect, useState, useMemo } from 'react';
import BarChart from '../charts/bar';
import { faker } from '@faker-js/faker';
import TimeChart from '../charts/TimeChart';
const Statistics = () => {

    const [statistics, _] = useState(
        [
            { name: 'Avg. Fleet Efficiency', percentage: 56 },
            { name: 'Avg. Operational', percentage: 99.99 },
            { name: 'Avg. Env. Impact', percentage: 56 },
            { name: 'Avg. General', percentage: 80.9 },

        ]
    );
    //fakedata for timechart
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
        label: `${key[0].toUpperCase()}${key.slice(1)}`
    })), [dataset]);

    const [selectedData, setSelectedData] = useState(options[0]);

    ///

    //fakedata for barchart
    const labels = ['1st simulation', '2nd simulation', '3rd simulation'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Avg. Fleet Efficiency',
                data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
                backgroundColor: 'rgba(231, 164, 150, 1)',
            },
            {
                label: 'Avg. Operational',
                data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
                backgroundColor: 'rgba(225, 100, 73, 1)',
            },
            {
                label: 'Avg. Env. Impact',
                data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
                backgroundColor: 'rgba(246, 236, 234, 1)',
            },

            {
                label: 'Avg. General',
                data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
            },
        ],
    };
    ///
    useEffect(() => {
        GridStack.init();
    }, []);

    return (
        <div className="w-full pl-[6rem] h-screen relative bg-charcoal-gray">
            <div className="pt-[3rem] flex">
                <h6>Simulation running for</h6>
                <span className="pl-14">10 min 23 sec</span>
            </div>
            <div className="pt-[0.75rem]  flex">
                <div className="w-28 rounded text-center font-bold cursor-pointer bg-burnt-coral"> <span>Stop</span></div>
                <h6 className="pl-14">until</h6>
                <span className="pl-14">21 minutes</span>
            </div>
            <div className='grid grid-cols-[1.25fr_0.85fr_0.85fr] pt-6 gap-x-2 w-[95%]'>

                <div className="rounded-xl bg-dark-charcoal ">
                    <div className="p-8 border-dark">
                        <div className='rounded-xl p-4 bg-charcoal-gray'>
                            <div className=""><BarChart data={data} /></div>
                            <div className='pl-8'>
                                <h4 className='pt-4'>Statistics</h4>
                                <div className='grid pt-2 grid-cols-2'>
                                    {statistics.map((data, index) =>
                                        <div key={index} className='flex gap-6'> <h6>{data.name}</h6> <h6>{`${data.percentage}%`}</h6></div>
                                    )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-8 gap-2 grid-cols-2 grid border-dark">
                        <div className='rounded-xl p-8 bg-charcoal-gray'>
                            <div className=""><TimeChart {...selectedData.value} /></div>
                        </div>
                        <div className='rounded-xl p-8 bg-charcoal-gray'>
                            <div className=""><TimeChart {...selectedData.value} /></div>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl bg-dark-charcoal ">
                    <div className="border-dark">
                        <div className="">Item 1</div>
                    </div>
                    <div className="border-dark">
                        <div className="">Item 2</div>
                    </div>
                </div>

                <div className="rounded-xl bg-dark-charcoal ">
                    <div className="border-dark">
                        <div className="">Item 1</div>
                    </div>
                    <div className="border-dark">
                        <div className="">Item 2</div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Statistics;