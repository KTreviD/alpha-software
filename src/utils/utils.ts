export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB", "TB"];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const size = bytes / Math.pow(k, i);

  return `${parseFloat(size.toFixed(2))} ${units[i]}`;
};

export const getFriendlyFileType = (mimeType: string): string => {
  if (!mimeType) return "FILE";

  const mimeMap: Record<string, string> = {
    // Images
    "image/png": "PNG",
    "image/jpeg": "JPG",
    "image/jpg": "JPG",
    "image/webp": "WEBP",
    "image/gif": "GIF",
    "image/svg+xml": "SVG",

    // Documents
    "application/pdf": "PDF",
    "text/csv": "CSV",
    "application/msword": "DOC",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "DOCX",
    "application/vnd.ms-excel": "XLS",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "XLSX",
    "application/vnd.ms-powerpoint": "PPT",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      "PPTX",
    "text/plain": "TXT",

    // Archives
    "application/zip": "ZIP",
    "application/x-zip-compressed": "ZIP",
    "application/x-rar-compressed": "RAR",
    "application/x-7z-compressed": "7Z",

    // Videos
    "video/mp4": "MP4",
    "video/webm": "WEBM",
    "video/ogg": "OGG",
    "video/quicktime": "MOV",
    "video/x-msvideo": "AVI",
    "video/x-matroska": "MKV",

    // Audio
    "audio/mpeg": "MP3",
    "audio/wav": "WAV",
    "audio/ogg": "OGG",
    "audio/webm": "WEBM",
  };

  if (mimeMap[mimeType]) {
    return mimeMap[mimeType];
  }

  // Fallback por tipo principal (image/, video/, audio/)
  const [type, subtype] = mimeType.split("/");

  if (type === "image") return "IMAGE";
  if (type === "video") return "VIDEO";
  if (type === "audio") return "AUDIO";

  // Último intento: usar el subtype en mayúsculas si existe
  if (subtype) return subtype.toUpperCase();

  return "FILE";
};

export const getFileIcon = (filename: string): string => {
  const extension = filename.split(".").pop()?.toLowerCase();

  if (!extension) return "ri-file-line";

  const iconMap: Record<string, string> = {
    // Images
    png: "ri-image-line",
    jpg: "ri-image-line",
    jpeg: "ri-image-line",
    webp: "ri-image-line",
    gif: "ri-image-line",
    svg: "ri-image-line",

    // Documents
    pdf: "ri-file-pdf-line",
    doc: "ri-file-word-line",
    docx: "ri-file-word-line",
    xls: "ri-file-excel-line",
    xlsx: "ri-file-excel-line",
    csv: "ri-file-excel-line",
    ppt: "ri-file-ppt-line",
    pptx: "ri-file-ppt-line",
    txt: "ri-file-text-line",

    // Archives
    zip: "ri-file-zip-line",
    rar: "ri-file-zip-line",
    "7z": "ri-file-zip-line",

    // Videos
    mp4: "ri-video-line",
    webm: "ri-video-line",
    mov: "ri-video-line",
    avi: "ri-video-line",
    mkv: "ri-video-line",

    // Audio
    mp3: "ri-music-line",
    wav: "ri-music-line",
    ogg: "ri-music-line",
  };

  return iconMap[extension] ?? "ri-file-line";
};

export const getFileIconColor = (filename: string): string => {
  const ext = filename.split(".").pop()?.toLowerCase();

  const colorMap: Record<string, string> = {
    pdf: "text-danger",
    doc: "text-primary",
    docx: "text-primary",
    xls: "text-success",
    xlsx: "text-success",
    csv: "text-success",
    zip: "text-warning",
    rar: "text-warning",
    mp4: "text-info",
    mp3: "text-purple",
  };

  return colorMap[ext ?? ""] ?? "text-muted";
};

export const getFileCategory = (mimeType: string): string => {
  if (!mimeType) return "Other";

  const [type] = mimeType.split("/");

  if (type === "image") return "Images";
  if (type === "video") return "Video";
  if (type === "audio") return "Audio";

  if (
    mimeType.includes("pdf") ||
    mimeType.includes("word") ||
    mimeType.includes("excel") ||
    mimeType.includes("powerpoint") ||
    mimeType.includes("text") ||
    mimeType.includes("csv")
  ) {
    return "Documents";
  }

  return "Other";
};
