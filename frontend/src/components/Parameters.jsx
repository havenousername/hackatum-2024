import { useEffect, useMemo, useState } from "react";
import Slider from "./Slider.jsx";
import shrinkIcon from "../assets/shrink.svg"
import NumberInput from "./NumberInput.jsx";
import useBackendConnection from "../api/useBackendConnection.jsx";
import useDebounce from "../hooks/useDebounce.jsx";


const Parameters = ({ position, isExpanded, setIsExpanded}) => {
    const backendConnection = useBackendConnection();
    const [time, setTime] = useState(50);
    const [distance, setDistance] = useState(50);
    const [revenue, setRevenue] = useState(50);
    const [energy, setEnergy] = useState(50);

    const [startPrice, setStartPrice] = useState({ value: 10, placeholder: '0', label: 'euro'  });
    const [pricePerKm, setPricePerKm] = useState({ value: 1, placeholder: '0', label: 'euro'  });
    const [pricePerMin, setPricePerMin] = useState({ value: 1, placeholder: '0', label: 'euro'  });


    useEffect(() => {
        backendConnection.createSubscription('parameters');
    }, []);

    const isFirstUpload = backendConnection.lastJsonMessage && Object.keys(backendConnection.lastJsonMessage).length > 0 && backendConnection.messageHistory.length < 3;

    const [updatedFromBackend, setUpdatedFromBackend] = useState(false);
    useEffect(() => {
        if (isFirstUpload) {
            setTime(backendConnection.lastJsonMessage.parameters.weights.duration * 100);
            setDistance(backendConnection.lastJsonMessage.parameters.weights.distance * 100);
            setEnergy(backendConnection.lastJsonMessage.parameters.weights.energyConsumption * 100);
            setRevenue(backendConnection.lastJsonMessage.parameters.weights.revenue * 100);

            setStartPrice(p => ({ value: backendConnection.lastJsonMessage.parameters.financialConstraints.startPrice, ...p }));
            setPricePerMin(p => ({ value: backendConnection.lastJsonMessage.parameters.financialConstraints.pricePerMin, ...p  }));
            setPricePerKm(p => ({ value: backendConnection.lastJsonMessage.parameters.financialConstraints.pricePerKm, ...p }));
            setUpdatedFromBackend(true);
        }
    }, [isFirstUpload]);


    const timeD = useDebounce(time);
    const distanceD = useDebounce(distance);
    const revenueD = useDebounce(revenue);
    const energyD = useDebounce(energy);

    const startPriceD = useDebounce(startPrice.value);
    const pricePerKmD = useDebounce(pricePerKm.value);
    const pricePerMinD = useDebounce(pricePerMin.value);


    useEffect(() => {
        if (updatedFromBackend) {
            const parameters = { 
                "weights": {
                    "duration": timeD / 100,
                    "distance": distanceD / 100,
                    "energyConsumption": energyD / 100,
                    "revenue": revenueD / 100
                },
                "financialConstraints": {
                    "startPrice": startPriceD,
                    "pricePerKm": pricePerKmD,
                    "pricePerMin": pricePerMinD
                }
            }
            backendConnection.sendJsonMessage({ parameters, update: 'parameters' });
        }
    }, [updatedFromBackend, timeD, distanceD, revenueD, energyD, startPriceD, pricePerKmD, pricePerMinD]);


    
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
                    <h6>Revenue</h6>
                </div>
            </div>
            <div className="py-2">
                <Slider value={energy} onChange={(value) => setEnergy(value)} />
                <div className="flex justify-between">
                    <h6>Energy</h6>
                </div>
            </div>
        </div>
        </>
    );
};

export default Parameters;