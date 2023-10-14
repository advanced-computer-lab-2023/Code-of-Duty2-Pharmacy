import { useState } from "react";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button/Button";
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
  // console.log("search");
  const response = await axios.get(
    `${config.API_URL}/${searchCollection}/search/?${attribute}=${searchTerm}`
  );
  console.log(
    "link : " +
      `${config.API_URL}/${searchCollection}/search/?${attribute}=${searchTerm}`
  );
  console.log(
    "searching for '" +
      searchTerm +
      "' in " +
      searchCollection +
      " " +
      attribute +
      "s"
  );
  console.log(response.data.length + " results found");

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
      <div>
        <TextField
          label={labelName}
          onChange={handleTextChange}
          id="filled-start-adornment"
          placeholder={initialValue}
          size="small"
          sx={{ m: 1, width: "80vw" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">{attribute}:</InputAdornment>
            ),
          }}
          variant="filled"
        />

        <Button
          variant="contained"
          endIcon={<SearchIcon />}
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
    </Box>
  );
};

export { NameSearchBar, goSearch };
