"use client";

import React from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Download from "yet-another-react-lightbox/plugins/download";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export interface ILightboxImage {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

interface LightboxViewerProps {
  open: boolean;
  onClose: () => void;
  images: ILightboxImage[];
  index?: number;
  controller?: ControllerProps;
}

interface ControllerProps {
  closeOnPullUp?: boolean | undefined;
  closeOnPullDown?: boolean | undefined;
  closeOnBackdropClick?: boolean | undefined;
  disableSwipeNavigation?: boolean | undefined;
}

/**
 * Custom Lightbox Viewer Component
 * - Zoom
 * - Download
 * - Thumbnails
 * - Navigation (built-in)
 */
export default function LightboxViewer({
  open,
  onClose,
  images,
  index = 0,
  controller,
}: LightboxViewerProps) {
  return (
    <Lightbox
      open={open}
      close={onClose}
      slides={images.map((img) => ({
        src: img.src,
        alt: img.alt,
        width: img.width,
        height: img.height,
      }))}
      index={index}
      plugins={[Zoom, Download, Thumbnails]}
      zoom={{
        maxZoomPixelRatio: 3,
        scrollToZoom: true,
      }}
      controller={{ closeOnBackdropClick: true, ...controller }}
    />
  );
}
