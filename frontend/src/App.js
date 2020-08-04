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
  // const [authPass, setAuthPass] = useState(False);

  // if (authPass) {
  //   return (
  //     // Render Search Page
  //   );
  // } else {
  //   return (
  //     // Render Sign in Page
  //   );
  // }
  return (
    <Router>
      <Switch>
        <Route path='/search/:token' render={()=><SearchPage/>} />
        <Route path="/" render={()=><SignIn/>}/>
      </Switch>
    </Router>
  );
  
  // return (
  //   <Container style={styles.containerPadding}>
  //     <Router>
  //       <TripSearch path="/" />
  //       <TripSearchResults path="results/:word/:status/:distance/:duration"/>
  //     </Router>
  //   </Container>
  // );
}

const styles ={
  containerPadding: {
    paddingTop: '2em',
    paddingBottom: '2em'
  }
}

export default App;


