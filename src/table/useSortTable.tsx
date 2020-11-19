import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import HeadCell from "./HeadCell";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TSortFunc = (a: any, b: any) => number;
type TDoSort = (objectKey: string) => TSortFunc;

type TOnClick = (
  sortMethod: TSortMethod,
  objectKey: string,
  signal: AbortSignal
) => void;
type TTh = {
  objectKey: string;
  sortFunc?: TDoSort;
  onClick?: TOnClick;
};

type TSortMethod = null | "DESC" | "ASC";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TReturn = [Array<any> | null, React.FC<TTh>];

const initialAbortController = new AbortController();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useSortTable = (list: Array<any> | null): TReturn => {
  const [sortMethod, setSortMethod] = useState<TSortMethod>(null);
  const [sortedItems, setSortedItems] = useState(list);
  const [currentSort, setCurrentSort] = useState("");
  const [abortController, setAbortController] = useState(
    initialAbortController
  );

  const doSort: TDoSort = (objectKey) => {
    // Sorts alphabetically and numerically
    const sortFunction: TSortFunc = (a, b): number => {
      const type = typeof a[objectKey];
      if (type === "number") {
        return a[objectKey] > b[objectKey] ? 1 : -1;
      } else if (type === "string") {
        return a[objectKey].localeCompare(b[objectKey]);
      } else {
        return 1; // can't automatically sort any other type
      }
    };
    return sortFunction;
  };

  const getNextSortMethod = (objectKey: string): TSortMethod => {
    if (currentSort !== objectKey || sortMethod === null) {
      return "ASC";
    } else if (sortMethod === "ASC") {
      return "DESC";
    } else {
      // sortMethod === "DESC"
      return null;
    }
  };

  const onHeaderClick = (key: string, sortFunc?: TDoSort) => {
    if (list) {
      const sortFunction: TDoSort = sortFunc ?? doSort;
      const sortedItems = [...list].sort(sortFunction(key));
      const nextSortMethod = getNextSortMethod(key);
      if (nextSortMethod === "ASC") {
        setSortedItems(sortedItems);
      } else if (nextSortMethod === "DESC") {
        setSortedItems(sortedItems.reverse());
      } else if (nextSortMethod === null) {
        setSortedItems(list);
      }
      setSortMethod(nextSortMethod);
      setCurrentSort(key);
    }
  };

  const onClickWrapper = (
    onClick: TOnClick | undefined,
    sortFunc: TDoSort | undefined,
    objectKey: string
  ) => {
    if (onClick) {
      abortController.abort();
      const newAbortController = new AbortController();
      setAbortController(newAbortController);
      setCurrentSort(objectKey);
      const nextSortMethod = getNextSortMethod(objectKey);
      setSortMethod(nextSortMethod);
      onClick(nextSortMethod, objectKey, newAbortController.signal);
    } else {
      onHeaderClick(objectKey, sortFunc);
    }
  };

  const Th: React.FC<TTh> = ({ objectKey, sortFunc, onClick, children }) => {
    const className: string = classNames(
      styles.th,
      styles.clickable,
      {
        [styles.desc]: sortMethod === "DESC" && currentSort === objectKey,
      },
      {
        [styles.asc]: sortMethod === "ASC" && currentSort === objectKey,
      }
    );
    return (
      <HeadCell
        clickable
        onClick={() => onClickWrapper(onClick, sortFunc, objectKey)}
        className={className}
        tabIndex={0}
      >
        {children}
      </HeadCell>
    );
  };

  useEffect(() => {
    if (list) {
      setSortedItems(list);
    }
    return () => {
      abortController.abort();
    };
  }, [list]);

  if (!list) {
    const FallBack: React.FC = ({ children }) => (
      <HeadCell>{children}</HeadCell>
    );
    return [null, FallBack];
  }
  return [sortedItems, Th];
};

export default useSortTable;
