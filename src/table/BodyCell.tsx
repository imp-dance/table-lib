import React from "react";

import styles from "./styles.module.scss";
import classNames from "classnames";

type CellProps = {
  className?: string;
  ellipsis?: boolean;
  title?: string;
  style?: React.CSSProperties;
  fullWidth?: boolean;
  focusable?: boolean;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
};
const BodyCell: React.FC<CellProps> = (props) => {
  const {
    className,
    ellipsis,
    style,
    title,
    fullWidth,
    focusable,
    onClick,
    onKeyDown,
    children,
  } = props;

  const cellStyles = classNames(styles.cell, className, {
    [styles.ellipsis]: ellipsis,
    [styles.fullWidth]: fullWidth,
  });

  const keyDownWrapper = (e: React.KeyboardEvent) => {
    if (focusable) {
      if (e.key === " " || e.key === "Enter") {
        onClick && onClick();
      }
      onKeyDown && onKeyDown(e);
    } else {
      onKeyDown && onKeyDown(e);
    }
  };

  const tdProps = {
    className: cellStyles,
    onKeyDown: keyDownWrapper,
    tabIndex: focusable ? 0 : undefined,
    style,
    onClick,
  };

  return (
    <td {...tdProps}>
      {ellipsis && (
        <span title={title || children?.toString()}>{children}</span>
      )}
      {!ellipsis && children}
    </td>
  );
};

export default BodyCell;
