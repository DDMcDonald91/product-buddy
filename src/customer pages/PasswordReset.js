import React, {useState} from 'react'
import { Container, Form, Spinner, Button } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { UserContextData } from '../context/UserContext';

export default function PasswordReset() {
    const { resetUserPassword } = UserContextData()

    const [email, setEmail] = useState(null)
    const [errorMessage, setErrorMessage] = useState()
    const [loading, setLoading] = useState(false)

    const tryPasswordReset = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            await resetUserPassword(email)
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
                    <h1>Password Recovery</h1>
                    <p className='body-font'>Use the form below to reset your password.</p>
                </Container>
                <Form className='w-100 p-2' onSubmit={tryPasswordReset}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Account Email</Form.Label>
                    <Form.Control required type="email" placeholder="Enter your account email address." onChange={e => {setEmail(e.target.value)}} />
                    </Form.Group>

                    {!loading ? 
                    <>
                    <Button className='w-100 mt-5' variant="primary" type="submit">
                        Submit
                    </Button>
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
