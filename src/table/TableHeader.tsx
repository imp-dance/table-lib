import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

type HeaderProps = {
  className?: string;
  key?: string;
  onClick?: Function;
};
const Header: React.FC<HeaderProps> = ({ className, key, children }) => {
  const headerStyles = classNames(styles.thead, className);

  return (
    <thead className={headerStyles} key={key}>
      {children}
    </thead>
  );
};

export default Header;
