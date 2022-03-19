import { useEffect, useState } from 'react';
import { AppService } from '../services/AppService';
import EnhancedTableHead from './TableHead';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import NavBar from './NavBar';
import CollapsibleTableRow from './CollabsibleTableRow';
import { TextField } from '@mui/material';
import DateAdapter from "@date-io/date-fns";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';




 export interface Data {
   id: number;
   first_name: string;
   last_name: string;
   points: number;
   exam_date: string;
   subject: string,
   notes: string
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
   const [allTableContent, setAllTableContent] = useState<Data[]>([]);
   const [tableContent, setTableContent] = useState<Data[]>([]);
   const [lastNameFilter, setLastNameFilter] = useState('');
   const [examDateFilter, setExamDateFilter] = useState<Date | null>(null);
   const [subjectFilter, setSubjectFilter] = useState('');

   const queryChanged = () => {
      let studentsToFilter: Data[] = [...allTableContent]; 

      if(!(lastNameFilter === ""))
      studentsToFilter = studentsToFilter.filter(student => student.last_name.toUpperCase().includes(lastNameFilter.toUpperCase()));

      if(!(examDateFilter === null))
      studentsToFilter = studentsToFilter.filter(student => {
         const studDate = new Date(student.exam_date);
         return (studDate >= examDateFilter);
      });

      if(!(subjectFilter === ""))
      studentsToFilter = studentsToFilter.filter(student => student.subject.toUpperCase().includes(subjectFilter.toUpperCase()));

      setTableContent(studentsToFilter);
  }

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
      setAllTableContent(response);
   }

   useEffect(() => { getAllStudMarks() }, []);

   useEffect(() => { queryChanged() }, [lastNameFilter])
  
  useEffect(() => { queryChanged() }, [examDateFilter])

  useEffect(() => { queryChanged() }, [subjectFilter])

  return ( 
     <>
      <NavBar />
      {tableContent.length ?
        <>
         <Box
            component="form"
            sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
            width: "90%",
            margin: "25px auto 0",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: '20px'
            
            }}
            noValidate
            autoComplete="off"
         >
            <TextField 
            label="Last Name" 
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
               setLastNameFilter(event.target.value);
            }}/>
            <LocalizationProvider dateAdapter={DateAdapter}>
               <DatePicker
               label="Exam Date (later than)"
               value={examDateFilter}
               onChange={(newValue) => {
                  setExamDateFilter(newValue);
                  console.log(newValue);
               }}
               renderInput={(params: any) => <TextField {...params} />}
               />
            </LocalizationProvider>
            <FormControl fullWidth>
            <InputLabel>Subject</InputLabel>
            <Select
               value={subjectFilter}
               label="Subject"
               onChange={(event: SelectChangeEvent) => {
                  setSubjectFilter(event.target.value);
                  console.log(event.target.value)
                }}
            >
               <MenuItem value="">
                  <em>None</em>
               </MenuItem>
               <MenuItem value={"chemistry"}>Chemistry</MenuItem>
               <MenuItem value={"science"}>Science</MenuItem>
               <MenuItem value={"math"}>Math</MenuItem>
               <MenuItem value={"geography"}>Geography</MenuItem>
            </Select>
            </FormControl>
         </Box>
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
                           <CollapsibleTableRow 
                              key={student.id}
                              student={student} 
                              isItemSelected={isItemSelected}
                              labelId={labelId}
                              handleClick={handleClick}
                           />
                        );
                     })}
                  </TableBody>
               </Table>
            </TableContainer>
            </Paper>
         </Box>
        </>
        :
        <Box sx={{
            margin: "50px auto",
            display: "flex",
            justifyContent: "center"
         }}>
         <CircularProgress/>
      </Box>
      }
     
    
   </>
   );
}

export default Dashboard;