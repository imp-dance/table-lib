import React from "react";
import TableRow from "./TableRow";
import TableCell from "./BodyCell";
import getUniqueId from "lodash.uniqueid";

const SkeletonBar = () => {
  return <div>loading</div>;
};

const TableSkeletonRow: React.FC<{ cols: number }> = ({ cols }) => {
  const tableCols = [];
  for (let i = 0; i < cols; i++) {
    tableCols.push(
      <TableCell key={`tableCell-${getUniqueId()}`}>
        <SkeletonBar />
      </TableCell>
    );
  }
  return <TableRow>{tableCols}</TableRow>;
};

export default TableSkeletonRow;
