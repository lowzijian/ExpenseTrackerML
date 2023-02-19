import { useEffect, useState } from "react";
import { ReloadLogo } from "../assets/icons";
import { debounce } from "lodash";

interface Quote {
  author: string;
  id: number;
  quote: string;
}

const renderContent = (
  error: Error | null,
  data: Quote | null,
  isLoading: boolean
) => {
  if (isLoading) {
    return (
      <p className="text-base text-gray-500">Fetching from dummyJSON ...</p>
    );
  }
  if (error) {
    return <p className="text-sm text-slate-400">{error.message}</p>;
  } else if (data) {
    return (
      <>
        <blockquote className="text-lg font-normal italic text-white">
          <p>"{data.quote}"</p>
        </blockquote>
        <p className="text-center font-medium text-green-200">{data.author}</p>
      </>
    );
  }
};

const Quotes = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchNewQuote = async (signal: AbortSignal) => {
    try {
      setIsLoading(true);
      // https://dummyjson.com/
      const response = await fetch("https://dummyjson.com/quotes/random", {
        signal,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setQuote(data);
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.log("Fetch request was aborted");
      } else {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const debounceFetchNewQuote = debounce(fetchNewQuote, 1000);

  const handleRefresh = () => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setIsLoading(true);
    debounceFetchNewQuote(signal);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetchNewQuote(signal);
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className="mb-2 flex flex-row justify-between rounded-md border border-gray-500 bg-gray-800 p-4">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        {renderContent(error, quote, isLoading)}
      </div>
      <button
        type="button"
        className="group relative inline-flex h-8 w-8 items-center justify-center text-center text-sm font-medium text-white focus:outline-none disabled:pointer-events-none disabled:opacity-75"
        onClick={handleRefresh}
        disabled={isLoading}
      >
        <ReloadLogo className="h-6 w-6 duration-300 ease-in-out group-hover:rotate-90" />
        <span className="sr-only">Refresh Icon</span>
        <span className="invisible absolute left-0 right-0 m-auto h-8 w-8 rounded-full bg-slate-500/25 group-hover:visible"></span>
      </button>
    </div>
  );
};

export default Quotes;
