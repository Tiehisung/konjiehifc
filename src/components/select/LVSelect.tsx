// import InputLabel from "../Labels";
// import { FaAngleDown } from "react-icons/fa";
// import { OverlayLoader } from "../OverlayLoader";
// import { useState } from "react";
// import { BasicInputProps } from "../Input";

// interface LVSelectProps extends BasicInputProps {
//   options?: { value: string | number; label: string }[];
//   onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
//   isLoading?: boolean;
// }

// /**
//  *
//  * @param data Array of objects containing 'value' and 'label'.
//  * @returns
//  */
// export const LVSelector: React.FC<
//   Omit<LVSelectProps, 'inputStyles' | 'wrapperStyles'>
// > = ({
//   label = 'Label',
//   name,
//   options = [],
//   value,
//   placeholder = 'Select',
//   onChange,
//   error,
//   labelStyles,
//   selectStyles,
//   className,
//   required = false,
//   others,
 
//   isLoading = false,
// }) => {
//   const [isFocused, setIsFocused] = useState(false);
  
//   const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     if (onChange) {
//       onChange(e);
//     }
//   };

//   return (
//     <div className={`group relative max-w-full p-0.5 ${className}`}>
//       <InputLabel
//         label={label as string}
//         value={value as string}
//         className={labelStyles}
//         name={name}
//         required={required}
//       />
//       <div className="flex items-center relative">
//         <select
//           name={name}
//           value={value}
//           id={name}
//           required={required}
//           className={`w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent appearance-none grow min-w-10 pr-8 focus:outline outline-primary text-sm ${selectStyles}`}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => {
//             setIsFocused(false);
//           }}
//           onChange={handleInputChange}
//           {...others}
//         >
//           <option value="" hidden>
//             {placeholder}
//           </option>
//           {options?.map((item, i) => (
//             <option
//               key={item.value + String(i)}
//               value={item.value}
//               selected={value == item.value!}
//               className="rounded-xl bg-muted text-muted-forground"
//             >
//               {item.label}
//             </option>
//           ))}
//         </select>
//         <FaAngleDown
//           size={16}
//           className={`absolute right-2.5 text-muted-foreground z-[0] _slowTrans ${
//             isFocused ? "rotate-180" : ""
//           }`}
//         />
//       </div>

//       {error && (
//         <p className={` text-red-500 ${error ? "block" : "hidden "}`}>
//           {error}
//         </p>
//       )}

//       <OverlayLoader isLoading={isLoading} iconClassName="text-xl" />
//     </div>
//   );
// };
 