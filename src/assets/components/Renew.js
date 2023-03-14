import React, { useState, useEffect } from 'react'
import { UserContextData } from '../../context/UserContext'
import { Container, Card, Button, Form, ListGroup, Spinner } from 'react-bootstrap'
import { motion } from 'framer-motion'



export default function Renew() {
    // API
    const API_URL = process.env.REACT_APP_API_URL

    const { currentUser, docSnap } = UserContextData(null)
    const [stripeId, setStripeId] = useState(null)
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        const accountCheck = async () => {
            // Set loading screen while function starts
            setLoading(true)

            if(currentUser){
                const id = await docSnap.customerData.id
                setStripeId(id)
            }

            // Turn off loading screen for user
            setLoading(false)
        }
        accountCheck()
        console.log(stripeId)

    }, [!stripeId, !docSnap])

  return (
    <Container align='center' className='mt-5'>
        <motion.div
            initial={{opacity: 0, x: -100}}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: .2 }}
        >
        {!loading ?
        <>
            <Card style={{ width: '30rem', border: 'none' }}>
                <Card.Body>
                    <Card.Title><h3>Renew Your Subscription</h3></Card.Title>
                    <Card.Text className='body-text'>
                    Canceled your subscription? 
                    <br />
                    No problem, let's renew your plan!
                    </Card.Text>
                    <Container>
                        <h2>$39.99/month</h2>
                    </Container>
                    <Card.Header><h6>Features:</h6></Card.Header>
                    <ListGroup className="list-group-flush body-text">
                        <ListGroup.Item>Unlimited Usage</ListGroup.Item>
                        <ListGroup.Item>Social Media Tools</ListGroup.Item>
                        <ListGroup.Item>Strategy Generation</ListGroup.Item>
                        <ListGroup.Item>Business Tools</ListGroup.Item>
                        <ListGroup.Item>Art Generation</ListGroup.Item>
                    </ListGroup>
                    <Form action={`${API_URL}/create-checkout-session`} method="POST">
                        <Form.Control type="hidden" name="lookup_key" value="premium" />
                        <Form.Control type="hidden" name="stripeId" value={stripeId} />
                        <Button className='mt-5 w-100' variant="primary" id="checkout-and-portal-button" type="submit">Purchase Now</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
        :
        <>
            <Spinner animation='grow' />
        </>
        }
        </motion.div>
    </Container>
  )
}
