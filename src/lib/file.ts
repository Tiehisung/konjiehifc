import { IFileProps } from "@/types";

export const getFileExtension = (mediaOrUrl: IFileProps | string): string => {
    if (!mediaOrUrl) return '';
    const fileSplit = typeof mediaOrUrl == 'string' ? mediaOrUrl?.split('.') : mediaOrUrl?.secure_url?.split('.');
    const extension = fileSplit[fileSplit.length - 1];//extension as last element
    return extension.toLowerCase();
};

export const openFileInTab = (fileUrl: string) => {
    if (fileUrl) window.open(fileUrl, '_blank', 'noopener,noreferrer');
    else alert('Invalid file');
};