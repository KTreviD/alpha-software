import { GridColDef, GridValueFormatter } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 200 },
  { field: "label", headerName: "Label", width: 250 },
  { field: "min_employees", headerName: "Min Employees", width: 250 },
  { field: "max_employees", headerName: "Max Employees", width: 250 },
];
