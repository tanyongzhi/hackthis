import React, {useState, useEffect} from 'react';
import {Card} from 'semantic-ui-react';
import TripResult from '../components/Results';
import {TRIPSARRAY} from '../data/DummyData';

const distanceCompare = (item, distance) => {
    switch(item){
        case "moreThanZero":
            return distance >= 0;
        case "lessthan3km":
            return distance < 3;
        case "between3and8":
            return distance >= 3 && item < 8;
        case "between8and15":
            return distance >= 8 && item <= 15;
        case "morethan15":
            return distance > 15; 
        default:
            return distance >= 0;              
    }
};

const durationCompare = (item, duration) => {
    switch(item){
        case "moreThanZero":
            return duration >= 0;
        case "under5min":
            return duration < 5;
        case "between5and10":
            return duration >= 5 && item < 10;
        case "between10and15":
            return duration >= 10 && item <= 15;
        case "morethan20":
            return duration > 20;
        default:
            return duration >= 0;                
    }
};

const SearchResults = props => {
    const [filterdTrips, setFilterdTrips] = useState([]);
    
    async function prepareFilteredTrips(arrayToBeFiltered, wordparam, statusparam, distanceparam, durationparam){
        const filtered = await arrayToBeFiltered.filter((anObject) => {
            return (
                    distanceCompare(distanceparam, anObject.distance) && durationCompare(durationparam, anObject.duration) &&
                    (anObject.status.toLowerCase().indexOf(statusparam.toLowerCase()) > -1) &&
                    (anObject.pickup_location.toLowerCase().indexOf(wordparam.toLowerCase()) > -1 || 
                    anObject.dropoff_location.toLowerCase().indexOf(wordparam.toLowerCase()) > -1 ||
                    anObject.type.toLowerCase().indexOf(wordparam.toLowerCase()) > -1 ||
                    anObject.driver_name.toLowerCase().indexOf(wordparam.toLowerCase()) > -1 ||
                    anObject.car_make.toLowerCase().indexOf(wordparam.toLowerCase()) > -1 ||
                    anObject.car_model.toLowerCase().indexOf(wordparam.toLowerCase()) > -1 ||
                    anObject.car_number.toLowerCase().indexOf(wordparam.toLowerCase()) > -1)
                );
        });
        return filtered;
    }

    useEffect(()=>{
        prepareFilteredTrips(TRIPSARRAY, props.word, props.status, props.distance, props.duration).then((trip)=>{
            setFilterdTrips(trip);
        });

    }, [props.word, props.status, props.distance, props.duration]);

    

    if (Array.isArray(filterdTrips) && filterdTrips.length) {
        return (
            <Card.Group>
                {console.log(filterdTrips)}
                {filterdTrips.map((trip)=>{
                    return(
                        <TripResult 
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
    }else{
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
