import React, { useState, useEffect } from "react";
import { ThemeProvider, useTheme } from "../lib/useTheme";
import Select from "react-select";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    textAlign: "left",
    background: "none",
    color: "black",
  }),
  control: (provided, state) => ({
    ...provided,
    border: "1px solid #ccc",
    boxShadow: "0",
  }),
};
const options = [
  { value: "africa", label: "Africa" },
  { value: "americas", label: "America" },
  { value: "asia", label: "Asia" },
  { value: "europe", label: "Europe" },
  { value: "oceania", label: "Oceania" },
];

function Component({ selectedOption, setSelectedOption }) {
  const [state] = useTheme();
  return (
    <div className="search-select">
      <Select
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            neutral0: state.isDark ? "#202c37" : "#fff",
            neutral80: state.isDark ? "#ccc" : "#000",
          },
        })}
        placeholder="Filter by Region"
        styles={customStyles}
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
    </div>
  );
}

export default Component;
