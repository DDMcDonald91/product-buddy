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
    const [stripeId, setStripeId] = useState(null)

    const auth = getAuth();
    const usersCollectionRef = collection(db, "users")
    const [docSnap, setDocSnap] = useState(null)
    const [event, setEventSnap] = useState(null)



    //API
    const API_URL = process.env.REACT_APP_API_URL

    useEffect(() => {
        async function account(){
             // Checks for user 
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

        if(currentUser) {
         const docRef = doc(db, 'users', currentUser.uid);
         setDocSnap(await getDoc(docRef));
        
            if (docSnap) {
            console.log("Document data:", docSnap.data());
            setSessionID(docSnap.data().sessionId)
            setStripeId(docSnap.data().customerData.id)
            console.log(sessionID);
            return
            } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            }

        const eventRef = doc(db, 'event', stripeId);
        setEventSnap(await getDoc(eventRef))
      } else {
        console.log('No user data')
        return
      }

        if (eventSnap) {
            console.log(eventSnap)
        } else {
            console.log("Event not logged...")
        }
    }
    account()
    }, [!currentUser, !docSnap, !sessionID])

    useEffect(() => {

    }, [])
        
    if(!currentUser){
        return(
            <Container className='page'>
                <p>No User Logged In...</p>
            </Container>
        )
    }

  return (
    <Container className='page'>
        <h1>Profile</h1>
        {!sessionID ? 
        <>
        <Checkout />
        </>
        :
        <>
        <Form action={`${API_URL}/create-portal-session`} method="POST">
        <input type="hidden" id="session-id" name="session_id" value={sessionID}
        />
        <Button id="checkout-and-portal-button" type="submit">
          Manage your billing information
        </Button>
        </Form>
        </>
        }
    </Container>
  )
}
