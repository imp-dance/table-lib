import React from "react";
import Table from "./table";
import "./App.scss";

export default function App() {
  return (
    <div className="App">
      <h1>@impedans/table</h1>
      <Table className="testTable" colSizes={[1, 5, 1]}>
        <Table.Header>
          <Table.Row>
            <Table.HeadCell>Hiya</Table.HeadCell>
            <Table.HeadCell>Hiya</Table.HeadCell>
            <Table.HeadCell>Hiya</Table.HeadCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row clickable>
            <Table.Cell>Hiya</Table.Cell>
            <Table.Cell>Hiya</Table.Cell>
            <Table.Cell>Hiya</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell fullWidth>
              I'm full width baby!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Hiya</Table.Cell>
            <Table.Cell>Hiya</Table.Cell>
            <Table.Cell
              ellipsis
              style={{ maxWidth: "100px", minWidth: "50px" }}
            >
              I am way too long for this
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Hiya</Table.Cell>
            <Table.Cell>Hiya</Table.Cell>
            <Table.Cell>Hiya</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}
