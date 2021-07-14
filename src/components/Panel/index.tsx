import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { X } from "react-feather";
import { Suggestion as SuggestionType } from "../../@types/index";
import SuggestionService from "../../services/SuggestionService";
import Suggestion from "../Suggestion";

interface PanelProps {
  data: SuggestionType[];
  loading: boolean;
}

const Panel: FC<PanelProps> = ({ loading, data }) => {
  const [filterLoading, setFilterLoading] = useState(false);
  const fromRef = useRef<any>();
  const toRef = useRef<any>();
  const [range, setRange] = useState<{
    from: Date | null;
    to: Date | null;
  }>({ from: null, to: null });
  const [rangeData, setRangeData] = useState<SuggestionType[]>(
    []
  );
  const hasRange = range.from && range.to;
  const suggestions = hasRange ? rangeData : data;
  const hasNoData = suggestions.length < 1;
  const onSelectDate = (
    e: ChangeEvent<HTMLInputElement>,
    type: "to" | "from"
  ) => {
    const { value } = e.target;
    return setRange((r) => ({ ...r, [type]: new Date(value) }));
  };
  const onClearRange = () => {
    setRange({ from: null, to: null });
    if (toRef && fromRef) {
      toRef.current.value = "";
      fromRef.current.value = "";
    }
  };
  const fetchRangedData = useCallback(async () => {
    console.log("FETCHING");
    if (range.from && range.to) {
      setFilterLoading(true);
      const data = await SuggestionService.getByRange(
        10,
        range.from,
        range.to
      );
      data && setRangeData(data);
      setFilterLoading(false);
      console.log("FETCHED");
    }
  }, [range]);
  useEffect(() => {
    fetchRangedData();
  }, [range, fetchRangedData]);

  return (
    <>
      <div className="bg-white flex-1 w-full">
        <div className="border-b-2 border-gray-200 flex justify-between py-2 px-2">
          <header className="font-bold text-lg">
            Suggestions
          </header>
          <div className="space-x-5 flex">
            <label>
              From:{" "}
              <input
                ref={fromRef}
                className="focus:ring-2 rounded-full border-2 px-2 outline-none opacity-60"
                type="date"
                onChange={(e) => onSelectDate(e, "from")}
              />
            </label>
            <label>
              To:{" "}
              <input
                ref={toRef}
                className="focus:ring-2 rounded-full border-2 px-2 outline-none opacity-60"
                type="date"
                onChange={(e) => onSelectDate(e, "to")}
              />
            </label>
            <button
              onClick={onClearRange}
              className="flex hover:opacity-60 border-2 px-1 border-red-400 rounded-full items-center text-red-400"
            >
              clear
              <span className="text-xs text-red-400">
                <X className="h-4" />
              </span>
            </button>
          </div>
        </div>
        {!(loading || filterLoading) && (
          <div>
            {suggestions.map((s, i) => {
              return <Suggestion data={s} key={i} />;
            })}
          </div>
        )}
      </div>
      {(loading || filterLoading) && (
        <p className="text-center p-10 text-gray-500">
          Loading...
        </p>
      )}
      {hasNoData && !filterLoading && !loading && (
        <p className="text-center p-10 text-gray-500">
          No Suggestions found...
        </p>
      )}
    </>
  );
};

export default Panel;
