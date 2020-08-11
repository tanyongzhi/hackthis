import React, { useState } from "react";
import { Card, Rating, Image, button } from "semantic-ui-react";
import { useNavigate } from "@reach/router";

const axios = require("axios");
require("dotenv").config({ path: "../../.env" });

async function addBook(response, id) {
  return await axios.post("http://localhost:3000/books/insert", {
    params: {
      id: id,
      toInsert: response,
    },
  });
}

const Result = (props) => {

  const [isSaved, setIsSaved] = useState(false);
  const saveBookHandler = (e) => {
    console.log(props.jsonfile);
    let reply = addBook(props.jsonfile, props.id);
    reply.then(setIsSaved(true)).catch((err) => {
      console.error(err);
    });
  };

  return (
    <Card href="#" fluid>
      <Card.Content>
            <span>{props.title}</span>
            {props.rating ? (
              <Card.Description>
                <Rating
                  defaultRating={props.rating}
                  maxRating={5}
                  disabled
                  icon="star"
                />
              </Card.Description>
            ) : (
              ""
            )}
            {isSaved ? <button class="ui right floated green button">Saved</button> : <button class="ui right floated button" onClick={saveBookHandler}>Save</button>}
            
      </Card.Content>

      <Card.Content>Description: {props.description}</Card.Content>
      <Card.Content extra>Price on Google: ${props.googlePrice}</Card.Content>
      <Card.Content extra>Price on Amazon: ${props.amazonPrice}</Card.Content>
    </Card>
  );
};

const styles = {
  pullRight: {
    float: "right",
  },
  red: {
    color: "#f85959",
  },
  greenBlue: {
    color: "#278ea5",
  },
  iconWidth: {
    width: "1em",
  },
};

export default Result;
