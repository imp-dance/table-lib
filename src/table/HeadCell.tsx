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
  const props = {
    className: cellStyles,
    onClick,
    onKeyDown,
    tabIndex,
  };
  return (
    <th
      {...props}
      onKeyDown={
        clickable
          ? (e: React.KeyboardEvent) => {
              if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                onClick && onClick();
              }
              onKeyDown && onKeyDown(e);
            }
          : onKeyDown
      }
    >
      {children}
    </th>
  );
};

export default HeadCell;
