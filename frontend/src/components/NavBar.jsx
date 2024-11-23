import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
const NavBar = () => {

const location = useLocation();
const isMapView = location.pathname === '/';

const navigate =  useNavigate();
    
    return (
        <div className="w-[39rem] h-16 rounded-full border border-grayish-brown bg-charcoal-gray absolute z-[999] left-1/2 mt-10 transform -translate-x-1/2">
            <div className="flex justify-around items-center h-full">
                <div className="w-6/12 cursor-pointer">
                    <div onClick={() => navigate('/')}  className={`text-center rounded-3xl w-11/12 ml-4 flex justify-center items-center h-10 ${isMapView ? 'bg-burnt-coral' : ''}`}>
                        Map View
                    </div>
                </div>

                <div className="w-6/12 cursor-pointer">
                    <div onClick={() => navigate('/statistics')} className={`text-center rounded-3xl w-11/12 mr-4 flex justify-center items-center h-10 ${!isMapView ? 'bg-burnt-coral' : ''}`}>
                        Statistics
                    </div>
                </div>

            </div>
        </div>
    );
}



export default NavBar;