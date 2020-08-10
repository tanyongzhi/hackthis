import React, {useState, useEffect} from 'react';
import {Card} from 'semantic-ui-react';
import Result from '../components/Results';

const SearchResults = props => {

    if (Array.isArray(props.array) && props.array.length) {
        return (
            <Card.Group>
                {console.log(props.array)}
                {props.array.map((trip)=>{
                    return(
                        <Result
                            title={trip.title} 
                            rating = {trip.rating}
                        />
                    ); 
                })}
            </Card.Group>
        );
    } else {
        return(
            <Card fluid>
                <Card.Content>
                    <Card.Header textAlign='center'>No results found</Card.Header>
                </Card.Content>
            </Card>
        );    
    }

    
};



export default SearchResults;
