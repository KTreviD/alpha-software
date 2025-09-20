"use client";
import React, { useState } from "react";
import { Container, Row } from "reactstrap";
import BreadCrumb from "@common/BreadCrumb";

import { emptyModalObject, Modal } from "src/components/modal";
import Widgets from "./Widgets";
import CompaniesTable from "./companiesTable";

const CompaniesList = () => {
  //Modal state
  const [modalState, setModalState] = useState(emptyModalObject);
  const handleCloseModal = () => setModalState(emptyModalObject);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Companies List" pageTitle="Companies" />
          <Row>
            <Widgets />
          </Row>
          <Row>
            <CompaniesTable
              handleCloseModal={handleCloseModal}
              setModalState={setModalState}
            />
          </Row>
        </Container>
      </div>
      {modalState.isOpen && (
        <Modal {...modalState} closeModal={handleCloseModal} />
      )}
    </React.Fragment>
  );
};

export default CompaniesList;
