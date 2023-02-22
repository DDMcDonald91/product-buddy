import React, { useEffect, useState } from 'react'
import { doc, getDoc, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../Firebase";
import { Container, Form, Button } from 'react-bootstrap';
import Checkout from './Checkout';
import axios from 'axios';

export default function Profile() {
    const [currentUser, setCurrentUser] = useState(null);
    const [sessionID, setSessionID] = useState(null)

    const auth = getAuth();
    const [docSnap, setDocSnap] = useState(null)
    const [eventSnap, setEventSnap] = useState(null)
    const [accountStatus, setAccountStatus] = useState(null)

    //API
    const API_URL = process.env.REACT_APP_API_URL

    useEffect(() => {
        // Checks for user from Firebase
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                // ...
                setCurrentUser(user)
                console.log(user, uid)
                console.log(currentUser.email)
            } else {
                // User is signed out
                console.log('Nobody signed in.')
                return
            }
            });
        // Function to find user account
        const account = async () => {
            if(currentUser) {
                // Get events doc from Firebase database
                console.log(currentUser)
                const docRef = await doc(db, 'users', currentUser.uid);
                const usersDoc = await getDoc(docRef);
                setDocSnap(usersDoc.data());
                console.log(docSnap);
                setSessionID(docSnap.sessionId)
            } else {
                console.log('No user data')
            }
        }
        // Function to find user account status
        const status = async () => {
            if(docSnap) {
                // Get events doc from Firebase database
                console.log(docSnap.customerData.id)
                const docRef = await doc(db, 'events', docSnap.customerData.id);
                const eventsDoc = await getDoc(docRef);
                setEventSnap(eventsDoc.data());
                console.log(eventSnap);
                setAccountStatus(eventSnap.accountStatus)
            } else {
                console.log('No user data')
            }
        }
    account()
    status()
    }, [!currentUser, !docSnap, !eventSnap])


        
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
        {!eventSnap.accountStatus ? 
            <>
                <Container fluid bg='warning'><p>{eventSnap.accountStatus}</p></Container>
            </>
            :
            <></>
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
