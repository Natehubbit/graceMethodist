import React, { FC, InputHTMLAttributes } from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={`border-2 py-1 px-2 rounded-md mb-3 ring-blue-500 focus:ring-2 focus:outline-none ${className}`}
    />
  );
};

export default Input;
