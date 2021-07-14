import Suggestion from "../Suggestion";
import { Suggestion as SuggestionType } from "../../@types/index";
import { FC } from "react";

interface PanelProps {
  data: SuggestionType[];
  loading: boolean;
}

const Panel: FC<PanelProps> = ({ loading, data }) => {
  return (
    <div className="bg-white flex-1 w-full">
      <div className="border-b-2 border-gray-200 py-2">
        <header className="font-bold text-lg px-2">
          Suggestions
        </header>
      </div>
      {loading ? (
        <p>loading...</p>
      ) : (
        <div>
          {data.map((s, i) => {
            return <Suggestion data={s} key={i} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Panel;
