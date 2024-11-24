import { useEffect, useState, useMemo } from 'react';
import BarChart from '../charts/Bar';
import { faker } from '@faker-js/faker';
import TimeChart from '../charts/TimeChart';
import PieChart from '../charts/PieChart';
import Simulation from '../components/Simulation';
const Statistics = () => {
    const fakeStatistics = () => {
       return  {
            statistics: [
                { name: 'Avg. Fleet Efficiency', value: faker.number.float({ min: 50, max: 100, precision: 0.01 }) },
                { name: 'Avg. Operational', value: faker.number.float({ min: 90, max: 100, precision: 0.01 }) },
                { name: 'Avg. Env. Impact', value: faker.number.float({ min: 40, max: 60, precision: 0.01 }) },
                { name: 'Avg. General', value: faker.number.float({ min: 60, max: 90, precision: 0.01 }) }
            ],
            customer: [
                { name: 'Avg. Waiting Time', value: faker.number.int({ min: 1, max: 20 }) },
                { name: 'Avg. Spent Time', value: faker.number.int({ min: 5, max: 30 }) }
            ],
            fleet: [
                { name: 'Avg. Customer Time', value: faker.number.int({ min: 1, max: 10 }) },
                { name: 'Avg. Spent Time', value: faker.number.int({ min: 5, max: 20 }) }
            ]
        }
    }
    const [statistics, setStatistics] = useState(fakeStatistics());
    
    const fakeDataSet = () => {
        return {
            hourly: {
                data: [faker.number.int({ min: 0, max: 100 }), faker.number.int({ min: 0, max: 100 }), faker.number.int({ min: 0, max: 100 }), faker.number.int({ min: 0, max: 100 })],
                timeLabels: ["10:30", "10:40", "10:50", "11:00"],
            },
            daily: {
                data: [faker.number.int({ min: 0, max: 100 }), faker.number.int({ min: 0, max: 100 }), faker.number.int({ min: 0, max: 100 }), faker.number.int({ min: 0, max: 100 })],
                timeLabels: ["10:30", "10:40", "10:50", "11:00"],
            },
        };
    }

    const [dataset, setDataSet] = useState(fakeDataSet());

    const options = useMemo(() => Object.keys(dataset).map(key => ({
        value: dataset[key],
        label: `${key[0].toUpperCase()}${key.slice(1)}`
    })), [dataset]);

    const [selectedData, setSelectedData] = useState(options[0]);

    ///

    //fakedata for barchart
    const labels = ['1st simulation', '2nd simulation', '3rd simulation'];

    const fakerDataGen = () => {
        return {
            labels,
            datasets: [
                {
                    label: 'Avg. Fleet Efficiency',
                    data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
                    backgroundColor: 'rgba(231, 164, 150, 1)',
                },
                {
                    label: 'Avg. Operational',
                    data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
                    backgroundColor: 'rgba(225, 100, 73, 1)',
                },
                {
                    label: 'Avg. Env. Impact',
                    data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
                    backgroundColor: 'rgba(246, 236, 234, 1)',
                },
    
                {
                    label: 'Avg. General',
                    data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                },
            ],
        }
    }


    const [data, setData] = useState(fakerDataGen());


    useEffect(() => {
        setInterval(() => {
            setData(fakerDataGen());
            setStatistics(fakeStatistics());
            setDataSet(fakeDataSet());
        }, 1800)
    }, []);

    return (
        <div className="w-full pl-[6rem] relative bg-charcoal-gray h-[100%] pb-6">
            <Simulation />
            <div className='grid grid-cols-[1.25fr_0.85fr_0.85fr] pt-6 gap-x-2 w-[95%]' style={{ paddingTop: '6rem' }}>
                <div className="rounded-xl bg-dark-charcoal p-8 flex flex-col gap-2">
                    <div className="border-dark">
                        <div className='rounded-xl p-8 bg-charcoal-gray'>
                            <div className="h-[400px]"><BarChart data={data} /></div>
                            <div className='pl-8'>
                                <h4 className='mt-1'>Statistics</h4>
                                <div className='grid pt-1 grid-cols-2'>
                                    {statistics.statistics.map((data, index) =>
                                        <div key={index} className='flex gap-6'> <h6>{data.name}</h6> <h6>{`${data.value}%`}</h6></div>
                                    )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="gap-2 grid-cols-2 grid border-dark">
                        <div className='rounded-xl p-8 bg-charcoal-gray'>
                            <div className=""><TimeChart {...selectedData.value} /></div>
                        </div>
                        <div className='rounded-xl p-8 bg-charcoal-gray'>
                            <div className=""><TimeChart {...selectedData.value} /></div>
                        </div>
                    </div>
                </div>

                <div className='grid grid-rows-2 gap-20 rounded-xl p-8 bg-dark-charcoal'>
                    <div className="grid grid-cols-2 gap-x-2 rounded-xl gap-4 p-8 bg-charcoal-gray ">

                        <div className="border-dark">
                            <div className="pt-8"><PieChart /></div>
                            <div>
                                <h4 className='pt-14'>Customer Statistics</h4>
                                {statistics.customer.map((data, index) =>
                                    <div key={index} className='flex gap-6'> <h6>{data.name}</h6> <h6>{`${data.value} min`}</h6></div>)
                                }

                            </div>
                        </div>
                        <div className="border-dark">
                            <div className="pt-8"><PieChart /></div>
                            <h4 className='pt-14'>Fleet Statistics</h4>
                            {statistics.fleet.map((data, index) =>
                                <div key={index} className='flex gap-6'> <h6>{data.name}</h6> <h6>{`${data.value} min`}</h6></div>)
                            }
                        </div>
                    </div>
                    <div className="rounded-xl p-8 bg-charcoal-gray ">

                        <div className="border-dark">
                            <div className=""><PieChart /></div>
                        </div>
                    </div>

                </div>



                <div className='grid grid-rows-2 gap-20 rounded-xl p-8 bg-dark-charcoal'>
                    <div className="rounded-xl p-8 bg-charcoal-gray ">
                        <div className="border-dark">
                            <div className='text-center'>
                                <h4 className="">Operational</h4>
                                <h1>4%</h1>
                                <h4>Error Rate per Order</h4>
                                <h4 className='pt-8'>Your error rate in within norm</h4>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl p-8 bg-charcoal-gray ">
                        <div className="border-dark">
                            <div className='text-center'>
                                <h4 className="">General</h4>
                                <h3>12K</h3>
                                <h4>People Served</h4>
                                <h3>129K</h3>
                                <h4>Kilometers by fleet</h4>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Statistics;