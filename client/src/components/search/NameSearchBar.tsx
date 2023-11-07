import { useState } from "react";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button/Button";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

import config from "../../config/config";
import { IconButton } from "@mui/material";

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

  const handleSearch = () => {
    onSearch(searchTerm, searchCollection, attribute);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      onSearch("", searchCollection, attribute);
    }
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <div
        style={{
          display: "flex",
          borderRadius: "2px",
        }}
      >
        <TextField
          label={labelName}
          onChange={handleTextChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
              e.preventDefault();
            }
          }}
          id="filled-start-adornment"
          placeholder={initialValue}
          size="small"
          sx={{ m: 1, width: "30vw" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">{attribute}:</InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="filled"
        />
      </div>
    </Box>
  );
};

export { NameSearchBar, goSearch };
