export type FileT = {
  id: string;
  folder_id: number;
  module: string;
  original_name: string;
  s3_key: string;
  mime_type: string;
  size: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export type FolderT = {
  id: string;
  name: string;
  module: string;
  parent_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};
