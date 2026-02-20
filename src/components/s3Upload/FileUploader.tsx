import React, { useState } from "react";
import {
  usePostGetPresignedUrlMutation,
  usePostConfirmUploadMutation,
} from "src/slices/api/apiSlice";

interface FileUploaderProps {
  module: string;
  principalFolder: string;
  folderPath: string;
  folderId: number | null;
}

export const FileUploader = ({
  module,
  folderPath,
  principalFolder,
  folderId,
}: FileUploaderProps) => {
  console.log({ module, folderPath });
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  const [getPresignedUrl] = usePostGetPresignedUrlMutation();
  const [confirmUpload] = usePostConfirmUploadMutation();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    // 1️⃣ Pedir presigned URL
    const { url, key } = await getPresignedUrl({
      fileName: file.name,
      fileType: file.type,
      module,
      principalFolder,
      folderId,
    }).unwrap();

    // 2️⃣ Subir archivo directo a S3
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url);
    xhr.setRequestHeader("Content-Type", file.type);
    xhr.upload.onprogress = e => {
      if (e.lengthComputable)
        setProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = async () => {
      console.log({ xhr });
      if (xhr.status >= 200 && xhr.status < 300) {
        await confirmUpload({
          module,
          folderId,
          originalName: file.name,
          s3Key: key,
          mimeType: file.type,
          size: file.size,
        });
        alert("Archivo subido con éxito!");
      } else {
        alert(`Error subiendo archivo! Status: ${xhr.status}`);
        console.error(xhr.responseText);
      }
    };

    xhr.onerror = () => alert("Error subiendo archivo!");
    xhr.send(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>
        Subir a S3
      </button>
      {progress > 0 && <p>Progreso: {progress}%</p>}
    </div>
  );
};
