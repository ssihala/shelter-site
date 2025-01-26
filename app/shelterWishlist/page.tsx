"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  Slider,
  TextField,
  IconButton,
} from "@mui/material";
import Button from '../ui/Button'
import { Delete as DeleteIcon, Add as AddIcon , Save as SaveIcon} from "@mui/icons-material";

export default function WishlistPage() {
  const shelterName = "[temp]";
  const placeId = "idid"; // Replace with actual place ID

  // Helper functions
  const getNeedText = (value: number): string => {
    if (value == 1) return "Low";
    if (value == 2) return "Medium";
    if (value == 3) return "High";
    return "Error";
  };

  const getSliderColor = (value: number): string => {
    if (value == 1) return "success.main";
    if (value == 2) return "warning.main";
    if (value == 3) return "error.main";
    alert(value);
    return "grey.500";
  };

  interface Item {
    name: string;
    importance: number;
  }

  const [startingItemList, setStartingItemList] = useState<Item[]>([]);
  const [itemList, setItemList] = useState<Item[]>([]);

  const getItemList = async () => {
    try {
      const response = await fetch(`/api/account/list_of_items?place_id=${placeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (data.error) {
        console.error('Error:', data.error);
        return;
      }
      setStartingItemList(JSON.parse(JSON.stringify(data)));
      setItemList(JSON.parse(JSON.stringify(data)));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getItemList();
  }, []);


  // Handle slider change
  const handleSliderChange = (value:number|number[], index:number) => {
    if (typeof value === "number") {
      const newItemList = [...itemList];
      newItemList[index].importance = value;
      setItemList(newItemList);
    }
  };

  // Add new item
  const addItem = () => {
    const newItem = { name: "", importance: 1 };
    setItemList([...itemList, newItem]);
  };
  
  // Remove item
  const removeItem = (index:number) => {
    const newItemList = [...itemList];
    newItemList.splice(index, 1);
    setItemList(newItemList);
  };

  // State for loading
  const [isLoading, setIsLoading] = useState(false);

  // Send item list to backend
  const saveItemList = async () => {
    setIsLoading(true);
    try {
      // Filter for new items
      const newItems = itemList.filter(currentItem => 
        !startingItemList.some(startingItem => 
          startingItem.name === currentItem.name
        )
      );


      // Filter for modified items
      const modifiedItems = itemList.filter(currentItem =>
        startingItemList.some(startingItem =>
          startingItem.name === currentItem.name 
          && startingItem.importance != currentItem.importance
        )
      );

      // Filter for deleted items
      const deletedItems = startingItemList.filter(startingItem =>
        !itemList.some(currentItem =>
          startingItem.name === currentItem.name
        )
      );;

      // Check if there are any items to save
      if (newItems.length + modifiedItems.length + deletedItems.length === 0) {
        alert('No new items to save');
        setIsLoading(false);
        return;
      }

      
      const addPromises = newItems.map(item => 
        fetch('/api/account/add_item', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            param_name: item.name,
            param_importance: item.importance,
            param_place_id: placeId
          })
        })
      );
    
      const updatePromises = modifiedItems.map(item => 
        fetch('/api/account/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            param_name: item.name,
            param_importance: item.importance,
            param_place_id: placeId
          })
        })
      );
    
      const deletePromises = deletedItems.map(item => 
        fetch('/api/account/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            param_name: item.name,
            param_place_id: placeId
          })
        })
      );
    
      const allPromises = [...addPromises, ...updatePromises, ...deletePromises];
      const results = await Promise.all(allPromises);
      const allSuccessful = results.every(res => res.ok);
        
      if (allSuccessful) {
        alert(`Successfully saved ${newItems.length} new items!\nSuccessfully updated ${modifiedItems.length} items!\nSuccessfully deleted ${deletedItems.length} items!`);
        // Refresh the lists after successful save
        await getItemList();
      } else {
        alert('Some items failed to save');
      }
    } catch (error) {
      console.error('Error saving items:', error);
      alert('Failed to save items');
    } finally {
      setIsLoading(false);
    }
  };

  // Check for empty item names
  const checkForEmpty = () => {
    if (itemList.some(item => item.name === "")) {
      alert('Please fill in all item names');
    } else {
      saveItemList();
    }
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
                  color: getSliderColor(item.importance),
                  fontWeight: "bold",
                }}
              >
                {getNeedText(item.importance)}
              </Typography>
              <Slider
                value={item.importance}
                min={1}
                max={3}
                step={1}
                marks
                sx={{
                  color: getSliderColor(item.importance),
                  width: "120px",
                }}
                onChange={(_, value) => handleSliderChange(value, index)}
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
              sx={{ fontSize: "0.9rem" }}
              >
                Add Item
              </Button>
              <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={checkForEmpty}
              disabled={isLoading}
              sx={{ fontSize: "0.9rem" }}
            >
              {isLoading ? 'Saving...' : 'Save Items'}
            </Button>
          </Box>
        </ListItem>
      </List>
    </Box>
  );
}