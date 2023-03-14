import React, {useState} from 'react'
import { Container, Form, Spinner, Button } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { UserContextData } from '../context/UserContext';
import { Link } from 'react-router-dom';


export default function PasswordUpdate() {
    const { updateUserPassword } = UserContextData()

    const [newPassword, setNewPassword] = useState(null)
    const [confirmNewPassword, setConfirmedNewPassword] = useState(null)
    const [errorMessage, setErrorMessage] = useState()
    const [loading, setLoading] = useState(false)

    const tryPasswordUpdate = async (e) => {
        e.preventDefault()
        setLoading(true)

        if(newPassword !== confirmNewPassword){
            alert("Please make sure your passwords match")
            setLoading(false)
            return
        }

        try {
            await updateUserPassword(confirmNewPassword)
        } catch (error) {
            setErrorMessage("Error updating password. Refresh the page and try again.")
            console.log(error)
            setLoading(false)
            return
        }

        setLoading(false)
    }

    return (
    <Container className='mt-5 page'>
        <motion.div
          initial={{opacity: 0, x: -100}}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: .2 }}
          >
            <Container style={{maxWidth: '30rem'}} >
                <Container align='center'>
                    <h1>Password Update</h1>
                    <p className='body-font'>Use the form below to update your password.</p>
                </Container>
                <Form className='w-100 p-2' onSubmit={tryPasswordUpdate}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control required type="password" placeholder="Enter your new password." onChange={e => {setNewPassword(e.target.value)}} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control required type="password" placeholder="Confirm your new password" onChange={e => {setConfirmedNewPassword(e.target.value)}} />
                    </Form.Group>

                    {!loading ? 
                    <>
                    <Button className='w-100 mt-5' variant="primary" type="submit">
                        Submit
                    </Button>
                    <Link to='/profile' style={{textDecoration: 'none'}}>
                        <Button className='w-100 mt-2' variant="light">
                            Cancel
                        </Button>
                    </Link>
                    </> 
                    : 
                    <>
                    <Spinner animation="grow" />
                    </>}
                </Form>
                <br />
                {errorMessage ? <p>{errorMessage}</p> : <></>}
            </Container>
        </motion.div>
    </Container>
  )
}
