import React from 'react';
import { TextField, Box } from '@material-ui/core';


export default function SearchPage() {

    return(
        <Box component="main" width="75%" alignItems="center" justify="center" border = {true}>
             <TextField id="outlined-search" label="Search field" type="search" variant="outlined" fullWidth/>
        </Box>
    );
}
