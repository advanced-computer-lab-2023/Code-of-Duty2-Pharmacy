import { useState } from "react";
import { Box, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

import config from "../config/config";

interface Props {
  searchCollection?: string;
  attribute?: string;
  initialValue?: string;
  onSearch: (
    searchTerm: string,
    searchCollection: string,
    attribute?: string
  ) => void;
}

const goSearch = async (
  searchTerm: string,
  searchCollection: string,
  attribute = "name"
) => {
  const response = await axios.get(
    `${config.API_URL}/${searchCollection}/search/?${attribute}=${searchTerm}`
  );

  return response.data;
};

const NameSearchBar: React.FC<Props> = ({
  searchCollection = "medicines",
  attribute = "name",
  initialValue = "",
  onSearch,
}) => {
  let firstLetter = searchCollection.charAt(0).toUpperCase();
  const withoutLastChar = searchCollection.slice(1, -1); // the plural form
  let labelName = firstLetter + withoutLastChar;

  let [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(searchTerm, searchCollection, attribute);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      onSearch("", searchCollection, attribute);
    }
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "95vw",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={labelName}
        inputProps={{ "aria-label": labelName }}
        onChange={handleTextChange}
        value={searchTerm}
      />
      <IconButton
        type="submit"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={handleSearch}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export { NameSearchBar, goSearch };
