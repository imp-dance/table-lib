import React from "react";

import styles from "./styles.module.scss";
import classNames from "classnames";
type CellProps = {
  className?: string;
  index?: number;
  onClick?: () => void;
  clickable?: boolean;
  tabIndex?: number;
  onKeyDown?: (e: React.KeyboardEvent) => void;
};

const HeadCell: React.FC<CellProps> = ({
  className,
  children,
  clickable,
  tabIndex,
  onClick,
  onKeyDown,
}) => {
  const cellStyles = classNames(styles.th, className, {
    [styles.clickable]: clickable,
  });

  const keyDownWrapper = (e: React.KeyboardEvent) => {
    if (clickable) {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        onClick && onClick();
      }
    } else {
      onKeyDown && onKeyDown(e);
    }
  };

  const props = {
    className: cellStyles,
    onKeyDown: keyDownWrapper,
    onClick,
    tabIndex,
  };

  return <th {...props}>{children}</th>;
};

export default HeadCell;
