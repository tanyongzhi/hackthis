import React from "react";
import SignIn from "./SignIn";
import SearchPage from './screens/SearchPage';
import SearchResults from './screens/SearchResults';
import { Container } from 'semantic-ui-react';
// import { Router } from "@reach/router"
import TripSearchResults from './screens/SearchResults';
import TripSearch from './screens/SearchPage';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <SignIn/>
  );
}

const styles ={
  containerPadding: {
    paddingTop: '2em',
    paddingBottom: '2em'
  }
}

export default App;


