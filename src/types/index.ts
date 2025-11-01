import { ICldFileUploadResult } from "@/components/cloudinary/FileUploadWidget";
import { IUser } from "./user";

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

export interface IFileProps extends ICldFileUploadResult {
  _id: string; //Trace any saved file data on db
  name?: string;
  description?: string; //Optional field to save with file on db
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
  _id?: string;
  tags: string[];
  title?: string;
  description: string;
  files: Array<IFileProps>;
  timestamp?: number;
  createdAt?: string;
  updatedAt?: string;
}

//Cloudinary

export type TPresetType = "authenticated" | "unauthenticated";
export type TPreset = "konjiehifc";
export type TResourceType = "image" | "video" | "audio" | "auto";
// export type TFolders = "images/logos" | "images" | "videos" | "audios";

export type IRecord = Record<string, string | string[] | undefined|unknown> | undefined

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


export interface ILog {
  _id: string;
  title: string;
  description: string;
  userEmail?: string;
  user?: IUser
  category?: 'auth' | 'api' | 'db' | 'system' | 'ui' | 'other';
  severity?: 'info' | 'warning' | 'error' | 'critical';
  meta?: Record<string, string | number | boolean | null>;
  source?: 'admin' | 'user' | 'system' | 'other';
  url?: string
  createdAt: Date;
  updatedAt?: Date;
}