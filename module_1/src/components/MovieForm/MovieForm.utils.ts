import type { StylesConfig } from "react-select";
import type { GenreOption } from "./MovieForm";

export const selectStyles: StylesConfig<GenreOption, true> = {
  control: (base) => ({
    ...base,
    background: "#323232",
    border: "none",
    padding: "6px",
    borderRadius: "4px",
    color: "#FFFFFF",
    fontSize: "20px",
    fontWeight: "400",
  }),
  menu: (base) => ({
    ...base,
    background: "#323232",
    color: "#FFFFFF",
  }),
  multiValue: (base) => ({
    ...base,
    background: "#f65261",
    color: "#FFFFFF",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#FFFFFF",
  }),
  option: (base) => ({
    ...base,
    background: "#323232",
    color: "#FFFFFF",
    ":hover": { background: "#323232" },
  }),
};