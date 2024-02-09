import React, { useState } from "react";
import ClearInput from "../partials/ClearInput";

export default ({
  type = "text",
  id = "input",
  value = "",
  onChange = () => {},
  onBlur = () => {},
  isFocus = false,
  readOnly = false,
  setRef = null,
  placeholder = "",
  resetClass = false,
  customClass = "",
  clearInput = {
    show: true,
    customClass: "",
  },
}) => {
  const defaultClass = `bg-transparent rounded border border-gray-600 focus:ring-2 focus:ring-teal-800 focus:bg-transparent focus:border-teal-800 text-base transition-all outline-none text-gray-100 py-2 pl-2 pr-8 duration-200 ease-in-out`;
  const focus = () => {
    setRef.current.focus();
  };

  return (
    <span className="relative w-full">
      <input
        ref={setRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        autoFocus={isFocus}
        readOnly={readOnly}
        type={type}
        id={id}
        placeholder={placeholder}
        className={`w-full ${!resetClass && defaultClass} ${customClass}`}
      />
      {value && clearInput.show && (
        <ClearInput
          clear={onChange}
          focus={setRef && focus}
          customClass={clearInput.customClass}
        />
      )}
    </span>
  );
};
