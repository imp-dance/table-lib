import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

type TableBodyProps = {
  className?: string;
};

export const TableBody: React.FC<TableBodyProps> = ({
  className,
  children,
}) => {
  const bodyStyles = classNames(styles.tbody, className);

  return <tbody className={bodyStyles}>{children}</tbody>;
};

export default TableBody;
