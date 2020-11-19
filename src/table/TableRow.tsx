import React from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";

type RowProps = {
  key?: string | number;
  className?: string;
  clickable?: boolean;
  label?: string;
  onClick?: () => void;
};

const Row: React.FC<RowProps> = ({
  className,
  children,
  clickable,
  label,
  onClick,
}) => {
  const rowStyles = classNames(styles.tr, className, {
    [styles.clickable]: clickable,
  });

  return (
    <tr
      className={rowStyles}
      aria-label={label}
      onClick={onClick}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (clickable) {
          if (e.key === " " || e.key === "Enter") {
            onClick && onClick();
          }
        }
      }}
    >
      {children}
    </tr>
  );
};

export default Row;
