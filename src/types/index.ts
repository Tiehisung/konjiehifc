export interface ISelectOptionLV {
  value: string;
  label: string;
}

export interface IResultProps<T = unknown> {
  message: string;
  success: boolean;
  data?: T;
}

export type TConvertedFile = {
  name: string;
  type: string;
  path: string;
  bytes?: number;
};

export interface IFileProps {
  _id: string; //Trace any saved file data on db
  secure_url: string;
  resource_type: string;
  public_id?: string;
  name?: string;
  description?: string; //Optional field to save with file on db
  bytes?: number; //In bytes
  createdAt?: string;
  updatedAt?: string;
}

export interface IFileUpload {
  name: string;
  path: string;
  type?: string;
  preset?: TPreset;
  folder?: string; //eg. logos, images, videos, audios/qiraa
  presetType?: TPresetType;
  description?: string;
}

export interface IGalleryProps {
  description: string;
  files: Array<IFileProps>;
  name?: string;
  _id?: string;
  timestamp?: number;
  createdAt?: string;
  updatedAt?: string;
}

//Cloudinary

export type TPresetType = "authenticated" | "unauthenticated";
export type TPreset = "konjiehifc";
export type TResourceType = "image" | "video" | "audio" | "auto";
// export type TFolders = "images/logos" | "images" | "videos" | "audios";

export type IRecord = Record<string, string | string[] | undefined> | undefined

export interface IQueryResponse<T = unknown> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
  pagination?: IPagination
}

export interface IPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number;
  previousPage: number;
}

export interface IQueryRecords {
  type?: string;
  page?: number
  limit?: number
  startDate?: string
  endDate?: string
  search?: string
}
