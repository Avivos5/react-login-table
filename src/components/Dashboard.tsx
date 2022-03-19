import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AppService } from '../services/AppService';
import Button from '@mui/material/Button';
import EnhancedTableHead from './TableHead';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import NavBar from './NavBar';
 export interface Data {
   id: number;
   first_name: string;
   last_name: string;
   points: number;
   exam_date: string;
   subject: string
 }
 
 export type Order = "asc" | "desc";

 function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
   if (b[orderBy] < a[orderBy]) {
     return -1;
   }
   if (b[orderBy] > a[orderBy]) {
     return 1;
   }
   return 0;
 }
 
 function getComparator<Key extends keyof any>(
   order: Order,
   orderBy: Key
 ): (
   a: { [key in Key]: number | string },
   b: { [key in Key]: number | string }
 ) => number {
   return order === "desc"
     ? (a, b) => descendingComparator(a, b, orderBy)
     : (a, b) => -descendingComparator(a, b, orderBy);
 }


function Dashboard() {

   const [order, setOrder] = useState<Order>("asc");
   const [orderBy, setOrderBy] = useState<keyof Data>("first_name");
   const [selected, setSelected] = useState<readonly number[]>([]);
   const [tableContent, setTableContent] = useState<Data[]>([]);

   const isSelected = (name: number) => selected.indexOf(name) !== -1;

   const appService = new AppService();

   const handleRequestSort = (
      event: React.MouseEvent<unknown>,
      property: keyof Data
   ) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
   };

   const handleClick = (event: React.MouseEvent<unknown>, name: number) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected: readonly number[] = [];

      if (selectedIndex === -1) {
         newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
         newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
         newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
         newSelected = newSelected.concat(
         selected.slice(0, selectedIndex),
         selected.slice(selectedIndex + 1)
         );
      }
      setSelected(newSelected);
   };

   const getAllStudMarks = async () => {
      const response = await appService.getStudMarks();
      console.log(response);
      setTableContent(response);
   }

   useEffect(() => {
      getAllStudMarks();
   }, [])

  return ( 
     <>
      <NavBar />
      <Box sx={{ width: "90%", margin: "25px auto" }}>
         <Paper sx={{ width: "100%", mb: 2 }}>
         <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
               <EnhancedTableHead
               order={order}
               orderBy={orderBy}
               onRequestSort={handleRequestSort}
               />
               <TableBody>
               {tableContent
                  .slice()
                  .sort(getComparator(order, orderBy))
                  .map((student, index) => {
                     const isItemSelected = isSelected(student.id);
                     const labelId = `enhanced-table-checkbox-${index}`;

                     return (
                     <TableRow
                        hover
                        onClick={(event) => handleClick(event, student.id)}
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
                     </TableRow>
                     );
                  })}
               </TableBody>
            </Table>
         </TableContainer>
         </Paper>
      </Box>
    
   </>
   );
}

export default Dashboard;