import React, { MouseEvent, memo, useCallback } from "react";
import { InstrumentSelectorItemStyled } from "./instrument-selector.styled";

export interface Option {
  title: string;
  value: string;
  isSelected: boolean;
}

export interface InstrumentSelectorItemProps {
  option: Option;
  onOptionToggle: (value: string) => void;
}

export const InstrumentSelectorItem = memo(
  (props: InstrumentSelectorItemProps) => {
    const { option, onOptionToggle } = props;
    const { title, value, isSelected } = option;
    const handleChange = useCallback(
      (e: { stopPropagation: () => void }) => {
        onOptionToggle(value);
        e.stopPropagation();
      },
      [value, onOptionToggle]
    );
    return (
      <InstrumentSelectorItemStyled onClickCapture={handleChange}>
        <input id={value} type="checkbox" checked={isSelected} />
        <span>{`${value} (${title})`}</span>
      </InstrumentSelectorItemStyled>
    );
  }
);
