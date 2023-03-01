import { Container, Form, Button, Spinner } from 'react-bootstrap';
import { useState, useEffect, useRef } from "react";
import { UserContextData } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const {currentUser, login} = UserContextData()

    const emailRef = useRef()
    const passwordRef = useRef()
    const [errorMessage, setErrorMessage] = useState()
    const [loading, setLoading] = useState(false)

    //const auth = getAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if(currentUser) {
            navigate('/profile')
        }
    }, [])

    const tryLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await login(emailRef.current.value, passwordRef.current.value)
            navigate('/dashboard')
        } catch (error) {
            setErrorMessage("Error logging in.")
            setLoading(false)
        }
        setLoading(false)
    }
/*
    const login = (e, email, password) => {
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
    */

  return (
    <Container className='mt-5 page'>
        <Container style={{maxWidth: '30rem'}} >
            <Container align='center'>
                <h1>Login</h1>
                <p>Login to access your account and dashboard.</p>
            </Container>
            <Form className='w-100 p-2' onSubmit={tryLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control required type="email" placeholder="Enter email" ref={emailRef} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" placeholder="Password" ref={passwordRef} />
                </Form.Group>

                {!loading ? 
                <>
                <Button className='w-100 mt-5' variant="primary" type="submit">
                    Submit
                </Button>
                </> 
                : 
                <>
                <Spinner />
                </>}
            </Form>
            <br />
            {errorMessage ? <p>{errorMessage}</p> : <></>}
        </Container>
    </Container>
  )
}
