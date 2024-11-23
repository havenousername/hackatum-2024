import Select from "react-select";


const SingleSelect = ({ value, options }) => {
    return (
        <Select value={value} options={options} onChange={(v) => console.log(v)} />
    );
};


export default SingleSelect;