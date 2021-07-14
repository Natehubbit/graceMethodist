import React, { FC } from "react";

interface CardProps {
  title: string;
  value: string;
  color?: string;
}

const Card: FC<CardProps> = ({ title, value, color }) => {
  return (
    <div className="flex flex-col bg-white p-5 w-full cursor-pointer">
      <header className="text-xs font-bold mb-5">{title}</header>
      <div className="">
        <div
          className={`text-2xl  font-thin ${
            color ? color : "text-purple-500"
          }`}
        >
          {value}
        </div>
      </div>
    </div>
  );
};

export default Card;
