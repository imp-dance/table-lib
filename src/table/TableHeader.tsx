import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

type HeaderProps = {
  className?: string;
  onClick?: Function;
};
const Header: React.FC<HeaderProps> = ({ className, children }) => {
  const headerStyles = classNames(styles.thead, className);

  return <thead className={headerStyles}>{children}</thead>;
};

export default Header;
