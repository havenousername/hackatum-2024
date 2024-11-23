
import { GridStack } from 'gridstack';
import { useEffect, useState } from 'react';
import BarChart from '../charts/bar';

const Statistics = () => {

    const [statistics, _] = useState(
        [
            { name: 'Avg. Fleet Efficiency', percentage: 56 },
            { name: 'Avg. Operational', percentage: 99.99 },
            { name: 'Avg. Env. Impact', percentage: 56 },
            { name: 'Avg. General', percentage: 80.9 },

        ]
    );

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
                            <div className=""><BarChart /></div>
                            <div>
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
                            <div className=""><BarChart /></div>
                        </div>
                        <div className='rounded-xl p-8 bg-charcoal-gray'>
                            <div className=""><BarChart /></div>
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