import React from "react";
import SignIn from "./SignIn";
import SearchPage from "./SearchPage";
import SearchResults from "./SearchResults";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useParams } from "react-router";
import "./App.css";

function App() {
  // return <SearchPage />;
  // return <SignIn />;
  return (
    <Router>
      <Switch>
        <Route path='/search/:token' render={()=><SearchPage/>} />
        <Route path="/" render={()=><SignIn/>}/>
      </Switch>
    </Router>
  );

}
export default App;
