import React from "react";
import { Grid, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./columns";
import {
  useGetCompanySizesAdminPageQuery,
  usePostCompanySizeMutation,
  usePutCompanySizeMutation,
  useDeleteCompanySizeMutation,
} from "src/slices/api/apiSlice";
import { ModalPropsI } from "src/components/modal";
import { Card, CardBody, CardHeader } from "reactstrap";

type CompanySizesTableInput = {
  handleCloseModal: () => void;
  setModalState: React.Dispatch<React.SetStateAction<ModalPropsI>>;
};

const CompanySizesTable = ({
  handleCloseModal,
  setModalState,
}: CompanySizesTableInput) => {
  const { data, isLoading, isFetching } = useGetCompanySizesAdminPageQuery();
  const { companySizes = [] } = data || {};

  const [addCompany] = usePostCompanySizeMutation();
  const [updateCompany] = usePutCompanySizeMutation();
  const [deleteCompany] = useDeleteCompanySizeMutation();

  const saveChanges = async (
    data: object,
    isEditing: boolean,
    isDeleting = false
  ) => {
    if (isDeleting) {
      await deleteCompany(data);
    } else if (isEditing) {
      await updateCompany(data);
    } else {
      await addCompany(data);
    }
    handleCloseModal();
  };

  const companySizeKeys = () => {
    return {
      name: {
        label: "Name",
        type: "text",
      },
      label: {
        label: "Label",
        type: "text",
      },
      min_employees: {
        label: "Min Employees",
        type: "number",
      },
      max_employees: {
        label: "Max Employees",
        type: "number",
      },
    };
  };

  const handleAddRow = () => {
    const item = {
      name: "",
      label: "",
      min_employees: 0,
      max_employees: 0,
    };

    setModalState({
      isOpen: true,
      item,
      keys: companySizeKeys(),
      title: "Create company size",
      isEditing: false,
      saveChanges,
    });
  };

  const handleEditRow = (row: any) => {
    setModalState({
      isOpen: true,
      item: row,
      keys: companySizeKeys(),
      title: `Edit company size ${row.name}: ${row.label}`,
      isEditing: true,
      saveChanges,
    });
  };
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader>
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">Company Sizes</h5>
                <div className="flex-shrink-0">
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      className="btn btn-danger"
                      color="primary"
                      variant="contained"
                      onClick={handleAddRow}
                    >
                      <i className="ri-add-line align-bottom me-1"></i>Create
                      Company Size
                    </button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <Box sx={{ height: 500, width: "100%" }}>
                    <DataGrid
                      onRowDoubleClick={params => handleEditRow(params.row)}
                      columns={columns}
                      rows={companySizes || []}
                      loading={isLoading || isFetching}
                      pagination
                      pageSizeOptions={[10, 25, 50]}
                      initialState={{
                        pagination: {
                          paginationModel: { pageSize: 10, page: 0 },
                        },
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardBody>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CompanySizesTable;
