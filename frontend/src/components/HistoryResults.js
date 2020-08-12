import React from "react";
import { Card, Rating} from "semantic-ui-react";

const HistoryResult = (props) => {

  const authorArray = (array) => {
    let authorString = "Author(s): ";
    var i;
    for (i = 0; i < array.length; i++) {
      authorString += array[i];
      if (i != array.length - 1) {
        authorString += ", ";
      }
    }
    return <span> {authorString} </span>;
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
            {authorArray(props.author)} 
            
      </Card.Content>

      <Card.Content>Description: {props.description}</Card.Content>
      <Card.Content extra>Price on Google: ${props.googlePrice}</Card.Content>
      <Card.Content extra>Price on Amazon: ${props.amazonPrice}</Card.Content>
    </Card>
  );
};

const styles = {
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

export default HistoryResult;
