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
  _id?: string; //Trace any saved file data on db
  name?: string;
  description?: string; //Optional field to save with file on db
  createdAt?: string;
  updatedAt?: string;
}
export interface IDeleteFile {
  _id?: string; //Trace any saved file data on db
  public_id: string;
  resource_type?: string;
}

export interface IFileUpload {
  name: string;
  path: string;
  type?: string;
  preset?: EPreset;
  folder?: string; //eg. logos, images, videos, audios/qiraa
  presetType?: EPresetType;
  description?: string;
}


export interface IGalleryProps {
  _id?: string;
  tags: string[];
  title?: string;
  description: string;
  files: Array<IFileProps>;
  type?: 'player' | 'donation' | 'general',
  timestamp?: number;
  createdAt?: string;
  updatedAt?: string;
}

//Cloudinary

export enum EPresetType {
  AUTHENTICATED = "authenticated",
  UNAUTHENTICATED = "unauthenticated"
}


export enum EPreset {
  KFC_SIGNED = "kfc-signed",
  KFC_UNSIGNED = 'kfc-unsigned'
};
export type TResourceType = "image" | "video" | "audio" | "auto";
// export type TFolders = "images/logos" | "images" | "videos" | "audios";

export type IRecord = Record<string, string | string[] | undefined>

export interface IQueryResponse<T = unknown> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
  pagination?: IPagination
}
export interface IPageProps {
  searchParams: Promise<Record<string, string | undefined>>;
  params: Promise<Record<string, string | undefined>>;
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
  date?: string
  endDate?: string
  search?: string

}

export type TSearchKey =
  'search'
  | 'captain_search'
  | 'player_search'
  | 'manager_search'
  | 'match_search'
  | 'squad_search'
  | 'sponsor_search'
  | 'card_search'
  | 'injury_search'
  | 'news_search'
  | 'goal_search'
  | 'team_search'
  | 'gallery_search'
  | 'training_search'
  | 'transaction_search'
  | 'log_search'
  | 'doc_search'
  | 'user_search'