import React from "react";
import SignIn from "./SignIn";
import SearchPage from "./SearchPage";
import SearchResults from "./SearchResults";
import { Container } from 'semantic-ui-react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useParams } from "react-router";
import "./App.css";

function App() {
  // return <SearchPage />;
  // return <SignIn />;
  // return (
  //   <Router>
  //     <Switch>
  //       <Route path='/search/:token' render={()=><SearchPage/>} />
  //       <Route path="/" render={()=><SignIn/>}/>
  //     </Switch>
  //   </Router>
  // );
  return (
    <Container style={styles.containerPadding}>
      <SearchPage />
      <SearchResults />
    </Container>
  );
}

const styles ={
  containerPadding: {
    paddingTop: '2em',
    paddingBottom: '2em'
  }
}

export default App;


