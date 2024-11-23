import { useState } from "react";

const Slider = ({ min = 0, max = 100, step = 1, value = 50, onChange }) => {
  const [sliderValue, setSliderValue] = useState(value);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSliderValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <input
        id="slider"
        type="range"
        min={min}
        max={max}
        step={step}
        value={sliderValue}
        onChange={handleChange}
        className="slider"
      />
    </div>
  );
};

export default Slider;
