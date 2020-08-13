import React, { useState, useEffect } from "react";
import { Header, Divider, Input, Button, Container } from "semantic-ui-react";
import SignIn from "../SignIn";
import SearchResults from "./SearchResults";
import SearchHistory from "./SearchHistory";
import GitHubForkRibbon from 'react-github-fork-ribbon';

const axios = require("axios");
require("dotenv").config({ path: "../../.env" });

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
console.log("backend urll " + BACKEND_URL);

async function verify(response) {
  return await axios.post(BACKEND_URL + "/auth/verify", {
    token: response.tokenId,
    id: response.googleId,
  });
}

async function search(response) {
  return await axios.get(BACKEND_URL + "/search", {
    params: {
      query: response,
    },
  });
}

async function history(id) {
  return await axios.get(BACKEND_URL + "/books/" + id);
}

const SearchPage = (props) => {
  const [keyword, setKeyWord] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [pressSearch, setPressSearch] = useState(false);
  const [searchHistory, setSearchHistory] = useState(false);
  const [pressSearchLoading, setPressSearchLoading] = useState(false);
  const [pressSearchHistory, setPressSearchHistory] = useState(false);
  const [bookArray, setBookArray] = useState([]);
  const [historyArray, setHistoryArray] = useState([]);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    if (!isAuth) {
      let reply = verify(props.response);
      reply.then(setIsAuth(true)).catch((err) => {
        console.error(err);
        props.handler();
        setIsAuth(false);
      });
    }
    if (rerender) {
      setSearchHistory(true);
      let reply = history(props.response.googleId);
      setRerender(false);
      reply
        .then(function (res) {
          setHistoryArray(res.data);
          console.log(res.data);
          console.log("Rerender");
          
        })
        .catch((err) => {
          // Handle Error Here
          console.error(err);
        });
    }
  });

  const keywordInputHandler = (e) => {
    setKeyWord(e.target.value);
  };

  const searchButtonHandler = (e) => {
    console.log(keyword);
    setPressSearch(true);
    setPressSearchLoading(true);
    setSearchHistory(false);
    let reply = search(keyword);
    reply
      .then(function (res) {
        setBookArray(res.data);
        setPressSearchLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        // Handle Error Here
        console.error(err);
      });
  };

  const historyButtonHandler = (e) => {
    console.log(props.response.googleId);
    setSearchHistory(true);
    setPressSearchHistory(true);
    let reply = history(props.response.googleId);
    reply
      .then(function (res) {
        setHistoryArray(res.data);
        setPressSearchHistory(false);
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
              <GitHubForkRibbon href="https://github.com/tanyongzhi/hackthis"
              target="_blank"
              position="right">
              Fork me on GitHub
            </GitHubForkRibbon>
            <div>
              <Header as="h1" textAlign="center">
                Textbook Search
              </Header>
              <Header as="h1" textAlign="center">
                Welcome,
                {" " + props.response.Ot.sW}
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
                <Button onClick={searchButtonHandler}>Search</Button>
                <Button onClick={historyButtonHandler}>Saved Books</Button>
              </div>
            </div>
          </Container>
        );
      } else {
        if (pressSearchLoading) {
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
                  <Button
                    color="green"
                    onClick={searchButtonHandler}
                    loading={true}
                  >
                    Search
                  </Button>
                  <Button onClick={historyButtonHandler}>Saved Books</Button>
                </div>
                <Divider />
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
                  <Button color="green" onClick={searchButtonHandler}>
                    Search
                  </Button>
                  <Button onClick={historyButtonHandler}>Saved Books</Button>
                </div>
                <Divider />
                <SearchResults array={bookArray} id={props.response.googleId} />
              </div>
            </Container>
          );
        }
      }
    } else {
      if (pressSearchHistory) {
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
                <Button onClick={searchButtonHandler}>Search</Button>
                <Button
                  color="green"
                  onClick={historyButtonHandler}
                  loading={true}
                >
                  Saved Books
                </Button>
              </div>
              <Divider />
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
                <Button onClick={searchButtonHandler}>Search</Button>
                <Button color="green" onClick={historyButtonHandler}>
                  Saved Books
                </Button>
              </div>
              <Divider />
              <SearchHistory
                array={historyArray}
                id={props.response.googleId}
                setRerender = {setRerender}
                rerender = {rerender}
              />
            </div>
          </Container>
        );
      }
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
