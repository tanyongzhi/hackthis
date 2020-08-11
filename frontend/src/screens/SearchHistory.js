import React, {useState, useEffect} from 'react';
import {Card} from 'semantic-ui-react';
import HistoryResult from '../components/HistoryResults';

const SearchHistory = props => {

    if (Array.isArray(props.array) && props.array.length) {
        return (
            <Card.Group>
                {console.log(props.array)}
                {props.array.map((result)=>{
                    return(
                        <HistoryResult
                            title={result.title} 
                            rating = {result.rating}
                            googlePrice = {result.googlePrice}
                            amazonPrice = {result.amazonPrice}
                            description = {result.description}
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

export default SearchHistory;
