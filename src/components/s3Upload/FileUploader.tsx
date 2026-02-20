import React, { useState } from "react";
import { usePostGetPresignedUrlMutation } from "src/slices/api/apiSlice";

export const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [getPresignedUrl] = usePostGetPresignedUrlMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    // 1️⃣ Pedir presigned URL
    console.log({ fileType: file.type });
    const { url } = await getPresignedUrl({
      fileName: file.name,
      fileType: file.type,
    }).unwrap();

    // 2️⃣ Subir archivo directo a S3
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url);
    xhr.upload.onprogress = e => {
      if (e.lengthComputable)
        setProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => alert("Archivo subido con éxito!");
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
