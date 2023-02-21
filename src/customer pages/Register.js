import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, updateDoc, setDoc, doc } from "firebase/firestore"; 
import { db } from "../Firebase";
import { Container, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const [stripeUser, setStripeUser] = useState(null)
    const [user, setUser] = useState(null)
    const auth = getAuth();
    const usersCollectionRef = collection(db, "users")
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL


    // Register the user
    const register = async (e) => {
        e.preventDefault()
        // Checks for password and email
        if(!email || !password) {
            alert('Please enter in all of your information.')
            return
        }
        // Checks for matching passwords
        if(password != confirmPassword) {
            alert('Your passwords must match. Please make sure your password matches.')
            return
        }
        // Creates user profile
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            try {
                setDoc(doc(db, 'users', user.uid), {
                    firstName,
                    lastName,
                    email,
                    accountID: user.uid,
                    sessionId: "",
                  })
                console.log("new user added", user.uid);
                setStripeUser(user.uid)
                console.log(stripeUser)
                setUser(user)
              } catch (e) {
                console.error("Error adding document: ", e);
                alert("There has been a error")
                return
              }

              console.log('setting state outside try catch:', stripeUser)

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log(errorCode, errorMessage)
        });

         // Try creating account
         try {
            await axios.post(`${API_URL}/create-customer`, {
                name: firstName + " " + lastName,
                customerEmail: email,
                user: stripeUser,
            })
            console.log(stripeUser)
        } catch (error) {
            console.log('Registration failed:', error)
            return
        }
        // navigate('/profile')
    }

  return (
    <Container className='page'>
        <Container style={{maxWidth: '30rem'}} className='justify-content-center align-content-center d-flex'>
            <Form onSubmit={register} className='w-100'>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your first name" onChange={e => {setFirstName(e.target.value)}} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your last name" onChange={e => {setLastName(e.target.value)}} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={e => {setEmail(e.target.value)}} />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={e => {setPassword(e.target.value); console.log(e.target.value)}} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm your password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm your password" onChange={e => {setConfirmPassword(e.target.value); console.log(e.target.value)}} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    </Container>
  )
}
