import { Container, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)

    const auth = getAuth();

    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            // ...
            setLoggedIn(true)
            console.log(user, uid)
            navigate("/profile");
        } else {
            // User is signed out
            // ...
            setLoggedIn(false)
            console.log('No user logged in currently.')
        }
        });
    }, [])

    const login = (e) => {
        e.preventDefault();

        if(loggedIn === true) {
            alert("You're already logged in.")
            return
         }

        if(!email || !password) {
            alert('Please enter in all of your information.')
            return
        }

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            navigate("/dashboard");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log(errorCode, errorMessage)
        });
    }

  return (
    <Container className='page'>
        <Container style={{maxWidth: '50rem'}} className='justify-content-center align-content-center d-flex'>
            <Form onSubmit={login}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={e => {setEmail(e.target.value)}} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={e => {setPassword(e.target.value)}} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    </Container>
  )
}
