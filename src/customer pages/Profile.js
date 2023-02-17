import React, { useEffect, useState } from 'react'
import { doc, getDoc, setDoc, collection, where, query } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../Firebase";
import { Container, Form, Button } from 'react-bootstrap';
import Checkout from './Checkout';
import axios from 'axios';

export default function Profile() {
    const [currentUser, setCurrentUser] = useState(null);
    const [sessionID, setSessionID] = useState(null)

    const auth = getAuth();
    const usersCollectionRef = collection(db, "users")
    const [docSnap, setDocSnap] = useState(null)

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
                // ...
                console.log('No user logged in currently.')
            }
            });

        if(currentUser) {
         //const docRef = query(usersCollectionRef, where("email", "==", currentUser.email));
         const docRef = doc(db, 'users', currentUser.uid);
         setDocSnap(await getDoc(docRef));
        
            if (docSnap) {
            console.log("Document data:", docSnap);
            console.log(docSnap.data())
            setSessionID(docSnap.data().sessionId)
            console.log(sessionID);
            return
            } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            }
      }
    }
    account()
    }, [!currentUser, !docSnap, !sessionID])

    // API Test 
    const test = async () => {
        const data = "something"
        try {
            const result = await axios.post(`${API_URL}/test`, {
                testEvent: data,
            });
            console.log(result.data);
            console.log(result);
        } catch (err) {
            console.log(err);
        }
    }
   /*
    useEffect(() => {
        async function check(){
             // Checks for user 
             try {
                const result = await axios.post('http://localhost:3001/webhook');
                console.log(result);
            } catch (err) {
                console.log(err);
            }
        }
    check()
    }, [!currentUser, !docSnap, !sessionID])
    */
        
    if(!currentUser){
        return(
            <Container>
                <p>Loading...</p>
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
        <Form action={`${API_URL}/create-portal-session`} method="POST" target="_blank">
        <input type="hidden" id="session-id" name="session_id" value={sessionID}
        />
        <Button id="checkout-and-portal-button" type="submit">
          Manage your billing information
        </Button>
        </Form>
        <Button onClick={test}>Test Button</Button>
        </>
        }
    </Container>
  )
}
