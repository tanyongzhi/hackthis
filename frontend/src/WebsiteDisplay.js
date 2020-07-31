import React from "react";
import { Box, Paper, Grid } from "@material-ui/core";

export default function WebsiteDisplay(props) {
    return (
        <Grid container spacing={1} direction="column" border={1}>
            <Grid item xs = {3}>
                <Box p={1}> {props.name}</Box>
            </Grid>
            <Grid item xs = {9} direction="column">
                <Box p={1}> Price: </Box>
                <Box p={1}> Rating: </Box>
            </Grid>
        </Grid>
    );
}