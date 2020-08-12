import React, { useState } from "react";
import { Card, Rating, Grid } from "semantic-ui-react";

const axios = require("axios");
require("dotenv").config({ path: "../../.env" });

async function addBook(response, id) {
  return await axios.post("http://localhost:3000/books/insert", {
    id: id,
    toInsert: response,
  });
}

const Result = (props) => {
  const [isSaved, setIsSaved] = useState(false);
  const saveBookHandler = (e) => {
    let reply = addBook(props.jsonfile, props.id);
    reply.then(setIsSaved(true)).catch((err) => {
      console.error(err);
    });
  };
  const authorArray = (array) => {
    let authorString = "Author(s): ";
    var i;
    for (i = 0; i < array.length; i++) {
      authorString += array[i];
      if (i !== array.length - 1) {
        authorString += ", ";
      }
    }
    return <span> {authorString} </span>;
  };

  return (
    <Card fluid>
      <Card.Content>
        <Grid divided="vertically">
          <Grid.Row columns={2}>
            <Grid.Column width={13}>
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
              {authorArray(props.author)}
            </Grid.Column>
            <Grid.Column width={3}>
              {isSaved ? (
                <button class="ui right floated green button">Saved</button>
              ) : (
                <button
                  class="ui right floated button"
                  onClick={saveBookHandler}
                >
                  Save
                </button>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>

      <Card.Content>Description: {props.description}</Card.Content>
      <Card.Content extra>
        <Grid divided="vertically">
          <Grid.Row columns={2}>
            <Grid.Column>
            {props.googlePrice == null ? 
              "Price on Google: Not Available": 
              "Price on Google: $" + props.googlePrice
            }
            </Grid.Column>
            <Grid.Column>
              {props.googlePrice == null ? 
              null: 
              <button
                type="button"
                class="ui right floated button"
                onClick={(e) => {
                  e.preventDefault();
                  let newLink = props.googleLink;
                  window.open(newLink,'_blank');
                }}
              >
                {" "}
                Buy on Google
              </button>
              }
              
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
      <Card.Content extra>
        
        <Grid divided="vertically">
          <Grid.Row columns={2}>
            <Grid.Column>
            {props.amazonPrice == null ? 
              "Price on Amazon: Not Available":  
              "Price on Amazon: $" + props.amazonPrice
            }
              </Grid.Column>
            <Grid.Column>
            {props.amazonPrice == null ? 
              null: 
              <button
                type="button"
                class="ui right floated button"
                onClick={(e) => {
                  e.preventDefault();
                  let newLink = "http://" + props.amazonLink;
                  console.log(newLink)
                  window.open(newLink,'_blank');
                }}
              >
                {" "}
                Buy on Amazon
              </button>
              }
              
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </Card.Content>
    </Card>
  );
};

export default Result;
