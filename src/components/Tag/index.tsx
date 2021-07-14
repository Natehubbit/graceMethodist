import React, { FC } from "react";

interface TagsProps {
  text: string;
}

export const Tag: FC<TagsProps> = ({ text }) => {
  return (
    <span className="text-sm bg-gray-200 hover:bg-gray-500 hover:text-white cursor-pointer px-2 py-1 rounded-full ">
      {text}
    </span>
  );
};
