import { useEffect, useState } from "react";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

const Slider = ({ min = 0, max = 100, step = 1, value = 50, onChange }) => {

  const handleChange = (value) => {
    const newValue = value;
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="w-full mx-0 py-3">
      <RangeSlider id='range-slider' min={min} max={max} step={step} value={[0, value]} onInput={(v) => {
        handleChange(v[1])
      }}/>
    </div>
  );
};

export default Slider;
