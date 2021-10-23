import { debounceTime, filter, map, Observable, of, skip, switchMap } from "rxjs";
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

const rawData = of(suggestList);

const SUGGEST_DEBOUNCE_TIMEFRAME = 1000;

export interface SuggestService {
    getSuggectionFeed(queryObs: Observable<string>): Observable<Suggest[]>;
  }

class RxJsSuggestable implements SuggestService {
    getSuggectionFeed(queryObs: Observable<string>): Observable<Suggest[]> {
        return queryObs.pipe(
            debounceTime(SUGGEST_DEBOUNCE_TIMEFRAME),
            switchMap(substring => 
                rawData.pipe(
                    map(data => data.filter(item => item.symbol.includes(substring) || item.title.includes(substring)))
                ))
          )
    }

} 

const autocomplete = (time: number) => (source$: Observable<string>) =>
  source$.pipe(
    debounceTime(time),
    switchMap(substring => 
        rawData.pipe(
            map(data => data.filter(item => item.symbol.includes(substring) || item.title.includes(substring)))
        ))
  )