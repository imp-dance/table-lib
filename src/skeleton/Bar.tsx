// Deps
import React, { useMemo } from "react";
import classNames from "classnames";
// Locals
import styles from "./styles.module.scss";

type SkeletonBarProps = {
  width?: number | string;
  height?: number | string;
};

const SkeletonBar: React.FC<SkeletonBarProps> = ({ width, height }) => {
  const skeletonClass = classNames(styles.bar, styles.skeleton);

  const skeletonWidth = useMemo(
    () =>
      width ??
      Math.max(Math.min(Math.floor(Math.random() * 100), 100), 50) + "%",
    [width]
  );

  return (
    <div className={skeletonClass} style={{ width: skeletonWidth, height }} />
  );
};

export default SkeletonBar;
