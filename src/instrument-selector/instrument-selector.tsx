import React, { memo, useLayoutEffect, useState } from "react";
import { Input } from "../input/input.component";
import { PopoverStyled } from "./instrument-selector.styled";
import { InstrumentSelectorItem, Option } from "./instrument-selector-item";

export interface InstrumentSelectorProps {
  query: string;
  onQueryChange: (value: string) => void;
  options: Option[];
  onOptionToggle: (value: string) => void;
}

export const InstrumentSelector = memo((props: InstrumentSelectorProps) => {
  const { query, onQueryChange, options, onOptionToggle } = props;
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const openPopover = () => {
    setIsPopoverOpen(true);
  };

  useLayoutEffect(() => {
    setIsPopoverOpen(true);
  }, [options, isFocused, setIsPopoverOpen]);

  return (
    <div>
      <Input
        ref={setInputRef}
        value={query}
        onValueChange={onQueryChange}
        onFocus={() => {
          setIsFocused(true);
          openPopover();
        }}
        onBlur={() => {
          setIsFocused(false);
          closePopover();
        }}
        placeholder={"Start typing a ticker, e.g. AAPL"}
        autoFocus
      />
      {inputRef && isPopoverOpen && options.length && (
        <PopoverStyled
          anchor={inputRef}
          onRequestClose={() => {
            if (!isFocused) {
              setIsPopoverOpen(false);
            }
          }}
        >
          {options.map((option) => (
            <InstrumentSelectorItem
              option={option}
              onOptionToggle={onOptionToggle}
            />
          ))}
        </PopoverStyled>
      )}
    </div>
  );
});
