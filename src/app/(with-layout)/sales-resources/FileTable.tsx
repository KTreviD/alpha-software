"use client";
import { MODULES } from "src/utils/s3FilesModules";
import FolderBreadcrumb from "./FolderBreadcrumb";
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import {
  useGetFoldersAndFilesQuery,
  useDeleteFolderMutation,
  usePostFolderMutation,
  usePutFolderMutation,
} from "src/slices/api/apiSlice";
import { folderKeys } from "src/components/modal/keys";
import { FILTER_FILES } from "./FolderSidebar";
import React, { useState } from "react";
import { ModalPropsI } from "src/components/modal";
import { FileUploader } from "src/components/s3Upload/FileUploader";
import { formatDateAMPM } from "src/components/modal/dates";
import { formatFileSize } from "src/utils/utils";

interface FileTableProps {
  filterActive: FILTER_FILES;
  handleCloseModal: () => void;
  setModalState: React.Dispatch<React.SetStateAction<ModalPropsI>>;
}

const FileTable: React.FC<FileTableProps> = ({
  filterActive,
  handleCloseModal,
  setModalState,
}) => {
  const moduleName = MODULES.SALES_RESOURCES;
  const principalFolder =
    filterActive === FILTER_FILES.DELETED_FILES ? "Deleted Files" : "Files";
  const [currentFolder, setCurrentFolder] = useState<{
    id: string | null;
    name: string;
  }>({
    id: null,
    name: principalFolder,
  });
  const [folderPath, setFolderPath] = useState<
    { id: string | null; name: string }[]
  >([{ id: null, name: principalFolder }]);

  const { data, isLoading, isFetching } = useGetFoldersAndFilesQuery({
    module: moduleName,
    parentId: currentFolder.id,
    deleted: filterActive === FILTER_FILES.DELETED_FILES,
  });

  const { folders = [], files = [] } = data || {};
  const loading = isLoading || isFetching;
  console.log({ folders, files });
  const [addFolder] = usePostFolderMutation();
  const [updateFolder] = usePutFolderMutation();
  const [deleteFolder] = useDeleteFolderMutation();

  const saveChanges = async (
    data: object,
    isEditing: boolean,
    isDeleting = false
  ) => {
    if (isDeleting) {
      await deleteFolder(data);
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
      module: moduleName,
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
    setModalState({
      isOpen: true,
      item: row,
      keys: folderKeys(),
      title: `Edit Folder ${row.name}`,
      isEditing: true,
      saveChanges,
    });
  };

  const handleDoubleClick = (id: string, name: string) => {
    setCurrentFolder({ id, name });
    setFolderPath(prev => [...prev, { id, name }]);
  };

  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    folderId?: string | null;
  }>({ visible: false, x: 0, y: 0, folderId: null });

  React.useEffect(() => {
    setCurrentFolder({ id: null, name: principalFolder });
    setFolderPath([{ id: null, name: principalFolder }]);
  }, [filterActive]);

  React.useEffect(() => {
    const handleClickOutside = () =>
      setContextMenu({ visible: false, x: 0, y: 0, folderId: null });
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="mx-n3 pt-4 px-4 file-manager-content-scroll">
      {contextMenu.visible && contextMenu.folderId && (
        <UncontrolledDropdown
          style={{
            position: "fixed",
            top: contextMenu.y,
            left: contextMenu.x,
            zIndex: 1050, // encima de todo
          }}
          isOpen={true} // forzamos que esté abierto
        >
          <DropdownToggle
            tag="div"
            style={{ display: "none" }} // toggle invisible, solo necesitamos el menú
          />

          <DropdownMenu
            end
            style={{
              minWidth: "160px",
              boxShadow: "0 0px 10px rgba(30, 32, 37, 0.20)",
            }}
          >
            <DropdownItem onClick={() => console.log("Download clicked")}>
              <i className="ri-download-2-fill me-2" />
              Download
            </DropdownItem>

            <DropdownItem
              onClick={() => {
                const folder = folders.find(
                  (f: { id: string | null | undefined }) =>
                    f.id === contextMenu.folderId
                );
                if (folder) {
                  handleDoubleClick(folder.id, folder.name);
                  setContextMenu({
                    visible: false,
                    x: 0,
                    y: 0,
                    folderId: null,
                  });
                }
              }}
            >
              <i className="ri-folder-open-fill me-2" />
              Open
            </DropdownItem>

            <DropdownItem onClick={() => console.log("Rename clicked")}>
              <i className="ri-edit-2-fill me-2" />
              Rename
            </DropdownItem>

            <DropdownItem
              className="text-danger border-top"
              onClick={() => console.log("Delete clicked")}
            >
              <i className="ri-delete-bin-2-fill me-2" />
              Delete
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      )}

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
                  const index = folderPath.findIndex(f => f.id === id);
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
              <FileUploader
                module={moduleName}
                principalFolder={principalFolder}
                folderId={
                  currentFolder?.id === null ? null : Number(currentFolder?.id)
                }
                folderPath={folderPath.map(x => x.name).join("/")}
              />
              {filterActive !== FILTER_FILES.DELETED_FILES && (
                <button
                  onClick={handleAddRow}
                  className="btn btn-success text-nowrap create-folder-modal flex-shrink-0"
                >
                  <i className="ri-add-line align-bottom me-1"></i> Create
                  Folders
                </button>
              )}
            </div>
          </Col>
        </Row>
      </div>

      <div
        className="table-responsive"
        style={{ height: "calc(100% - 38px)", overflow: "auto" }}
      >
        <table
          className="table align-middle table-nowrap mb-0 table-hover"
          style={{
            borderCollapse: "separate",
            borderSpacing: 0,
          }}
        >
          <thead
            className="table-active bg-body"
            style={{ position: "sticky", top: "0px", zIndex: 50 }}
          >
            <tr>
              <th className="border" style={{ width: "200px" }}>
                Name
              </th>
              <th className="border" style={{ width: "140px" }}>
                Type
              </th>
              <th className="border" style={{ width: "100px" }}>
                File Size
              </th>
              <th className="border" style={{ width: "180px" }}>
                Recent Date
              </th>
            </tr>
          </thead>
          <tbody id="file-list">
            {(folders || []).map((item: any, key: number) => (
              <tr
                key={item.id}
                onDoubleClick={() => handleDoubleClick(item.id, item.name)}
                onContextMenu={e => {
                  e.preventDefault();
                  setContextMenu({
                    visible: true,
                    x: e.clientX,
                    y: e.clientY,
                    folderId: item.id,
                  });
                  e.stopPropagation();
                }}
                style={{ maxHeight: "10px !important" }}
              >
                <td className="p-0 ps-2">
                  <input
                    className="form-control filelist-id"
                    type="hidden"
                    value="1"
                    id="filelist-1"
                  />
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 fs-17 me-2 filelist-icon">
                      <i className="ri-folder-fill me-2"></i>
                    </div>
                    <div className="flex-grow-1 filelist-name">{item.name}</div>
                  </div>
                </td>
                <td>File Folder</td>
                <td className="text-muted">—</td>
                <td className="filelist-create">
                  {formatDateAMPM(item.created_at)}
                </td>
              </tr>
            ))}
            {(files || []).map((item: any, key: number) => (
              <tr key={item.id}>
                <td className="p-0 ps-2">
                  <input
                    className="form-control filelist-id"
                    type="hidden"
                    value="1"
                    id="filelist-1"
                  />
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 fs-17 me-2 filelist-icon">
                      {/* <i className="ri-folder-fill me-2"></i> */}
                    </div>
                    <div className="flex-grow-1 filelist-name">
                      {item.original_name}
                    </div>
                  </div>
                </td>
                <td>{item.fileItem}</td>
                <td className="filelist-size">{formatFileSize(item.size)}</td>
                <td className="filelist-create">
                  {formatDateAMPM(item.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255,255,255,0.4)", // semi-transparente
            zIndex: 2000, // encima de todo
            cursor: "wait", // cambia cursor
          }}
        />
      )}
    </div>
  );
};

export default FileTable;
