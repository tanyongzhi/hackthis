import React, {useState, useEffect} from 'react';
import {Card} from 'semantic-ui-react';
import Result from '../components/Results';

const SearchResults = props => {

    if (Array.isArray(props.array) && props.array.length) {
        return (
            <Card.Group>
                {props.array.map((result)=>{
                    return(
                        <Result
                            jsonfile = {result}
                            title={result.title} 
                            rating = {result.rating}
                            googlePrice = {result.googlePrice}
                            amazonPrice = {result.amazonPrice}
                            description = {result.description}
                            id = {props.id}
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
