import React, { useRef, useState } from "react";
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
  principalFolder,
  folderId,
}: FileUploaderProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [getPresignedUrl] = usePostGetPresignedUrlMutation();
  const [confirmUpload] = usePostConfirmUploadMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setProgress(0);
      setIsSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setIsUploading(true);

      const { url, key } = await getPresignedUrl({
        fileName: file.name,
        fileType: file.type,
        module,
        principalFolder,
        folderId,
      }).unwrap();

      const xhr = new XMLHttpRequest();
      xhr.open("PUT", url);
      xhr.setRequestHeader("Content-Type", file.type);

      xhr.upload.onprogress = e => {
        if (e.lengthComputable) {
          setProgress(Math.round((e.loaded / e.total) * 100));
        }
      };

      xhr.onload = async () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          await confirmUpload({
            module,
            folderId,
            originalName: file.name,
            s3Key: key,
            mimeType: file.type,
            size: file.size,
          });

          setIsSuccess(true);
          setFile(null);
          setIsUploading(false);
        } else {
          setIsUploading(false);
          alert("Error subiendo archivo");
        }
      };

      xhr.onerror = () => {
        setIsUploading(false);
        alert("Error subiendo archivo");
      };

      xhr.send(file);
    } catch (err) {
      setIsUploading(false);
      console.error(err);
    }
  };

  return (
    <div className="d-flex flex-column gap-2" style={{ minWidth: "250px" }}>
      {/* Hidden input */}
      <input type="file" ref={inputRef} onChange={handleFileChange} hidden />

      {/* Select File Button */}
      <button
        className="btn btn-outline-secondary btn-sm"
        onClick={() => inputRef.current?.click()}
      >
        <i className="ri-upload-2-line me-1"></i>
        Select File
      </button>

      {/* File Name */}
      {file && (
        <div className="small text-muted text-truncate">{file.name}</div>
      )}

      {/* Upload Button */}
      {file && (
        <button
          className="btn btn-success btn-sm"
          onClick={handleUpload}
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" />
              Uploading...
            </>
          ) : (
            <>
              <i className="ri-cloud-upload-line me-1"></i>
              Upload
            </>
          )}
        </button>
      )}

      {/* Progress Bar */}
      {isUploading && (
        <div className="progress" style={{ height: "6px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Success State */}
      {isSuccess && (
        <div className="text-success small">
          <i className="ri-check-line me-1"></i>
          Upload successful
        </div>
      )}
    </div>
  );
};
