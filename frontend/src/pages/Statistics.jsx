
import { GridStack } from 'gridstack';
import { useEffect } from 'react';
import 'gridstack/dist/gridstack.css';


const Statistics = () => {
    useEffect(() => {
        GridStack.init();
    },[]);

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

            <div className="grid-stack top-24">
                <div className="grid-stack-item border-dark" data-gs-width="4" data-gs-height="4">
                    <div className="grid-stack-item-content">Item 1</div>
                </div>
                <div className="grid-stack-item border-dark" data-gs-width="4" data-gs-height="4">
                    <div className="grid-stack-item-content">Item 2</div>
                </div>
                <div className="grid-stack-item border-dark" data-gs-width="4" data-gs-height="4">
                    <div className="grid-stack-item-content">Item 3</div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;