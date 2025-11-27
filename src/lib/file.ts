import { IFileProps } from "@/types";
import { bytesToMB } from ".";

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

export const validateFile = (
    file?: File,
    fileType: "image" | "pdf" | "video" | "all" = "all",
    maxSize: number = 10000000
) => {

    console.log({ file, fileType, size: file?.size})
    if (bytesToMB(file?.size ?? 0) > bytesToMB(maxSize)) {
        return { status: false, message: `File too large. Accepts less than ${bytesToMB(maxSize)} MB` };
    }

    let validMimeTypes: string[] = [];
    switch (fileType) {
        case "image":
            validMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
            break;
        case "pdf":
            validMimeTypes = ["application/pdf"];
            break;
        case "video":
            validMimeTypes = ["video/mp4", "video/webm", "video/ogg"];
            break;
        case "all":
            validMimeTypes = [];
            break;
    }

    if (
        validMimeTypes.length > 0 &&
        !validMimeTypes.includes(file?.type as string)
    ) {
        return { status: false, message: `Invalid file type. Accepted: ${fileType}` };
    }

    return { status: true, message: '' };
};