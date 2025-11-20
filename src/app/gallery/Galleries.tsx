// // components/gallery/Gallery.tsx
// "use client";

// import React, { useMemo, useState } from "react";
// import Image from "next/image";
// import LightboxViewer from "@/components/viewer/LightBox";
// import { IFileProps } from "@/types";
// import { shortText } from "@/lib";

// type Props = {
//   images: IFileProps[];
//   className?: string;
//   startIndex?: number;
// };

// export default function GalleryClient({
//   images,
//   className = "",
//   startIndex = 0,
// }: Props) {
//   const [open, setOpen] = useState(false);
//   const [index, setIndex] = useState(startIndex);

//   // Prepare slides for lightbox
//   const slides = useMemo(
//     () =>
//       images?.map((img) => ({
//         src: img.secure_url,
//         width: img.width ?? 1600,
//         height: img.height ?? 900,
//         title:shortText(img.original_filename as string,20),  
//         description: img.description,
//       })),
//     [images]
//   );

//   return (
//     <div className={`gallery-root p-3 ${className}`}>
      
//       {/* Grid */}
//       <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
//         {images.map((img, i) => (
//           <button
//             key={img.secure_url + i}
//             onClick={() => {
//               setIndex(i);
//               setOpen(true);
//             }}
//             className="relative overflow-hidden rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
//             aria-label={img.original_filename ?? `Open image ${i + 1}`}
//             type="button"
//           >
//             <div className="relative w-full aspect-[4/3] bg-gray-100">
//               <Image
//                 src={img.secure_url}
//                 alt={img.original_filename ?? `Image ${i + 1}`}
//                 fill
//                 sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
//                 className="object-cover transform transition-transform duration-300 hover:scale-105"
//                 priority={i < 3} // preload a few for speed
//               />
//             </div>

//             {/* overlay */}
//             <div className="absolute inset-0 flex items-end p-2">
//               <div className="bg-modalOverlay text-white text-xs rounded px-2 py-1 backdrop-blur-sm">
//                 {img?.description??img.original_filename ?? `Image ${i + 1}`}
//               </div>
//             </div>
//           </button>
//         ))}
//       </div>

//       {/* Lightbox */}
//       <LightboxViewer
//         open={open}
//         onClose={() => setOpen(false)}
//         images={slides}
//         index={index}
//       />
//     </div>
//   );
// }
