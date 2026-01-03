import { IFileProps, IFileUpload } from "./file.interface";

export interface INewsProps {
  _id: string;
  slug: string;
  stats?: {
    isTrending: boolean;
    isLatest: boolean;
  };
  headline: {
    text: string;
    image: string;
    hasVideo?: boolean;
    sponsor?: Partial<IFileProps>;
  };
  details: {
    _id?: string;
    text?: string;
    media?: Partial<IFileProps>[];
  }[];
  metaDetails?: unknown; //ISquad etc
  reporter?: {
    name: string;
    avatar: string;
  };
  isPublished?: boolean;
  type?: "squad" | "signing" | "match" | "training" | "general";
  summary?: string;
  tags?: string[];
  likes?: { name: string; date: string; device?: string }[];
  views: { name: string; date: string; device?: string }[];
  shares?: { name: string; date: string; device?: string }[];
  comments?: { image?: string; name?: string; comment: string; date: string }[];
  createdAt: string;
  updatedAt: string;
}
export interface IPostNews {
  stats?: {
    isTrending: boolean;
    isLatest: boolean;
  };
  headline: {
    text: string;
    image: Partial<IFileUpload>;
    hasVideo?: boolean;
    sponsor?: Partial<IFileUpload>;
  };
  details: {
    _id?: string;
    text?: string;
    media?: IFileUpload[];
  }[];
  reporter?: {
    name: string;
    avatar: Partial<IFileProps>;
  };
}