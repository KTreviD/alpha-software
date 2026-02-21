import { FileT, FolderT } from "src/types/files";
import {
  formatFileSize,
  getFileIcon,
  getFileIconColor,
  getFriendlyFileType,
} from "src/utils/utils";
import { formatDateAMPM } from "../modal/dates";

// Definimos que el componente solo puede recibir UNA de estas dos configuraciones
type FileTableRowProps =
  | {
      isFolder: true;
      item: FolderT;
      setContextMenu: any;
      onDoubleClick: (id: string, name: string) => void;
    }
  | {
      isFolder: false;
      item: FileT;
      setContextMenu: any;
      onDoubleClick: (id: string, name: string) => void;
    };

const FileTableRow = (props: FileTableRowProps) => {
  const { item, isFolder, setContextMenu, onDoubleClick } = props;

  const name = isFolder ? item.name : item.original_name;

  const iconClass = isFolder
    ? "ri-folder-fill me-2 text-warning"
    : `${getFileIcon(item.original_name)} ${getFileIconColor(item.original_name)}`;

  const fileType = isFolder
    ? "File Folder"
    : getFriendlyFileType(item.mime_type);
  const size = isFolder ? "—" : formatFileSize(item.size);
  const contextType = isFolder ? "folder" : "file";

  return (
    <tr
      onDoubleClick={() => onDoubleClick(item.id, name)}
      onContextMenu={e => {
        e.preventDefault();
        e.stopPropagation();
        setContextMenu({
          visible: true,
          x: e.clientX,
          y: e.clientY,
          type: contextType,
          id: item.id,
        });
      }}
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
            <i className={iconClass} />
          </div>
          <div className="flex-grow-1 filelist-name">{name}</div>
        </div>
      </td>
      <td className="filelist-size">{fileType}</td>
      <td className="filelist-size">{size}</td>
      <td className="filelist-create">{formatDateAMPM(item.created_at)}</td>
    </tr>
  );
};

export default FileTableRow;
