# @impedans/table

This package hasn't been published yet and is in progress.

## Usage

```tsx
import Table, { useSortTable } from "@impedans/table"; // not available yet

export default function App(){
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState(null);
  const [sortedList, Th] = useSortTable(list);
  
  useEffect(() => {
    let mounted = true;
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        if (mounted){
          setLoading(false);
          setItems(data);
        }
      })
      .catch((e) => console.error(e));
    return () => {
      mounted = false;
    }
  }, []);
  return (
    <Table colSizes={[1, 10, 1]} loading={loading}>
      <Table.Header>
        <Table.Row>
          <Th objectKey="id">ID</Th>
          <Th objectKey="title">Title</Th>
          <Th 
            objectKey="completed"
            sortFunc={(k) => (a, b) => (a[k] ? -1 : 1)}
          >
            Done
          </Th>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sortedItems.map((item) => (
          <Table.Row>
            <Table.Cell>{item.id}</Table.Cell>
            <Table.Cell
              ellipsis
              title={item.title}
              style={{ minWidth: "300px" }}
            >
              <strong>{item.id}</strong>
            </Table.Cell>
            <Table.Cell>
              <i>{item.completed ? "✔" : "✗"}</i>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  )

}

```

## Exports

* **Table** (*default*): Table wrapper component
  * **Table.Header**: Table header (`<thead>`)
  * **Table.Body**: Table body (`<tbody>`)
  * **Table.Row**: Table row (`<tr>`)
  * **Table.SkeletonRow**: Table skeleton row (used for loading state)
  * **Table.Cell**: Table cell (`<td>`)
  * **Table.HeadCell**: Table header cell (`<th>`)
* **useSortTable**: Hook for sorting by clicking the headcell. 

## API

### Table
Wrapper component. It's very important that you keep the structure and hierarchy of the components. This component deals with setting up the grid, removing extra columns, etc.
#### Props
| Key             | Description                                                                       | Type            |
|-----------------|-----------------------------------------------------------------------------------|-----------------|
| **loading**     | Loading state of the table                                                        | boolean         |
| **loadingRows** | Amount of rows to display as skeletons (default: 3)                               | number          |
| **colSizes**    | Array of column sizes (as fractions) (default 1 for each heading) (left to right) | Array\<number\> |

### Table.Header
Container for header row. The amount of HeadCells present will determine the amount of columns in the table. You can put empty `<th>`s in there if you need to.

### Table.Row
Container for tablecells. Won't render more cells than present in the tableheader. 
#### Props
| Key           | Description                                                                       | Type          |
|---------------|-----------------------------------------------------------------------------------|---------------|
| **clickable** | Gives the cell a hover effect, as well as keydown events.                         | boolean       |
| **onClick**   | Function that runs on click or on keydown (space / enter)                         | () => void    |

### Table.SkeletonRow
Renders a skeleton row
#### Props
| Key         | Description                                                                       | Type          |
|-------------|-----------------------------------------------------------------------------------|---------------|
| **cols**    | The amount of columns in the row                                                  | number        |

### Table.Cell
A tablecell (`<td>`) with some helper props
#### Props
| Key           | Description                                                             | Type            |
|---------------|-------------------------------------------------------------------------|-----------------|
| **ellipsis**  | Determines if the cell should allow ellipsis (requires min-width style) | boolean         |
| **fullWidth** | Determines if the cell should take up the entire row                    | boolean         |
| **focusable** | Determines if the cell should have a tabIndex                           | boolean         |
| **onClick**   | Runs on click and on keydown (space / enter) if focusable               | (event) => void |
| **onKeyDown** | Runs on keydown                                                         | (event) => void |


### Table.HeadCell
A table headcell (`<th>`).

### useSortTable
A hook that allows you to automatically sort on header click.
// TODO: add more docs
