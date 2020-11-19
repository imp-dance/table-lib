import React from "react";
import TableSkeletonRow from "./TableSkeletonRow";
import styles from "./styles.module.scss";

import classNames from "classnames";
import getUniqueId from "lodash.uniqueid";

export type TableProps = {
  className?: string;
  caption?: React.ReactNode;
  loading?: boolean;
  colSizes?: Array<number | null>;
  loadingRows?: number;
};

function removeExtraColumns(
  tableBody: React.ReactElement,
  amountOfColumns: number
) {
  const removeExtraColumnsFromRow = (row: React.ReactElement) => {
    return row
      ? React.cloneElement(row, {
          children: React.Children.map(row.props.children, (child, index) => {
            if (index < amountOfColumns) {
              return child;
            } else {
              console.error(
                "Table: Row has more columns than header, extra column(s) were removed"
              );
            }
          }),
        })
      : null;
  };

  return React.cloneElement(tableBody, {
    children: React.Children.map(tableBody.props.children, (child) =>
      removeExtraColumnsFromRow(child)
    ),
  });
}

function getAmountOfColumns(node: React.ReactNode) {
  if (!node) {
    return 0;
  }
  let headerNode: React.ReactElement | null = null; // <TableHeader />
  let headerChild: React.ReactElement | null = null; // <tr />

  if (Array.isArray(node)) {
    node.forEach?.((child: React.ReactNode) => {
      if (
        React.isValidElement(child) &&
        typeof child.type !== "string" &&
        child?.type?.name === "Header"
      ) {
        headerNode = child;
      }
    });
  }

  if (
    headerNode &&
    React.isValidElement(headerNode) &&
    typeof (headerNode as React.ReactElement).type !== "string"
  ) {
    const possibleChild = (headerNode as React.ReactElement).props.children;
    if (!Array.isArray(possibleChild) && React.isValidElement(possibleChild)) {
      headerChild = possibleChild;
    } else {
      headerChild = possibleChild[0];
    }
  }

  if (
    headerChild &&
    React.isValidElement(headerChild) &&
    Array.isArray((headerChild as React.ReactElement).props.children)
  ) {
    return (headerChild as React.ReactElement).props.children.length;
  }
}

const Table: React.FC<TableProps> = ({
  loading,
  caption,
  className,
  children,
  colSizes: defaultSizes,
  loadingRows,
}) => {
  const tableClassName = classNames(className, styles.table);

  const amountOfColumns = getAmountOfColumns(children);
  const sizes: Array<number | null> = [];
  for (let i = 0; i < amountOfColumns; i++) {
    sizes.push(1);
  }
  const colSizes = defaultSizes ?? sizes;

  if (colSizes.length < amountOfColumns) {
    for (let i = colSizes.length; i < amountOfColumns; i++) {
      colSizes.push(1); // Adds 1fr for each unspecified size
    }
  }

  colSizes.length = amountOfColumns; // Removes extra columns from specified sizes

  const CSSVariables = {
    "--columns": colSizes.join("fr ") + "fr",
  } as React.CSSProperties;

  return (
    <table className={tableClassName} style={CSSVariables}>
      {caption && <caption className={styles.caption}>{caption}</caption>}
      {children &&
        React.Children.map(children, (child) => {
          if (
            React.isValidElement(child) &&
            typeof child.type !== "string" &&
            child.type.name === "TableBody"
          ) {
            if (loading) {
              const children = [];
              if (!loadingRows) {
                loadingRows = 3;
              }
              for (let i = 0; i < loadingRows; i++) {
                children.push(
                  <TableSkeletonRow
                    cols={amountOfColumns}
                    key={`loading${getUniqueId()}`}
                  />
                );
              }
              return React.cloneElement(child, {
                children,
              });
            }
            return removeExtraColumns(child, amountOfColumns);
          } else if (React.isValidElement(child)) {
            return React.cloneElement(child);
          } else {
            return child;
          }
        })}
    </table>
  );
};

export default Table;
