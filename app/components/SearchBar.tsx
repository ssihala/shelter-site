import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (term: string) => void;
  className?: string; 
}

export const SearchBar: React.FC<SearchBarProps> = ({ className = "", placeholder = "Search", onSearch }): React.ReactNode => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    onSearch(inputValue); 
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <TextField
        variant="outlined"
        placeholder={placeholder}
        fullWidth
        value={inputValue}
        onChange={handleChange} 
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
    </form>
  );
};

export default SearchBar;
