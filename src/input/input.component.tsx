import React, {
  memo,
  useCallback,
  ChangeEventHandler,
  forwardRef,
  InputHTMLAttributes
} from "react";
import { StyledInput } from "./input.styled";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  placeholder: string;
  onValueChange: (value: string) => void;
}

export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { value, onValueChange, ...inputProps } = props;

    const handleValueChange: ChangeEventHandler<HTMLInputElement> = useCallback(
      (e) => {
        onValueChange(e.target.value);
      },
      [onValueChange]
    );
    return (
      <StyledInput
        ref={ref}
        value={value}
        onChange={handleValueChange}
        {...inputProps}
      />
    );
  })
);
