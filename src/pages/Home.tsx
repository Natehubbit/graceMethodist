import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Suggestion } from "../@types/index";
import Button from "../components/Button";
import Layout from "../components/Layout/index";
import Panel from "../components/Panel";
import SuggestionService from "../services/SuggestionService";

const Home = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>(
    []
  );
  const [pageNo, setPageNo] = useState(10);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>();
  const showLoadMore = pageNo <= suggestions.length;
  const getSuggestions = useCallback(async () => {
    setLoading(true);
    const data = await SuggestionService.get(pageNo);
    if (data) {
      setSuggestions(data);
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setLoading]);
  useEffect(() => {
    getSuggestions();
  }, [getSuggestions]);
  const onLoadMore = async () => {
    const page = pageNo + 10;
    const data = await SuggestionService.get(page);
    if (data) {
      setSuggestions(data);
    }
    setPageNo(page);
  };
  return (
    <Layout>
      <div ref={scrollRef as any} className="relative w-full">
        <Panel loading={loading} data={suggestions} />
        {showLoadMore && (
          <div className="w-full flex justify-center items-center p-5">
            <Button
              onClick={onLoadMore}
              mode="outline"
              className="w-2/3 flex justify-center items-center h-10 text-lg"
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
