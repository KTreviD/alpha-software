import { GridColDef, GridValueFormatter } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 200 },
  { field: "description", headerName: "Description", width: 250 },
  {
    field: "industry_name",
    headerName: "Industry",
    width: 150,
    valueGetter: (_value, row) => row?.Industry?.name || "",
  },
  {
    field: "company_size",
    headerName: "Company Size",
    width: 150,
    valueGetter: (_value, row) => row?.CompanySize?.label || "",
  },
  {
    field: "website_url",
    headerName: "Website",
    width: 200,
    renderCell: params =>
      params?.value ? (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          {params.value}
        </a>
      ) : null,
  },
  {
    field: "created_at",
    headerName: "Dada de alta",
    width: 120,
    valueGetter: (_value, row) =>
      row?.created_at
        ? new Date(row.created_at).toISOString().split("T")[0]
        : "",
  },
];
