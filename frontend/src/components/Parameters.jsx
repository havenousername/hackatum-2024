import { useState } from "react";
import Slider from "./Slider.jsx";
import shrinkIcon from "../assets/shrink.svg"

const Parameters = ({ position }) => {
    const [time, setTime] = useState(50);
    const [distance, setDistance] = useState(50);
    const [revenue, setRevenue] = useState(50);
    const [energy, setEnergy] = useState(50);
    
    return (
        <div style={{  ...position }} className="bg-[#2E2E2E] rouded-xl absolute px-9 py-6 rounded-lg max-w-[550px] w-full z-[999]">
            <img src={shrinkIcon} alt="shrink icon" className="absolute right-6 top-6" />
            <h4 className="font-bold text-2xl">Importance Parameters</h4>
            <div className="py-2">
                <Slider value={time} onChange={(value) => setTime(value)} />
                <div className="flex justify-between">
                    <h6>Time</h6>
                </div>
            </div>
            <div className="py-2">
                <Slider value={distance} onChange={(value) => setDistance(value)} />
                <div className="flex justify-between">
                    <h6>Distance</h6>
                </div>
            </div>
            <div className="py-2">
                <Slider value={revenue} onChange={(value) => setRevenue(value)} />
                <div className="flex justify-between">
                    <h6>Time</h6>
                </div>
            </div>
            <div className="py-2">
                <Slider value={energy} onChange={(value) => setRevenue(value)} />
                <div className="flex justify-between">
                    <h6>Renenue</h6>
                </div>
            </div>
        </div>
    );
};

export default Parameters;