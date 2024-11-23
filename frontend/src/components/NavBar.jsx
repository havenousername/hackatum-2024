import { useState } from "react";

const NavBar = () => {

    const [isMapView, setIsMapView] = useState(true);
    
    return (
        <div className="w-[39rem] h-16 rounded-3xl bg-charcoal-gray absolute z-[999] left-1/2 mt-10 transform -translate-x-1/2">
            <div className="flex justify-around items-center h-full">
                <div className="w-6/12 cursor-pointer">
                    <div onClick={() =>{
                        setIsMapView(true)
                    }}  className={`text-center rounded-3xl w-11/12 ml-2 flex justify-center items-center h-10 ${isMapView ? 'bg-burnt-coral' : ''}`}>
                        Map View
                    </div>
                </div>

                <div className="w-6/12 cursor-pointer">
                    <div onClick={() =>{
                        setIsMapView(false)
                    }} className={`text-center rounded-3xl w-11/12 ml-2 flex justify-center items-center h-10 ${!isMapView ? 'bg-burnt-coral' : ''}`}>
                        Statistics
                    </div>
                </div>

            </div>
        </div>
    );
}



export default NavBar;