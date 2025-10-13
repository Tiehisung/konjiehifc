import { StylesConfig } from "react-select";

export const customStyles: StylesConfig = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "transparent",
    borderColor: Color.mediumGrey,
    minHeight: "40px",
    boxShadow: state.isFocused ? `0 0 0 1px ${Color.liteBlue}` : "none",
    "&:hover": {
      borderColor: "#aaa",
    },
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 20,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? Color.liteBlue
      : state.isFocused
      ? Color.white
      : "white",
    color: state.isSelected ? "white" : "black",
    "&:hover": {
      backgroundColor: Color.liteGrey,
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: Color.liteBlue,
    color: "white",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "white",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "white",
    "&:hover": {
      backgroundColor: Color.darkBlue,
      color: Color.red,
    },
  }),
};

export enum Color {
  red = "#bf2026",

  teal = "#006265",

  blue = "#285bd4",
  liteBlue = "#70bfff",
  darkBlue = "#171c2e",

  liteGrey = "#e9ecef",
  mediumGrey = "#ccc",
  grey = "#272727",

  green = "#82b440",

  placeholder = "#646464",
  modalTransparent = "#1a1212b1",
  white = "#fff",
  black = "#455A64",
}
