"use client";
import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import dynamic from "next/dynamic";

const ToastContainer = dynamic(
  () => import("react-toastify").then(mod => mod.ToastContainer),
  { ssr: false }
);

import { emptyModalObject, Modal } from "src/components/modal";
import FolderSidebar, { FILTER_FILES } from "./FolderSidebar";
import FileTable from "./FileTable";

const FileManager = () => {
  const [filterActive, setFilterActive] = useState<FILTER_FILES>(
    FILTER_FILES.FILES
  );

  //Modal state
  const [modalState, setModalState] = useState(emptyModalObject);
  const handleCloseModal = () => setModalState(emptyModalObject);

  return (
    <React.Fragment>
      <ToastContainer closeButton={false} />

      <div className="page-content">
        <Container fluid>
          <div className="chat-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-1">
            <FolderSidebar
              filterActive={filterActive}
              setFilterActive={setFilterActive}
            />
            <div className="file-manager-content minimal-border w-100 p-3 py-0">
              {filterActive === FILTER_FILES.EMAIL_TEMPLATE ? (
                <>En construcción</>
              ) : (
                <FileTable
                  filterActive={filterActive}
                  handleCloseModal={handleCloseModal}
                  setModalState={setModalState}
                />
              )}
            </div>
          </div>
        </Container>
      </div>

      {modalState.isOpen && (
        <Modal {...modalState} closeModal={handleCloseModal} />
      )}
    </React.Fragment>
  );
};

export default FileManager;
