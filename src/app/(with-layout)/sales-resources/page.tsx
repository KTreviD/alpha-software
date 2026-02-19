"use client";
import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import dynamic from "next/dynamic";

const SimpleBar = dynamic(() => import("simplebar-react"), { ssr: false });
const ToastContainer = dynamic(
  () => import("react-toastify").then(mod => mod.ToastContainer),
  { ssr: false }
);

import Link from "next/link";
import { emptyModalObject, Modal } from "src/components/modal";
import {
  useGetFoldersAndFilesQuery,
  usePostFolderMutation,
  usePutFolderMutation,
} from "src/slices/api/apiSlice";
import { folderKeys } from "src/components/modal/keys";
import { MODULES } from "src/utils/s3FilesModules";
import FolderBreadcrumb from "./FolderBreadcrumb";

const FileManager = () => {
  const [currentFolder, setCurrentFolder] = useState<{
    id: string | null;
    name: string;
  }>({
    id: null,
    name: "Root",
  });
  const [folderPath, setFolderPath] = useState<
    { id: string | null; name: string }[]
  >([{ id: null, name: "Root" }]);

  const { data, isLoading, isFetching } = useGetFoldersAndFilesQuery({
    module: MODULES.SALES_RESOURCES,
    parentId: currentFolder.id,
  });
  const { folders = [], files = [] } = data || {};

  console.log({ data });
  //Modal state
  const [modalState, setModalState] = useState(emptyModalObject);
  const handleCloseModal = () => setModalState(emptyModalObject);

  const [addFolder] = usePostFolderMutation();
  const [updateFolder] = usePutFolderMutation();
  // const [deleteFolder] = useDeleteCompanyMutation();

  const saveChanges = async (
    data: object,
    isEditing: boolean,
    isDeleting = false
  ) => {
    if (isDeleting) {
      // await deleteCompany(data);
    } else if (isEditing) {
      await updateFolder(data);
    } else {
      await addFolder(data);
    }
    handleCloseModal();
  };

  const handleAddRow = () => {
    const item = {
      name: "",
      parentId: currentFolder.id ? Number(currentFolder.id) : null,
      module: MODULES.SALES_RESOURCES,
    };

    setModalState({
      isOpen: true,
      item,
      keys: folderKeys(),
      title: "Create Folder",
      isEditing: false,
      saveChanges,
    });
  };

  const handleEditRow = (row: any) => {
    console.log({ row });
    setModalState({
      isOpen: true,
      item: row,
      keys: folderKeys(),
      title: `Edit Folder ${row.name}`,
      isEditing: true,
      saveChanges,
    });
  };

  // Files
  const [file, setFile] = useState<any>(null);

  const [filterActive, setFilterActive] = useState<any>("");

  const fileCategory = (e: any, ele: any) => {
    setFilterActive(ele);
  };

  // SideBar Open
  function sidebarOpen(value: any) {
    const element = document.getElementsByTagName("body")[0];
    element.classList.add(value);
  }

  // SideBar Close
  function sidebarClose(value: any) {
    const element = document.getElementsByTagName("body")[0];
    element.classList.remove(value);
  }

  useEffect(() => {
    sidebarOpen("file-detail-show");
  }, []);

  const fileSidebar = () => {
    var folderOverview = document.getElementById(
      "folder-overview"
    ) as HTMLElement;
    folderOverview.style.display = "none";
    var fileOverview = document.getElementById("file-overview") as HTMLElement;
    fileOverview.style.display = "block";
  };

  return (
    <React.Fragment>
      <ToastContainer closeButton={false} />

      <div className="page-content">
        <Container fluid>
          <div className="chat-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-1">
            <div className="file-manager-sidebar minimal-border">
              <div className="p-3 d-flex flex-column h-100">
                <h5 className="mb-0 fw-semibold">Sales Resources</h5>
                <SimpleBar className="mt-3 mx-n4 px-4 file-menu-sidebar-scroll">
                  <ul className="list-unstyled file-manager-menu">
                    <li>
                      <Link
                        href="#"
                        className={filterActive === "Files" ? "active" : ""}
                        onClick={() => fileCategory("Files", "Files")}
                      >
                        <i className="ri-folder-2-line align-bottom me-2"></i>{" "}
                        <span className="file-list-link">Files</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className={filterActive === "Deleted" ? "active" : ""}
                        onClick={() => fileCategory("Deleted", "Deleted")}
                      >
                        <i className="ri-delete-bin-line align-bottom me-2"></i>{" "}
                        <span className="file-list-link">Deleted Files</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className={filterActive === "Recents" ? "active" : ""}
                        onClick={() => fileCategory("Media", "Recents")}
                      >
                        <i className="ri-file-list-2-line align-bottom me-2"></i>{" "}
                        <span className="file-list-link">Email Templates</span>
                      </Link>
                    </li>
                  </ul>
                </SimpleBar>
              </div>
            </div>
            <div className="file-manager-content minimal-border w-100 p-3 py-0">
              <div className="mx-n3 pt-4 px-4 file-manager-content-scroll overflow-x-hidden overflow-y-auto">
                <div id="folder-list" className="mb-2">
                  <Row className="justify-content-beetwen g-2 mb-4">
                    <Col>
                      <div
                        className="d-flex align-items-center"
                        style={{ height: "100%" }}
                      >
                        <div className="flex-shrink-0 me-2 d-block d-lg-none">
                          <button
                            type="button"
                            className="btn btn-soft-success btn-icon btn-sm fs-16 file-menu-btn"
                          >
                            <i className="ri-menu-2-fill align-bottom"></i>
                          </button>
                        </div>
                        <FolderBreadcrumb
                          path={folderPath}
                          onNavigate={id => {
                            // vuelve a la carpeta seleccionada
                            const index = folderPath.findIndex(
                              f => f.id === id
                            );
                            setFolderPath(folderPath.slice(0, index + 1));
                            const folder = folderPath[index];
                            setCurrentFolder({
                              id: folder.id,
                              name: folder.name,
                            });
                          }}
                        />
                      </div>
                    </Col>
                    <Col className="col-auto">
                      <div className="d-flex gap-2 align-items-start">
                        <select
                          className="form-control"
                          data-choices
                          data-choices-search-false
                          name="choices-single-default"
                          id="file-type"
                        >
                          <option value="">File Type</option>
                          <option value="All" defaultValue="">
                            All
                          </option>
                          <option value="Video">Video</option>
                          <option value="Images">Images</option>
                          <option value="Music">Music</option>
                          <option value="Documents">Documents</option>
                        </select>

                        {filterActive !== "Deleted" && (
                          <button
                            onClick={handleAddRow}
                            className="btn btn-success text-nowrap create-folder-modal flex-shrink-0"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            Create Folders
                          </button>
                        )}
                      </div>
                    </Col>
                  </Row>
                </div>
                <div>
                  <div className="d-flex align-items-center mb-3">
                    <h5 className="flex-grow-1 fs-16 mb-0" id="filetype-title">
                      Recent File
                    </h5>
                    <div className="flex-shrink-0"></div>
                  </div>
                  <div className="table-responsive">
                    <table className="table align-middle table-nowrap mb-0">
                      <thead className="table-active">
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">File Item</th>
                          <th scope="col">File Size</th>
                          <th scope="col">Recent Date</th>
                          <th scope="col" className="text-center">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody id="file-list">
                        {(folders || []).map((item: any, key: number) => (
                          <tr
                            key={key}
                            onDoubleClick={() => {
                              setCurrentFolder({
                                id: item.id,
                                name: item.name,
                              });
                              setFolderPath(prev => [
                                ...prev,
                                { id: item.id, name: item.name },
                              ]);
                            }}
                          >
                            <td>
                              <input
                                className="form-control filelist-id"
                                type="hidden"
                                value="1"
                                id="filelist-1"
                              />
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 fs-17 me-2 filelist-icon">
                                  <i
                                    className={
                                      item.icon +
                                      " text-" +
                                      item.iconClass +
                                      " align-bottom"
                                    }
                                  />
                                </div>
                                <div className="flex-grow-1 filelist-name">
                                  {item.name}
                                </div>
                                <div className="d-none filelist-type">
                                  {" "}
                                  {item.fileType}{" "}
                                </div>
                              </div>
                            </td>
                            <td>{item.fileItem}</td>
                            <td className="filelist-size">{item.size}</td>
                            <td className="filelist-create">
                              {item.createDate}
                            </td>
                            <td>
                              <div className="d-flex gap-3 justify-content-center">
                                <UncontrolledDropdown dir="start">
                                  <DropdownToggle
                                    tag="button"
                                    className="btn btn-light btn-icon btn-sm dropdown"
                                    id="dropdownMenuButton"
                                  >
                                    <i className="ri-more-fill align-bottom" />
                                  </DropdownToggle>
                                  <DropdownMenu className="dropdown-menu-end">
                                    <DropdownItem
                                      className="viewfile-list"
                                      onClick={() => {
                                        fileSidebar();
                                        sidebarOpen("file-detail-show");
                                      }}
                                    >
                                      View
                                    </DropdownItem>
                                    <DropdownItem
                                      className="edit-list"
                                      onClick={e => handleEditRow(item)}
                                    >
                                      Rename
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem className="remove-list">
                                      Delete
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {(files || []).map((item: any, key: number) => (
                          <tr key={key}>
                            <td>
                              <input
                                className="form-control filelist-id"
                                type="hidden"
                                value="1"
                                id="filelist-1"
                              />
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 fs-17 me-2 filelist-icon">
                                  <i
                                    className={
                                      item.icon +
                                      " text-" +
                                      item.iconClass +
                                      " align-bottom"
                                    }
                                  />
                                </div>
                                <div className="flex-grow-1 filelist-name">
                                  {item.fileName}
                                </div>
                                <div className="d-none filelist-type">
                                  {" "}
                                  {item.fileType}{" "}
                                </div>
                              </div>
                            </td>
                            <td>{item.fileItem}</td>
                            <td className="filelist-size">{item.size}</td>
                            <td className="filelist-create">
                              {item.createDate}
                            </td>
                            <td>
                              <div className="d-flex gap-3 justify-content-center">
                                <UncontrolledDropdown dir="start">
                                  <DropdownToggle
                                    tag="button"
                                    className="btn btn-light btn-icon btn-sm dropdown"
                                    id="dropdownMenuButton"
                                  >
                                    <i className="ri-more-fill align-bottom" />
                                  </DropdownToggle>
                                  <DropdownMenu className="dropdown-menu-end">
                                    <DropdownItem
                                      className="viewfile-list"
                                      onClick={() => {
                                        fileSidebar();
                                        sidebarOpen("file-detail-show");
                                      }}
                                    >
                                      View
                                    </DropdownItem>
                                    <DropdownItem className="edit-list">
                                      Rename
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem className="remove-list">
                                      Delete
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <ul id="pagination" className="pagination pagination-lg"></ul>

                  <div className="align-items-center mt-2 row g-3 text-center text-sm-start">
                    <div className="col-sm">
                      <div className="text-muted">
                        Showing<span className="fw-semibold">4</span> of{" "}
                        <span className="fw-semibold">125</span> Results
                      </div>
                    </div>
                    <div className="col-sm-auto">
                      <ul className="pagination pagination-separated pagination-sm justify-content-center justify-content-sm-start mb-0">
                        <li className="page-item disabled">
                          <Link href="#" className="page-link">
                            ←
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link href="#" className="page-link">
                            1
                          </Link>
                        </li>
                        <li className="page-item active">
                          <Link href="#" className="page-link">
                            2
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link href="#" className="page-link">
                            3
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link href="#" className="page-link">
                            →
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
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
