
import { IFileProps } from ".";

export interface IDocFile extends IFileProps {
    format: "pdf" | "image";
    folder: string;
}
export interface IFolder {
    _id: string;
    name: string
    description?: string
    tags?: string[]
    documents?: IDocFile[]
    createdAt?: string
    updatedAt?: string
}