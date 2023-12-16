import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

import config from "../../config/config";
import { IconButton } from "@mui/material";

interface Props {
  searchCollection?: string;
  attribute?: string;
  initialValue?: string;
  value?: string;
  onSearch: (searchTerm: string, searchCollection: string, attribute?: string) => void;
}

const goSearch = async (searchTerm: string, searchCollection: string, attribute = "name") => {
  const response = await axios.get(`${config.API_URL}/${searchCollection}/search/?${attribute}=${searchTerm}`);
  return response.data;
};

const NameSearchBar: React.FC<Props> = ({
  searchCollection = "medicines",
  attribute = "name",
  initialValue = "",
  value = "", // Add this line
  onSearch
}) => {
  // let firstLetter = searchCollection.charAt(0).toUpperCase();
  // const withoutLastChar = searchCollection.slice(1, -1); // the plural form
  // let labelName = firstLetter + withoutLastChar;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

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
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          alignItems: "center"
        }}
      >
        <TextField
          // label={initialValue}
          value={searchTerm}
          onChange={handleTextChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
              e.preventDefault();
            }
          }}
          id="filled-start-adornment"
          placeholder={initialValue}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch} edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
          variant="outlined"
        />
      </Box>
    </Box>
  );
};

export { NameSearchBar, goSearch };
