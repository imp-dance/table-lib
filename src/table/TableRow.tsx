import React from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";

type RowProps = {
  key?: string | number;
  className?: string;
  clickable?: boolean;
  label?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

const Row: React.FC<RowProps> = ({
  className,
  children,
  clickable,
  label,
  style,
  onClick,
}) => {
  const rowStyles = classNames(styles.tr, className, {
    [styles.clickable]: clickable,
  });

  const keyDownWrapper = (e: React.KeyboardEvent) => {
    if (clickable) {
      if (e.key === " " || e.key === "Enter") {
        onClick && onClick();
      }
    }
  };

  const props = {
    className: rowStyles,
    tabIndex: clickable ? 0 : undefined,
    "aria-label": label,
    onKeyDown: keyDownWrapper,
    onClick,
    style,
  };

  return <tr {...props}>{children}</tr>;
};

export default Row;
