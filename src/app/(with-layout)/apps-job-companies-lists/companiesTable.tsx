import React from "react";
import { Grid, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./columns";
import {
  usePostCompanyMutation,
  useDeleteCompanyMutation,
  useGetCompaniesAdminPageQuery,
  usePutCompanyMutation,
} from "src/slices/api/apiSlice";
import { ModalPropsI } from "src/components/modal";
import { Card, CardBody, CardHeader } from "reactstrap";

type CompaniesTableInput = {
  handleCloseModal: () => void;
  setModalState: React.Dispatch<React.SetStateAction<ModalPropsI>>;
};

const CompaniesTable = ({
  handleCloseModal,
  setModalState,
}: CompaniesTableInput) => {
  const { data, isLoading, isFetching } = useGetCompaniesAdminPageQuery();
  const { companies = [], industries = [], companySizes = [] } = data || {};

  const [addCompany] = usePostCompanyMutation();
  const [updateCompany] = usePutCompanyMutation();
  const [deleteCompany] = useDeleteCompanyMutation();
  console.log({ data });

  const saveChanges = async (
    data: object,
    isEditing: boolean,
    isDeleting = false
  ) => {
    if (isDeleting) {
      await deleteCompany(data);
    } else if (isEditing) {
      console.log("EDITANDO");
      console.log({ isEditing, data });
      console.log("EDITANDO");
      await updateCompany(data);
    } else {
      await addCompany(data);
    }
    handleCloseModal();
  };

  const companyKeys = ({ industries, companySizes }: any) => {
    return {
      name: {
        label: "Name",
        type: "text",
      },
      description: {
        label: "Description",
        type: "text",
      },
      industry_id: {
        label: "Industry type",
        type: "select",
        array: industries,
        dynamicOptionLabel: {
          propsToGet: [["name"], ["description"]],
          propsJoiner: ": ",
        },
      },
      company_size_id: {
        label: "Company size",
        type: "select",
        array: companySizes,
        dynamicOptionLabel: {
          propsToGet: [["name"], ["label"]],
          propsJoiner: ": ",
        },
      },
      website_url: {
        label: "Website url",
        type: "text",
      },
    };
  };

  const handleAddRow = () => {
    const item = {
      name: "",
      description: "",
      industry_id: null,
      company_size_id: null,
      website_url: "",
    };

    setModalState({
      isOpen: true,
      item,
      keys: companyKeys({ industries, companySizes }),
      title: "Create company",
      isEditing: false,
      saveChanges,
    });
  };

  const handleEditRow = (row: any) => {
    setModalState({
      isOpen: true,
      item: row,
      keys: companyKeys({ industries, companySizes }),
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
                <h5 className="card-title mb-0 flex-grow-1">Companies</h5>
                <div className="flex-shrink-0">
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      className="btn btn-danger"
                      color="primary"
                      variant="contained"
                      onClick={handleAddRow}
                    >
                      <i className="ri-add-line align-bottom me-1"></i>Create
                      Company
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
                      rows={companies || []}
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

export default CompaniesTable;
