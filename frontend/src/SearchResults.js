import React from "react";
import { Box } from "@material-ui/core";
import TextBookCard from './TextbookCard'

export default function SearchResults() {
  return (
    <div>
      <Box width="100%" alignItems="center" justifyContent="center" spacing={2}>
        <Box m={4} p={2} width="50%" border={1} spacing={2} borderRadius={16}>
          search result: java
        </Box>
        <TextBookCard/>
        <TextBookCard/>
      </Box>
    </div>
  );
}
