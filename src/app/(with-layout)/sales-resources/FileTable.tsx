"use client";
import { MODULES } from "src/utils/s3FilesModules";
import FolderBreadcrumb from "./FolderBreadcrumb";
import { Col, Row } from "reactstrap";
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
  const rootLabel =
    filterActive === FILTER_FILES.DELETED_FILES ? "Deleted Files" : "Files";
  const [currentFolder, setCurrentFolder] = useState<{
    id: string | null;
    name: string;
  }>({
    id: null,
    name: rootLabel,
  });
  const [folderPath, setFolderPath] = useState<
    { id: string | null; name: string }[]
  >([{ id: null, name: rootLabel }]);

  const { data, isLoading, isFetching } = useGetFoldersAndFilesQuery({
    module: MODULES.SALES_RESOURCES,
    parentId: currentFolder.id,
    deleted: filterActive === FILTER_FILES.DELETED_FILES,
  });

  const { folders = [], files = [] } = data || {};

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
    setCurrentFolder({ id: null, name: rootLabel });
    setFolderPath([{ id: null, name: rootLabel }]);
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
        <div
          style={{
            position: "fixed",
            top: contextMenu.y,
            left: contextMenu.x,
            zIndex: 1000,
            width: "160px",
          }}
          className="bg-light border rounded shadow-sm"
        >
          <button className="dropdown-item d-flex align-items-center py-2 px-3 ">
            <i className="ri-download-2-fill me-2"></i> Download
          </button>
          <button
            className="dropdown-item d-flex align-items-center py-2 px-3"
            onClick={() => {
              const folder = folders.find(
                (f: { id: string | null | undefined }) =>
                  f.id === contextMenu.folderId
              );
              if (folder) {
                handleDoubleClick(folder.id, folder.name);
                setContextMenu({ visible: false, x: 0, y: 0, folderId: null });
              }
            }}
          >
            <i className="ri-folder-open-fill me-2"></i> Open
          </button>
          <button className="dropdown-item d-flex align-items-center py-2 px-3">
            <i className="ri-edit-2-fill me-2"></i> Rename
          </button>
          <button className="dropdown-item d-flex align-items-center py-2 px-3 text-danger border-top">
            <i className="ri-delete-bin-2-fill me-2"></i> Delete
          </button>
        </div>
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
        <table className="table align-middle table-nowrap mb-0 table-hover">
          <thead className="table-active sticky-top bg-body">
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>File Size</th>
              <th>Recent Date</th>
            </tr>
          </thead>
          <tbody id="file-list">
            {(folders || []).map((item: any, key: number) => (
              <tr
                key={key}
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
                <td className="filelist-size">{item.size}</td>
                <td className="filelist-create">{item.createDate}</td>
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
                <td className="filelist-create">{item.createDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileTable;
