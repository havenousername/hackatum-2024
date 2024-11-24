const NumberInput = ({ label, value, onChange, placeholder = "0", max = 100, className }) => {
    return (
      <div className={`flex flex-col space-y-2 relative ${className}`}>
        <label htmlFor="number-input" className="text-normal text-white absolute top-[10%] right-[30%]">
          {label}
        </label>
        <input
          id="number-input"
          type="number"
          value={value}
          onKeyDown={e => {
            if (value > max) {
                onChange(max);
                e.preventDefault();
                return;
            }
          }}
          min={0}
          onChange={e => onChange(+e.target.value)}
          placeholder={placeholder}
          max={max}
          className="px-4 py-2 border border-t-0 border-x-0 border-b-1 bg-transparent outline-none  transition duration-200 ease-in-out max-h-[30px]"
          style={{
            margin: '0px'
          }}
        />
      </div>
    );
  };


  export default NumberInput;