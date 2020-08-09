import React, { useState, useEffect } from 'react';
import { Header, Divider, Input, Button} from 'semantic-ui-react';
import SignIn from '../SignIn';

const BACKEND_URL = process.env.BACKEND_URL;
const axios = require('axios');
require('dotenv').config({path: '../../.env'});

async function verify(response) {
    return await axios.post('http://localhost:3000/auth/verify', {
        token: response.tokenId,
        id: response.googleId
    });
}

const SearchPage = (props) => {
    const [status, setStatus] = useState('COMPLETED');
    const [keyword, setKeyWord] = useState('');
    const [distanceRadios, setDistanceRadios] = useState('moreThanZero');
    const [durationRadios, setDurationRadios] = useState("moreThanZero");
    const [isAuth, setIsAuth] = useState(false);
    // const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            let reply = verify(props.response);
            reply.then(setIsAuth(true))
            .catch((err) => {
                console.error(err);
                props.handler();
                setIsAuth(false);
            });
        }
    });

    const keywordInputHandler = e => {
        setKeyWord(e.target.value);
    };

    const cancelCheckboxHandler = e => {
        if (status === "CANCELED")
            setStatus("COMPLETED");
        else
            setStatus("CANCELED");     
    }

    const distanceRadioGroupHandler = (e, value) => {
        setDistanceRadios( value.value);
    }

    const durationRadioGroupHandler = (e, value) => {
        setDurationRadios( value.value);
    }

    const searchButtonHandler = e => {
        e.preventDefault();
        // navigate(`/results/${keyword}/${status}/${distanceRadios}/${durationRadios}`);
    }

    if (!isAuth) {
        return(
            <SignIn/>
        )
    }
    else {
        return (
            <div>
                <Header as='h1' textAlign='center' >Textbook Search</Header>
                <Divider />
                <span>Keyword</span>
                <div style={styles.bottomMargin}>
                    <Input fluid style={styles.bottomMargin} value={keyword} onChange={keywordInputHandler}/>
                </div>
                <Divider />
                <div style={styles.textCenter}>
                    <Button primary onClick={searchButtonHandler}>Search</Button>
                </div>
            </div>
        );
    }
};

const styles = {
    bottomMargin:{
        marginBottom: "1em"
    },
    textCenter:{
        textAlign:'center'
    }
};

export default SearchPage;