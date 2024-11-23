import { useState } from "react";
import Slider from "./Slider.jsx";
import shrinkIcon from "../assets/shrink.svg"

const Parameters = ({ position }) => {
    const [tradeoffOne, setTradeoffOne] = useState(0);
    const [tradeoffTwo, setTradeoffTwo] = useState(20);
    
    return (
        <div style={{  ...position }} className="bg-[#2E2E2E] rouded-xl absolute px-9 py-6 rounded-lg max-w-[550px] w-full z-[999]">
            <img src={shrinkIcon} alt="shrink icon" className="absolute right-6 top-6" />
            <h4 className="font-bold text-2xl">Parameters</h4>
            <div className="py-2">
                <Slider value={tradeoffOne} onChange={(value) => setTradeoffOne(value)} />
                <div className="flex justify-between">
                    <h6>Customer Friendly</h6>
                    <h6>Error-less</h6>
                </div>
            </div>
            <div className="py-2">
                <Slider value={tradeoffTwo} onChange={(value) => setTradeoffTwo(value)} />
                <div className="flex justify-between">
                    <h6>Fleet Efficiency</h6>
                    <h6>Eco Friendliness</h6>
                </div>
            </div>
        </div>
    );
};

export default Parameters;