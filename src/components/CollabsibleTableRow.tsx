import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Data } from "./Dashboard";


export default function CollapsibleTableRow(props: { student: Data, isItemSelected: boolean, labelId: string, handleClick: any}) {
  const { student, isItemSelected, labelId, handleClick } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow
        hover
        onClick={(event: any) => handleClick(event, student.id)}
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={student.id}
        selected={isItemSelected}
      >
        <TableCell
            component="th"
            id={labelId}
            scope="row"
        >
            {student.first_name}
        </TableCell>
        <TableCell>{student.last_name}</TableCell>
        <TableCell>{student.points}</TableCell>
        <TableCell>{student.exam_date}</TableCell>
        <TableCell>{student.subject}</TableCell>
        <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
              <h2>Notes</h2>
              <p>{student.notes}</p>
              </Box>
            </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
//   createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
//   createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
//   createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5)
// ];

// export default function CollapsibleTable() {
//   return (
//     <TableContainer component={Paper}>
//       <Table aria-label="collapsible table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Dessert (100g serving)</TableCell>
//             <TableCell align="right">Calories</TableCell>
//             <TableCell align="right">Fat&nbsp;(g)</TableCell>
//             <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//             <TableCell align="right">Protein&nbsp;(g)</TableCell>
//             <TableCell />
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <Row key={row.name} row={row} />
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }
