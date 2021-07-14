import React, { ButtonHTMLAttributes, FC } from "react";
import { ReactComponent as Loader } from "../../assets/images/loader.svg";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  mode?: "outline" | "solid";
  loading?: boolean;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  children,
  mode,
  onClick,
  className,
  disabled,
  loading,
  ...props
}) => {
  const isOutline = mode === "outline";
  const getDisabledStyle = () => {
    let newStyle = "";
    if (disabled) {
      newStyle = `bg-gray-200 text-gray-400`;
    } else {
      if (isOutline) {
        newStyle = `border-2 border-blue-500 text-blue-500`;
      } else {
        newStyle = `bg-blue-500 text-white`;
      }
      newStyle = `${newStyle} hover:opacity-50`;
    }
    return newStyle;
  };
  return (
    <button
      {...props}
      disabled={disabled}
      onClick={onClick}
      className={`px-3 py-1 focus:ring-2 ring-blue-200 mb-5 text-sm ${getDisabledStyle()} flex items-center rounded-md focus:ring-blue-200 ${className}`}
    >
      {loading && <Loader />}
      {children}
    </button>
  );
};

export default Button;
