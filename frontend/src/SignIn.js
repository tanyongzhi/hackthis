import React, { useState, Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import SearchPage from '../src/screens/SearchPage'


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

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false
    }
    this.changeAuth = this.changeAuth.bind(this)
  }
  changeAuth(response) {
    console.log(response);
    this.setState({auth: true});
  }
  render() {
    if (this.state.auth) {
      return(
      <SearchPage/>
      )
    } else {
      return(
       <TempSignIn handler={this.changeAuth}/>
      )
    }
    
  }
}

function TempSignIn(props) {
  const classes = useStyles();
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

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
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Login"
            onSuccess={props.handler}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
      </div>
      <Box mt={8}></Box>
    </Container>
  );

}
