import * as React from "react";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button/Button";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  searchCollection?: string;
  initialValue?: string;
  onSearch: (searchTerm: string, searchCollection: string) => void;
}

const NameSearchBar: React.FC<Props> = ({
  searchCollection = "medicines",
  initialValue = "",
  onSearch,
}) => {
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
          label="Medicine"
          onChange={handleTextChange}
          id="filled-start-adornment"
          placeholder={initialValue}
          size="small"
          sx={{ m: 1, width: "80vw" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">name</InputAdornment>
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

export default NameSearchBar;
