import Select from "react-select";
import '../assets/select.css'


const SingleSelect = ({ value, options, onChange, ...props }) => {
    return (
        <Select 
            classNamePrefix="single-select" 
            value={value}
            options={options} 
            onChange={(v) => onChange(v)} 
            className="max-w-[11rem] w-full rounded-3xl bg-[#2E2E2E]"
            {...props}
        />
    );
};


export default SingleSelect;