import { useState } from "react";
import Parameters from "../components/Parameters";

const Statistics = () => {
    const [position] = useState({ bottom: '5%', left: '5%' });
    return (
        <div className="w-full h-screen relative">
            <Parameters position={position} />
        </div>
    );
};

export default Statistics;