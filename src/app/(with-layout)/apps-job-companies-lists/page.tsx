"use client";
import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import BreadCrumb from "@common/BreadCrumb";

import {
  usePostCompanyMutation,
  useDeleteCompanyMutation,
  useGetCompaniesAdminPageQuery,
  usePutCompanyMutation,
} from "src/slices/api/apiSlice";

import { DataGrid } from "@mui/x-data-grid";

import { emptyModalObject, Modal } from "src/components/modal";
import { columns } from "./columns";

const CompaniesList = () => {
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

  //Modal state
  const [modalState, setModalState] = useState(emptyModalObject);
  const handleCloseModal = () => setModalState(emptyModalObject);

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
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <BreadCrumb title="Companies" pageTitle="Job" />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Lista de Compañías" />
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={4} md={2}>
                    <Button
                      sx={{ height: "100%" }}
                      fullWidth
                      color="primary"
                      variant="contained"
                      onClick={handleAddRow}
                    >
                      Agregar
                    </Button>
                  </Grid>

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
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {modalState.isOpen && (
        <Modal {...modalState} closeModal={handleCloseModal} />
      )}
    </React.Fragment>
  );
};

export default CompaniesList;
