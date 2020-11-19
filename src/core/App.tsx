import React, { useEffect, useState } from "react";
import Table, { useSortTable } from "../table";
import "./App.scss";

type Item = {
  id: number;
  title: string;
  completed: boolean;
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Array<Item> | null>(null);
  const [sortedItems, Th] = useSortTable(
    items,
    (a, b) => (a.id > b.id ? 1 : -1) // default sort function, initial sort
  );

  const checkItem = (id: number) => {
    const newItems = sortedItems ? [...sortedItems] : [];
    for (let i in newItems) {
      if (newItems[i].id === id) {
        newItems[i].completed = !newItems[i].completed;
      }
    }
    setItems(newItems);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setItems(data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="App">
      <h1>@impedans/table</h1>
      <p>
        <label>
          <input
            type="checkbox"
            checked={loading}
            onChange={() => setLoading(!loading)}
          />{" "}
          Toggle loading
        </label>
      </p>
      <div className="tableContainer">
        <Table
          className="table"
          colSizes={[1, 10, 1]}
          loading={loading}
          loadingRows={50}
        >
          <Table.Header>
            <Table.Row
              onClick={() => {
                const el = document.querySelector(".table");
                if (el) {
                  el.scrollTop = 0;
                }
              }}
            >
              <Th objectKey="id">ID</Th>
              <Th objectKey="title">Title</Th>
              <Th
                objectKey="completed"
                sortFunc={() => {
                  return (a, b) => {
                    return a.completed ? -1 : 1;
                  };
                }}
              >
                Completed
              </Th>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {sortedItems?.map((item, index) => (
              <Table.Row
                clickable
                onClick={() => checkItem(item.id)}
                className={item.completed ? "checked" : ""}
                key={`item-${item.id}`}
                style={{ "--i": index } as React.CSSProperties}
              >
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell
                  ellipsis
                  focusable
                  onKeyDown={(e) => e.key === " " && e.preventDefault()}
                  style={{ minWidth: "300px" }}
                  title={item.title}
                >
                  <strong>{item.title}</strong>
                </Table.Cell>
                <Table.Cell className="checkCell">
                  <i>{item.completed ? "✔" : "✗"}</i>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
