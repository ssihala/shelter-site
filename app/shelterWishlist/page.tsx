"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  Slider,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon, Add as AddIcon , Save as SaveIcon} from "@mui/icons-material";

export default function WishlistPage() {
  const shelterName = "[temp]";

  // Get item list from backend
  const getItemList = () => {

  };

  const [itemList, setItemList] = useState([
    { name: "test1", needUrgency: 3 },
    { name: "test2", needUrgency: 1 },
    { name: "test3", needUrgency: 2 },
  ]);

  // Function to get slider color
  const getSliderColor = (value:number) => {
    if (value === 1) return "success.main";
    if (value === 2) return "warning.main";
    return "error.main";
  };

  // Function to get urgency text
  const getNeedText = (value:number) => {
    if (value === 1) return "Low";
    if (value === 2) return "Medium";
    if (value === 3) return "High";
    return "Error";
  };

  // Handle slider change
  const handleSliderChange = (value:number|number[], index:number) => {
    if (typeof value === "number") {
      const newItemList = [...itemList];
      newItemList[index].needUrgency = value;
      setItemList(newItemList);
    }
  };

  // Add new item
  const addItem = () => {
    const newItem = { name: "", needUrgency: 1 };
    setItemList([...itemList, newItem]);
  };
  
  // Remove item
  const removeItem = (index:number) => {
    const newItemList = [...itemList];
    newItemList.splice(index, 1);
    setItemList(newItemList);
  };

  // Send item list to backend
  const saveItemList = () => {

  };

  return (
    <Box sx={{padding: "20px" , overflowX: "hidden"}}>

      {/* Item List */}
      <List>
        <ListItem>{/*List header*/}
          <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 0",
            alignItems: "center",
            width: "100%",
            borderBottom: "1px solid #000",
          }}
          >
            <Typography variant="h6" sx={{alignSelf: "flex-end"}}>Item Name</Typography>
            {/* Header */}
            <Box textAlign="center" mb={4}>
              <Typography variant="h3" fontWeight="bold">
                {shelterName}
              </Typography>
            </Box>
            <Typography variant="h6" sx={{alignSelf: "flex-end"}}>Urgency</Typography>
          </Box>
        </ListItem>
        {itemList.map((item, index) => (
          <ListItem
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 0",
              borderBottom: "1px solid #ddd",
              boxShadow: "0 4px 6px 0 #ddd",
              borderRadius: "5px",
            }}
          >
            {/* Item Name */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={() => removeItem(index)}
                color="error"
                sx={{ mr: 2 }}
              >
                <DeleteIcon />
              </IconButton>
              <TextField
                variant="standard"
                size="small"
                value={item.name}
                placeholder="Item name"
                onChange={(e) => {
                  const newItemList = [...itemList];
                  newItemList[index].name = e.target.value;
                  setItemList(newItemList);
                }}
                sx={{ width: "200px" }}
              />
            </Box>

            {/* Urgency Slider */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                padding: "0 20px",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: getSliderColor(item.needUrgency),
                  fontWeight: "bold",
                }}
              >
                {getNeedText(item.needUrgency)}
              </Typography>
              <Slider
                value={item.needUrgency}
                min={1}
                max={3}
                step={1}
                marks
                sx={{
                  color: getSliderColor(item.needUrgency),
                  width: "120px",
                }}
                onChange={(e, value) => handleSliderChange(value, index)}
              />
            </Box>
          </ListItem>
        ))}

        {/* Add Item Button */}
        <ListItem
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={addItem}
              >
                Add Item
              </Button>
              <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={saveItemList}
            >
              Save
            </Button>
          </Box>
        </ListItem>
      </List>
    </Box>
  );
}