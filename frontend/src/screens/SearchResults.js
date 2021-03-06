import React from 'react';
import {Card} from 'semantic-ui-react';
import Result from '../components/Results';
import GitHubForkRibbon from 'react-github-fork-ribbon';

const SearchResults = props => {
    if (Array.isArray(props.array) && props.array.length) {
        return (
            <Card.Group>

            <GitHubForkRibbon href="https://github.com/tanyongzhi/hackthis"
            target="_blank"
            position="right">
            Fork me on GitHub
            </GitHubForkRibbon>

                {props.array.map((result)=>{
                    return(
                        <Result
                            jsonfile = {result}
                            title={result.title} 
                            rating = {result.rating}
                            author = {result.authors}
                            googlePrice = {result.googlePrice}
                            amazonPrice = {result.amazonPrice}
                            description = {result.description}
                            imageLink = {result.imageLink}
                            id = {props.id}
                            amazonLink = {result.amazonLink}
                            googleLink = {result.link}
                            eBayLink = {result.eBayLink}
                            eBayPrice = {result.eBayPrice}
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
