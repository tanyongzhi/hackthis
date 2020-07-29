import React from 'react';
import { TextField, Box, Button } from '@material-ui/core';


export default function SearchPage() {

    return(
        <Box  width="75%" alignItems = "center" justifyContent = "center" spacing={2}>
            <Box m = {4}>
                <TextField id="outlined-search" label="Search field" type="search" variant="outlined" fullWidth spacing={2}/>
            </Box>
            <Box>
                <Button variant="outlined" spacing={2}>Search</Button>
            </Box>
             
        </Box>
    );
}
