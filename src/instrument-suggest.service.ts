import { Suggest } from "./model";

const suggestList: Suggest[] = [
  { title: "Apple", symbol: "AAPL" },
  { title: "Microsoft", symbol: "MSFT" },
  { title: "Tesla", symbol: "TSLA" },
  { title: "Amazon", symbol: "AMZN" },
  { title: "Ford", symbol: "F" },
  { title: "Uber Technologies, Inc.", symbol: "UBER" },
  { title: "Alphabet Inc", symbol: "GOOG" }
];

const contains = (str: string, query: string): boolean => {
  return str.toLowerCase().search(query) !== -1;
};

export interface SuggestSerivce {
  getSuggests(query: string): Promise<Suggest[]>;
}

const newSuggestService = (): SuggestSerivce => {
  const getSuggests = (query: string) => {
    return new Promise<Suggest[]>((res) => {
      setTimeout(() => {
        if (!query) {
          res([]);
        }
        const normalizedQuery = query.toLowerCase();
        const filtered = suggestList.filter(
          (s) =>
            contains(s.title, normalizedQuery) ||
            contains(s.symbol, normalizedQuery)
        );
        res(filtered);
      }, 500);
    });
  };

  return { getSuggests };
};

export const suggestService = newSuggestService();
