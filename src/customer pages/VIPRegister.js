import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore"; 
import { db } from "../Firebase";
import { Container, Form, Button, Spinner, Modal } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function VIPRegister() {
    // State for sign up form
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    // Loading state
    const [loading, setLoading] = useState(false)

    const auth = getAuth();
    const navigate = useNavigate();
    
    // Server API
    const API_URL = process.env.REACT_APP_API_URL

    // State for password check
    const [securityKey, setSecurityKey] = useState()
    const key = process.env.REACT_APP_SECURITY_KEY
    const [show, setShow] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        setShow(true)
    }, [])

    // Checks for password to access this page
    const passwordCheck = (e) => {
        e.preventDefault()
        if(securityKey === key){
            setShow(false)
        } else {
            setError("Wrong password")
            setTimeout(() => {
                setError()
            }, 1500)
        }
    }

    // Register the user
    const vipRegister = async (e) => {
        e.preventDefault()
        
        setLoading(true)

        // Checks for password and email
        if(!email || !password) {
            alert('Please enter in all of your information.')
            return
        }
        // Checks for matching passwords
        if(password !== confirmPassword) {
            alert('Your passwords must match. Please make sure your password matches.')
            return
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(db, 'users', user.uid), {
                firstName,
                lastName,
                email,
                accountID: user.uid,
                sessionId: "xxx",
            });
            console.log("new user added", user.uid);
        
            const response = await axios.post(`${API_URL}/create-vip-account`, {
                user: user.uid,
            });
            console.log(response.data);
        
            navigate('/profile');
        } catch (error) {
            console.error(error);
            alert("There has been a error");
            setLoading(false)
            return
        }

        setLoading(false)
    }

  return (
    <>
    <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        >
        <Modal.Header>
            <Modal.Title>Security Check</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Please enter the password below to access this page.
            <Form onSubmit={passwordCheck}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={e => setSecurityKey(e.target.value)} />
                    <Button className='w-100 mt-5' variant="primary" type="submit">Submit</Button>
                    {error ? <p align='center' className="mt-2" style={{color: 'red'}}>{error}</p> : <></>}
                </Form.Group>
            </Form>
        </Modal.Body>
    </Modal>

    <Container className='mt-5 page'>
        <Container style={{maxWidth: '30rem'}}>
            <Container align='center'>
                <h1>Sign Up!</h1>
                <p>Fill out the form below create your account!</p>
            </Container>
            <Form onSubmit={vipRegister} className='w-100 p-2'>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control required type="text" placeholder="Enter your first name" onChange={e => {setFirstName(e.target.value)}} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control required type="text" placeholder="Enter your last name" onChange={e => {setLastName(e.target.value)}} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control required type="email" placeholder="Enter email" onChange={e => {setEmail(e.target.value)}} />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" placeholder="Password" onChange={e => {setPassword(e.target.value); console.log(e.target.value)}} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm your password</Form.Label>
                    <Form.Control required type="password" placeholder="Confirm your password" onChange={e => {setConfirmPassword(e.target.value); console.log(e.target.value)}} />
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
        </Container>
    </Container>
    </>
  )
}
