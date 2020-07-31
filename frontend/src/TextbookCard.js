import React from "react";
import { Box, Grid } from "@material-ui/core";
import WebsiteDisplay from "./WebsiteDisplay.js";

export default function TextBookCard() {
  return (
    <Box m={4} p={2} spacing={2} border={1}>
      <Grid container spacing={3}>
        <Grid item container spacing={1}>
          <Grid item xs={8}>
            <Box border={1} borderRadius={16} p={1}>
              {" "}
              Textbook Name
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box border={1} borderRadius={16} p={1}>
              Author: Ho Yi Shian
            </Box>
          </Grid>
        </Grid>
        <Grid item container spacing={1}>
          <Grid item xs={6}>
            <Box border={1} borderRadius={16} p={1}>
              <WebsiteDisplay name = "Amazon"/>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box border={1} borderRadius={16} p={1}>
              <WebsiteDisplay name = "Textbooks.com"/>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box border={1} borderRadius={16} p={1}>
              <WebsiteDisplay name = "Book Depository"/>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box border={1} borderRadius={16} p={1}>
              <WebsiteDisplay name = "CampusBookRentals.com"/>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
