import React from "react";
import { Grid, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./columns";
import {
  useGetIndustriesAdminPageQuery,
  usePostIndustryMutation,
  useDeleteIndustryMutation,
  usePutIndustryMutation,
} from "src/slices/api/apiSlice";
import { ModalPropsI } from "src/components/modal";
import { Card, CardBody, CardHeader } from "reactstrap";

type CompaniesTableInput = {
  handleCloseModal: () => void;
  setModalState: React.Dispatch<React.SetStateAction<ModalPropsI>>;
};

const IndustriesTable = ({
  handleCloseModal,
  setModalState,
}: CompaniesTableInput) => {
  const { data, isLoading, isFetching } = useGetIndustriesAdminPageQuery();
  const { industries } = data || {};

  const [addCompany] = usePostIndustryMutation();
  const [updateCompany] = usePutIndustryMutation();
  const [deleteCompany] = useDeleteIndustryMutation();

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

  const industryKeys = () => {
    return {
      name: {
        label: "Name",
        type: "text",
      },
      description: {
        label: "Description",
        type: "text",
      },
    };
  };

  const handleAddRow = () => {
    const item = {
      name: "",
      description: "",
    };

    setModalState({
      isOpen: true,
      item,
      keys: industryKeys(),
      title: "Create Industry",
      isEditing: false,
      saveChanges,
    });
  };

  const handleEditRow = (row: any) => {
    setModalState({
      isOpen: true,
      item: row,
      keys: industryKeys(),
      title: `Edit ${row.name}`,
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
                <h5 className="card-title mb-0 flex-grow-1">Industries</h5>
                <div className="flex-shrink-0">
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      className="btn btn-danger"
                      color="primary"
                      variant="contained"
                      onClick={handleAddRow}
                    >
                      <i className="ri-add-line align-bottom me-1"></i>Create
                      Industry
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
                      rows={industries || []}
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

export default IndustriesTable;
