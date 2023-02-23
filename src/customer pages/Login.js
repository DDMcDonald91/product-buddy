import { Container, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { UserContextData } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const {currentUser, login} = UserContextData()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState()
    const [loading, setLoading] = useState(false)

    //const auth = getAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if(currentUser) {
            navigate('/profile')
        }
    }, [])

    const tryLogin = async () => {
        if(!email || !password) {
            alert('Please enter in all of your information.')
            return
        }
        setLoading(true)
        try {
            await login(e, email, password)
        } catch (error) {
            setErrorMessage("Login error.")
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
    <Container className='page'>
        <Container style={{maxWidth: '50rem'}} className='justify-content-center align-content-center d-flex'>
            <Form onSubmit={tryLogin}>
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
            <br />
            {errorMessage ? <p>{errorMessage}</p> : <></>}
        </Container>
    </Container>
  )
}
