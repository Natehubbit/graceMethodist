import _ from "lodash";
import React, { FC, useState } from "react";
import { Suggestion as SuggestionType } from "../../@types";
import { trimText, getTime } from "../../utils/index";
import { Tag } from "../Tag";

interface SuggestionProps {
  data: SuggestionType;
}

const Suggestion: FC<SuggestionProps> = ({ data }) => {
  const [showingMore, setShowingMore] = useState(false);
  const { suggestion, timestamp } = data;
  const { trimmed, text } = trimText(suggestion);
  const time = getTime(timestamp);
  const getTags = () => {
    const tags = _.omit(data, ["suggestion", "timestamp"]);
    const keys = Object.keys(tags).sort();
    return keys.map((k) => {
      const key = k as keyof typeof tags;
      let tag = tags[key];
      if (key === "age") {
        tag = `${tag} years`;
      }
      return <Tag key={tag} text={tag} />;
    });
  };
  const onShowMore = () => {
    setShowingMore(!showingMore);
  };
  return (
    <div className="p-5 hover:bg-blue-50 cursor-pointer border-b-2 border-gray-100">
      <div className="flex justify-between items-center">
        <div className="mb-5 space-x-2">{getTags()}</div>
        <p className="text-gray-500 text-xs">{time}</p>
      </div>
      <div>
        <p className="font-light">
          {showingMore ? suggestion : text}
          {trimmed && !showingMore && "..."}
          {trimmed && (
            <button
              onClick={onShowMore}
              className="text-blue-500 text-sm rounded-md px-2 focus:ring-2 font-bold hover:opacity-80"
            >
              {showingMore ? "read less" : "read more"}
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default Suggestion;
