import React, { useEffect, useState } from 'react'
import { doc, getDoc } from "firebase/firestore";
import { UserContextData } from '../context/UserContext';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../Firebase";
import { Container, Form, Button } from 'react-bootstrap';
import Checkout from './Checkout';

export default function Profile() {
    const {currentUser, docSnap, eventSnap, accountStatus, sessionID, retrieveAccountDetails} = UserContextData()
    //const [currentUser, setCurrentUser] = useState(null);
    //const [sessionID, setSessionID] = useState(null)

    const auth = getAuth();
    //const [docSnap, setDocSnap] = useState(null)
    //const [eventSnap, setEventSnap] = useState(null)
    //const [accountStatus, setAccountStatus] = useState(null)

    //API
    const API_URL = process.env.REACT_APP_API_URL

    useEffect(() => {
        if(docSnap) {
            retrieveAccountDetails()
    }}, [currentUser, docSnap])

        
    if(!currentUser){
        return(
            <Container className='page mt-5'>
                <p>No User Logged In...</p>
            </Container>
        )
    }

  return (
    <Container className='page mt-5'>
        <h1>Profile</h1>
        {!sessionID ? 
        <>
            <Checkout />
        </>
        :
        <>
        {accountStatus ? 
            <Container fluid align='center' style={{background: 'black', color: 'white'}}><h5>{accountStatus}</h5></Container>
            :
            <>
                <div></div>
            </>
        }
        <Container>
            <h2>Welcome back {docSnap.firstName}!</h2>
            <Form action={`${API_URL}/create-portal-session`} method="POST">
            <input type="hidden" id="session-id" name="session_id" value={sessionID}
            />
            <Button id="checkout-and-portal-button" type="submit">
            Manage your billing information
            </Button>
            </Form>
        </Container>
        </>
        }
    </Container>
  )
}
