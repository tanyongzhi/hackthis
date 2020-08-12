import React from "react";
import { Card, Rating, Grid } from "semantic-ui-react";

const HistoryResult = (props) => {
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

  const stringShortern = (stringIn) => {
    console.log(stringIn);
    if (stringIn == null) {
      return <span> Description: No Description </span>;
    } else {
      let newString = stringIn.toString();
      let length = 350;
      let trimmedString =
        newString.length > length
          ? newString.substring(0, length - 3) + "..."
          : newString.substring(0, length);
      return <span> Description: {trimmedString} </span>;
    }
  };
  return (
    <Card fluid>
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
        {authorArray(props.author)}
      </Card.Content>

      <Card.Content> {stringShortern(props.description)}</Card.Content>
      <Card.Content>
        <Grid divided="vertically">
          <Grid.Row columns={2}>
            <Grid.Column>
              {props.googlePrice == null
                ? "Price on Google: Not Available"
                : "Price on Google: $" + props.googlePrice}
            </Grid.Column>
            <Grid.Column>
              {props.googlePrice == null ? null : (
                <button
                  type="button"
                  class="ui right floated button"
                  onClick={(e) => {
                    e.preventDefault();
                    let newLink = props.googleLink;
                    window.open(newLink, "_blank");
                  }}
                >
                  {" "}
                  Buy on Google
                </button>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
      <Card.Content>
        <Grid divided="vertically">
          <Grid.Row columns={2}>
            <Grid.Column>
              {props.amazonPrice == null
                ? "Price on Amazon: Not Available"
                : "Price on Amazon: $" + props.amazonPrice}
            </Grid.Column>
            <Grid.Column>
              {props.amazonPrice == null ? null : (
                <button
                  type="button"
                  class="ui right floated button"
                  onClick={(e) => {
                    e.preventDefault();
                    let newLink = "http://" + props.amazonLink;
                    console.log(newLink);
                    window.open(newLink, "_blank");
                  }}
                >
                  {" "}
                  Buy on Amazon
                </button>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
    </Card>
  );
};

export default HistoryResult;
