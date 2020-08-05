import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import GoogleLogin from 'react-google-login';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const responseGoogle = (response) => {
  console.log(response);
}

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

export default function SignIn() {
  const classes = useStyles();
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  var ID;
  var ID_TOKEN;

  return (       
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
 
        {/* <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={(e) => {
            window.location.href='http://localhost:3000/auth/google'
          }}
        >
          Authenticate using Google
        </Button> */}
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Login"
            onSuccess={(response) => {
              console.log(response)
            }}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}
