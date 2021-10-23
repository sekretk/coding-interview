import React, { useEffect, useState, useCallback } from "react";
import { InstrumentSelector } from "./instrument-selector/instrument-selector";
import { Option } from "./instrument-selector/instrument-selector-item";
import { suggestService } from "./instrument-suggest.service";

import "./styles.css";

export default function App() {
  const [query, setQuery] = useState("");

  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    if (!query) {
      setOptions([]);
      return;
    }
    suggestService.getSuggests(query).then((suggests) => {
      const options: Option[] = suggests.map((s) => ({
        title: s.title,
        value: s.symbol,
        isSelected: false
      }));
      setOptions(options);
    });
  }, [query, setOptions]);

  const handleOptionToggle = (value: string) => {
    const newOptions = options.map((option) => {
      if (option.value !== value) {
        return option;
      }
      return Object.assign(option, { isSelected: !option.isSelected });
    });
    setOptions(newOptions);
  };

  return (
    <div className="App">
      <h1>Ticker finder</h1>
      <h2>Let's search for some tickers!</h2>
      <InstrumentSelector
        query={query}
        onQueryChange={setQuery}
        options={options}
        onOptionToggle={handleOptionToggle}
      />
    </div>
  );
}
