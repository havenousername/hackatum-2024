

const Statistics = () => {

    return (
        <div className="w-full h-screen relative bg-charcoal-gray">
            <div className="pt-[3rem] pl-[6rem] flex">
                <h6>Simulation running for</h6>
                <span className="pl-14">10 min 23 sec</span>
            </div>
            <div className="pt-[0.75rem] pl-[6rem] flex">
                <div className="w-28 rounded text-center font-bold cursor-pointer bg-burnt-coral"> <span>Stop</span></div>
                <h6 className="pl-14">until</h6>
                <span className="pl-14">21 minutes</span>
            </div>
        </div>
    );
};

export default Statistics;