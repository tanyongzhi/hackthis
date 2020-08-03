import React from 'react';
import {
  Header,
  Divider,
  Input,
  Checkbox,
  Button,
  Grid,
  Form,
  Radio,
} from "semantic-ui-react";

const SearchPage = () => {
  return (
    <div>
      <Header as="h1" textAlign="center">
        TripSearch
      </Header>
      <Divider />
      <span>Keyword</span>
      <div style={styles.bottomMargin}>
        <Input fluid style={styles.bottomMargin} value="" />
        <Checkbox label="Include cancelled trips" value="" />
      </div>
      <Grid style={styles.bottomMargin}>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h4">Distance</Header>
            <Form>
              <Form.Field>
                <Radio label="Any" name="distanceGroup" value="moreThanZero" />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="Under 3 km"
                  name="distanceGroup"
                  value="lessthan3km"
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="3 to 8 km"
                  name="distanceGroup"
                  value="between3and8"
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="8 to 15 km"
                  name="distanceGroup"
                  value="between8and15"
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="More than 15 km"
                  name="distanceGroup"
                  value="morethan15"
                />
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column width={8}>
            <Header as="h4">Time</Header>
            <Form>
              <Form.Field>
                <Radio label="Any" name="timeGroup" value="moreThanZero" />
              </Form.Field>
              <Form.Field>
                <Radio label="Under 5 min" name="timeGroup" value="under5min" />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="5 to 10 min"
                  name="timeGroup"
                  value="between5and10"
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="10 to 15 min"
                  name="timeGroup"
                  value="between10and15"
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="More than 20 min"
                  name="timeGroup"
                  value="morethan20"
                />
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider />
      <div style={styles.textCenter}>
        <Button primary>Search</Button>
      </div>
    </div>
  );
};

const styles = {
  bottomMargin: {
    marginBottom: "1em",
  },
  textCenter: {
    textAlign: "center",
  },
};

export default SearchPage;
