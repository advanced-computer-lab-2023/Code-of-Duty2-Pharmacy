import * as React from "react";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button/Button";
import SearchIcon from "@mui/icons-material/Search";
import Medicine from "../types/Medicine";
import config from "../config/config";
import axios from "axios";

interface Props {
  searchCollection?: string;
  initialValue?: string;
  onSearch: (searchTerm: string, searchCollection: string) => void;
}

const goSearch = async (
  searchTerm: string,
  searchCollection: string
): Promise<Medicine[]> => {
  // console.log("search");

  const response = await axios.get(
    `${config.API_URL}/${searchCollection}/search/?name=${searchTerm}`
  );
  console.log("searching for " + searchTerm + " in " + searchCollection);

  return response.data;
};

const NameSearchBar: React.FC<Props> = ({
  searchCollection = "medicines",
  initialValue = "",
  onSearch,
}) => {
  let firstLetter = searchCollection.charAt(0).toUpperCase();
  const withoutLastChar = searchCollection.slice(1, -1); // the plural form
  let labelName = firstLetter + withoutLastChar;

  let [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = () => {
    onSearch(searchTerm, searchCollection);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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
              <InputAdornment position="start">name:</InputAdornment>
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
