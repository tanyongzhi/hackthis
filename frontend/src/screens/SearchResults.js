import React, {useState, useEffect} from 'react';
import {Card} from 'semantic-ui-react';
import Result from '../components/Results';

const SearchResults = props => {

    if (Array.isArray(props) && filterdTrips.length) {
        return (
            <Card.Group>
                {console.log(filterdTrips)}
                {filterdTrips.map((trip)=>{
                    return(
                        <Results 
                            key={trip.id} 
                            id = {trip.id}
                            pickup={trip.pickup_location} 
                            dropoff={trip.dropoff_location}
                            dropdate = {trip.dropoff_date} 
                            status={trip.status} 
                            cost={trip.cost}
                            cost_unit = {trip.cost_unit}
                            pickup_date = {trip.pickup_date}
                            rating = {trip.driver_rating}
                            car_pic = {trip.car_pic}
                            distance = {trip.distance}
                            distance_unit = {trip.distance_unit}
                            duration = {trip.duration}
                            duration_unit = {trip.duration_unit}
                            car_model = {trip.car_model}
                            driver_name = {trip.driver_name}
                            driver_pic = {trip.driver_pic}
                            pickup_lat = {trip.pickup_lat}
                            pickup_lng = {trip.pickup_lng}
                            dropoff_lat = {trip.dropoff_lat}
                            dropoff_lng = {trip.dropoff_lng}
                        />
                    ); 
                })}
            </Card.Group>
        );
    } else{
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
