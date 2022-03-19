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
        <TableCell padding="checkbox">
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