import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

interface SearchBarProps {
  placeholder?: string;
  className?: string; // We'll still keep className to allow for custom classes if needed
}

export const SearchBar: React.FC<SearchBarProps> = ({ className = "", placeholder = "Search" }) => (
  <div className={className}>
    <TextField
      variant="outlined"
      placeholder={placeholder}
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search style={{ color: "#606060" }} />
          </InputAdornment>
        ),
      }}
      sx={{
        width: "auto",
        maxWidth: "900px", 
        borderRadius: "30px",
        '& .MuiOutlinedInput-root': {
          borderRadius: "30px", 
          paddingLeft: "60px",
          paddingRight: "40px",
        },
        '& .MuiInputBase-input': {
          paddingLeft: "30px", 
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: "#bdbdbd", 
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: "#9e9e9e", 
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: "#3f51b5", 
        },
      }}
    />
  </div>
);

export default SearchBar;
