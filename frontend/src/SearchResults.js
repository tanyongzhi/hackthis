import React from 'react';
import {Card, Image, Rating} from 'semantic-ui-react';


const SearchResults = () => {
    return(
        <Card href='#' fluid>
            <Card.Content>
            <Card.Description>
                <span>2019-08-16 10:50:32</span>
                <span style={styles.pullRight}>253 KES</span>
            </Card.Description>

            <Card.Description style={styles.pullRight}><Rating defaultRating={3} maxRating={5} disabled /></Card.Description> 

            <Card.Description>
                <p>
                    <Image src='/start-cicle.png' style={styles.iconWidth}/>
                    <span> St James, Nairobi</span>
                </p>
                <p>
                    <Image src='/end-circle.png' style={styles.iconWidth}/>
                    <span> Nextgen Mall, Nairobi</span>
                </p>
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Card.Header textAlign='right' style={styles.greenBlue}>COMPLETED</Card.Header> 
            </Card.Content>
        </Card>
    );
};

const styles = {
    pullRight:{
        float: 'right'
    },
    red:{
        color: '#f85959'
    },
    greenBlue:{
        color: '#278ea5'
    },
    iconWidth:{
        width: '1em'
    }
};

export default SearchResults;