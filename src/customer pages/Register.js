import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore"; 
import { db } from "../Firebase";
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContextData } from "../context/UserContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const [errorMessage, setErrorMessage] = useState("")
    const [disable, setDisable] = useState(false)
    const [loading, setLoading] = useState(false)
    const auth = getAuth();
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL

    const { currentUser } = UserContextData()

    // Checks for user and redirects if user if present
    useEffect(() => {
        if(currentUser) {
            setDisable(true)
        }
        console.log(currentUser)
    }, [])

    // Register the user
    const register = async (e) => {
        e.preventDefault()

        setLoading(true)

        // Checks for password and email
        if(!email || !password) {
            setErrorMessage('Please enter in all of your information.')
            return
        }
        // Checks for matching passwords
        if(password !== confirmPassword) {
            setErrorMessage('Your passwords must match. Please make sure your password matches.')
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
                sessionId: "",
            });
            console.log("new user added", user.uid);
        
            await axios.post(`${API_URL}/create-customer`, {
                name: firstName + " " + lastName,
                customerEmail: email,
                user: user.uid,
            });
            setLoading(false)
            navigate('/profile');
        } catch (error) {
            console.error(error);
            setErrorMessage("There has been a error. Please try again");
            return
        }

        setLoading(false)
    }
    
    // Component to show if a user is logged in
    const Reminder = () => {
        return (
            <Container align='center'>
                <p>You are already logged in.</p>
                <Link to='/profile'>
                    <Button>
                        Profile
                    </Button>
                </Link>
            </Container>
        )
    }

  return (
    <Container className='mt-5'>
        <motion.div
          initial={{opacity: 0, x: -100}}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: .2 }}
        >
        {disable === false ? 
        <>
        <Container style={{maxWidth: '30rem'}}>
            <Container align='center'>
                <h1>Sign Up!</h1>
                <p>Fill out the form below create your account!</p>
            </Container>
            <Form onSubmit={register} className='w-100 p-2'>
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
                {errorMessage ? 
                <>
                    <p align='center' style={{color: 'red'}}>{errorMessage}</p>
                </> 
                : 
                <></>
                }
                {!loading ? 
                <>
                <Button className='w-100 mt-5' variant="primary" type="submit">
                    Submit
                </Button>
                </> 
                : 
                <>
                <Container align='center'>
                    <Spinner animation="grow" />
                </Container>
                </>}
            </Form>
        </Container>
        </>
        :
        <></>}
        {disable === true ? 
        <>
            <Reminder />
        </>
        :
        <></>}
        </motion.div>
    </Container>
  )
}
