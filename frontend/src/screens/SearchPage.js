import React, { useState, useEffect } from "react";
import { Header, Divider, Input, Button, Container } from "semantic-ui-react";
import SignIn from "../SignIn";
import SearchResults from "./SearchResults";

const BACKEND_URL = process.env.BACKEND_URL;
const axios = require("axios");
require("dotenv").config({ path: "../../.env" });

async function verify(response) {
  return await axios.post("http://localhost:3000/auth/verify", {
    token: response.tokenId,
    id: response.googleId,
  });
}

async function search(response) {
  return await axios.get("http://localhost:3000/search", {
    params: {
      query: response,
    },
  });
}

const SearchPage = (props) => {
  const [keyword, setKeyWord] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [pressSearch, setPressSearch] = useState(false);
  const [searchHistory, setSearchHistory] = useState(false);
  const [bookArray, setBookArray] = useState([]);

  useEffect(() => {
    if (!isAuth) {
      let reply = verify(props.response);
      reply.then(setIsAuth(true)).catch((err) => {
        console.error(err);
        props.handler();
        setIsAuth(false);
      });
    }
  });

  const keywordInputHandler = (e) => {
    setKeyWord(e.target.value);
  };

  const searchButtonHandler = (e) => {
    console.log(keyword);
    let reply = search(keyword);
    reply
      .then(function (res) {
        setBookArray(res.data);
        setPressSearch(true);
        console.log(res.data);
      })
      .catch((err) => {
        // Handle Error Here
        console.error(err);
      });
  };

  if (!isAuth) {
    return <SignIn />;
  } else {
    if (!searchHistory) {
      if (!pressSearch) {
        return (
          <Container style={styles.containerPadding}>
            <div>
              <Header as="h1" textAlign="center">
                Textbook Search
              </Header>
              <Divider />
              <span>Keyword</span>
              <div style={styles.bottomMargin}>
                <Input
                  fluid
                  style={styles.bottomMargin}
                  value={keyword}
                  onChange={keywordInputHandler}
                />
              </div>
              <Divider />
              <div style={styles.textCenter}>
                <Button primary onClick={searchButtonHandler}>
                  Search
                </Button>
                <Button>Search History</Button>
              </div>
            </div>
          </Container>
        );
      } else {
        return (
          <Container style={styles.containerPadding}>
            <div>
              <Header as="h1" textAlign="center">
                Textbook Search
              </Header>
              <Divider />
              <span>Keyword</span>
              <div style={styles.bottomMargin}>
                <Input
                  fluid
                  style={styles.bottomMargin}
                  value={keyword}
                  onChange={keywordInputHandler}
                />
              </div>
              <div style={styles.textCenter}>
                <Button primary onClick={searchButtonHandler}>
                  Search
                </Button>
                <Button>Search History</Button>
              </div>
              <Divider />
              <SearchResults array={bookArray} id={props.response.googleId} />
            </div>
          </Container>
        );
      }
    } else {
      return (
        <Container style={styles.containerPadding}>
          <div>
            <Header as="h1" textAlign="center">
              Textbook Search
            </Header>
            <Divider />
            <span>Keyword</span>
            <div style={styles.bottomMargin}>
              <Input
                fluid
                style={styles.bottomMargin}
                value={keyword}
                onChange={keywordInputHandler}
              />
            </div>
            <div style={styles.textCenter}>
              <Button primary onClick={searchButtonHandler}>
                Search
              </Button>
              <Button>Search History</Button>
            </div>
            <Divider />
            
          </div>
        </Container>
      );
    }
  }
};

const styles = {
  containerPadding: {
    paddingTop: "2em",
    paddingBottom: "2em",
  },
  bottomMargin: {
    marginBottom: "1em",
  },
  textCenter: {
    textAlign: "center",
  },
};

export default SearchPage;
