export interface PostConfirmUploadDto {
  module: string;
  folderId: number | null;
  originalName: string;
  s3Key: string;
  mimeType: string;
  size: number;
}
