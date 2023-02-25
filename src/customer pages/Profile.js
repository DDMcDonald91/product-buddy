import React, { useEffect, useState } from 'react'
import { UserContextData } from '../context/UserContext';
import { Container, Form, Button } from 'react-bootstrap';
import Checkout from './Checkout';
import Renew from '../assets/components/Renew';

export default function Profile() {
    const {currentUser, docSnap, accountStatus, sessionID, retrieveAccountDetails} = UserContextData()
    const [activeAccount, setActiveAccount] = useState(false)


    //API
    const API_URL = process.env.REACT_APP_API_URL

    useEffect(() => {
        if(docSnap) {
            retrieveAccountDetails()
    }}, [currentUser, docSnap, accountStatus])

    useEffect(() => {
        if(accountStatus == "active"){ 
            setActiveAccount(true)
        }
        if(accountStatus == "trialing"){
            setActiveAccount(true)
        }
        if(accountStatus == "paused"){
            setActiveAccount(true)
        }
      }, [!accountStatus])
   
    if(!currentUser){
        return(
            <Container className='page mt-5'>
                <p>No User Logged In...</p>
            </Container>
        )
    }

    if(currentUser && !sessionID) {
        return(
            <Container className='page mt-5'>
                <h1>Profile</h1>
                <Checkout />
            </Container>
        )
    }

    if(currentUser && !activeAccount) {
        return(
            <Container className='page mt-5'>
                <h1>Profile</h1>
                <Renew />
            </Container>
        )
    }


  return (
    <Container className='page mt-5'>
        <h1>Profile</h1>
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
    </Container>
  )
}
