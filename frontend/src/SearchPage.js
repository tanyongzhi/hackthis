import React from "react";
import { TextField, Box, Button } from "@material-ui/core";

export default function SearchPage() {
  return (
    <div className="App">
      <Box width="75%" alignItems="center" justifyContent="center">
        <Box m={4}>
          <TextField
            id="outlined-search"
            label="Search field"
            type="search"
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box>
          <Button variant="outlined">Search</Button>
        </Box>
      </Box>
    </div>
  );
}
