import { Options, VirtualElement } from "@popperjs/core";
import React, { memo, ReactNode, useMemo, useState } from "react";
import { usePopper } from "react-popper";
import { PopoverContainerStyled } from "./popover.styled";
import { useClickOutside } from "../utils";

export interface PopoverProps {
  anchor: VirtualElement;
  children: ReactNode;
  onRequestClose: () => void;
  className?: string;
}

const defaultOptions: Options = {
  placement: "bottom-start",
  strategy: "absolute",
  modifiers: [
    {
      name: "flip",
      enabled: true
    }
  ]
};

export const Popover = memo((props: PopoverProps) => {
  const { anchor, children, className, onRequestClose } = props;
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { styles, attributes } = usePopper(
    anchor,
    popperElement,
    defaultOptions
  );

  const popperElementRef = useMemo(() => ({ current: popperElement }), [
    popperElement
  ]);
  useClickOutside(popperElementRef, onRequestClose, true);

  return (
    <PopoverContainerStyled
      ref={setPopperElement}
      style={styles.popper}
      {...attributes.popper}
    >
      <div className={className}>{children}</div>
    </PopoverContainerStyled>
  );
});
