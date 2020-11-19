import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableSkeletonRow from "./TableSkeletonRow";
import TableBodyCell from "./BodyCell";
import TableHeadCell from "./HeadCell";
import TableComponent, { TableProps } from "./Table";

export { default as useSortTable } from "./useSortTable";
export default class Table extends React.Component<TableProps> {
  static Body = TableBody;
  static Header = TableHeader;
  static Row = TableRow;
  static Cell = TableBodyCell;
  static HeadCell = TableHeadCell;
  static SkeletonRow = TableSkeletonRow;
  render() {
    return (
      <TableComponent {...this.props}>{this.props.children}</TableComponent>
    );
  }
}
