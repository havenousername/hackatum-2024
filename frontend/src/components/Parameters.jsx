import { useEffect, useState } from "react";
import Slider from "./Slider.jsx";
import shrinkIcon from "../assets/shrink.svg"
import NumberInput from "./NumberInput.jsx";
import useBackendConnection from "../api/useBackendConnection.jsx";


const Parameters = ({ position, isExpanded, setIsExpanded}) => {
    const backendConnection = useBackendConnection();
    const [time, setTime] = useState(50);
    const [distance, setDistance] = useState(50);
    const [revenue, setRevenue] = useState(50);
    const [energy, setEnergy] = useState(50);

    const [startPrice, setStartPrice] = useState({ value: 10, placeholder: '0', label: 'euro'  });
    const [pricePerKm, setPricePerKm] = useState({ value: 1, placeholder: '0', label: 'euro'  });
    const [pricePerMin, setPricePerMin] = useState({ value: 1, placeholder: '0', label: 'euro'  });

    const parameters = { time, distance, revenue, energy };


    useEffect(() => {
        backendConnection.sendJsonMessage({ update: parameters })
    }, [time]);
    
    return (
        <>
        <div style={{  ...position }} className={`bg-[#2E2E2E] rouded-xl absolute px-9 py-6 rounded-xl max-w-[550px] w-full z-[999] transition-all duration-300 transform ${
            isExpanded
              ? "opacity-100 scale-100"
              : "opacity-0 scale-0  translate-y-0 pointer-events-none"
          }`}>
            <img src={shrinkIcon} alt="shrink icon" className="absolute right-6 top-6 cursor-pointer" onClick={() => setIsExpanded(false)} />
            <h4 className="font-bold text-2xl pb-4">Parameters</h4>
            <div className="flex justify-between">
                <div className="flex flex-col gap-2 basis-[25%]">
                    <h6>Start price</h6>
                    <NumberInput 
                        className={'max-w-[150px] w-full'}
                        value={startPrice.value}
                        label={startPrice.label}
                        placeholder={startPrice.placeholder} 
                        onChange={v => setStartPrice(p => ({...p, value: +v }))}
                    />
                </div>
                <div className="flex flex-col gap-2 basis-[25%]">
                    <h6>Price per km</h6>
                    <NumberInput 
                        className={'max-w-[150px] w-full'}
                        value={pricePerKm.value}
                        label={pricePerKm.label}
                        placeholder={pricePerKm.placeholder} 
                        onChange={v => setPricePerKm(p => ({...p, value: +v }))}
                    />
                </div>
                <div className="flex flex-col gap-2 basis-[25%]">
                    <h6>Price per min</h6>
                    <NumberInput 
                        className={'max-w-[150px] w-full'}
                        value={pricePerMin.value}
                        label={pricePerMin.label}
                        placeholder={pricePerMin.placeholder} 
                        onChange={v => setPricePerMin(p => ({...p, value: +v }))}
                    />
                </div>
            </div>
            <div className="mt-2"></div>
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
                <Slider value={energy} onChange={(value) => setEnergy(value)} />
                <div className="flex justify-between">
                    <h6>Renenue</h6>
                </div>
            </div>
        </div>
        </>
    );
};

export default Parameters;