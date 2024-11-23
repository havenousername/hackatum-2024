import { useState } from "react";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

const Slider = ({ min = 0, max = 100, step = 1, value = 50, onChange }) => {
  const [sliderValue, setSliderValue] = useState(value);

  const handleChange = (value) => {
    const newValue = value;
    setSliderValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <RangeSlider id='range-slider' min={min} max={max} step={step} value={[0, sliderValue]} onInput={(value) => {
        handleChange(value[1])
      }}/>
    </div>
  );
};

export default Slider;
