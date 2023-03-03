import React, { useState, useEffect } from 'react'
import { UserContextData } from '../../context/UserContext'
import { Container, Card, Button, Form, ListGroup, Spinner } from 'react-bootstrap'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../Firebase';


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
    <Container align='center'>
        {!loading ?
        <>
            <Card style={{ width: '30rem' }}>
                <Card.Body>
                    <Card.Title>Renew Your Subscription</Card.Title>
                    <Card.Text>
                    Canceled your subscription? No problem, let's renew your plan!
                    </Card.Text>
                    <Container>
                        <h2>$49.99/month</h2>
                    </Container>
                    <Card.Header>Features:</Card.Header>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Unlimited Usage</ListGroup.Item>
                        <ListGroup.Item>Social Media Tools</ListGroup.Item>
                        <ListGroup.Item>Business Tools</ListGroup.Item>
                        <ListGroup.Item>Art Generation</ListGroup.Item>
                    </ListGroup>
                    <Form action={`${API_URL}/create-checkout-session`} method="POST">
                        <Form.Control type="hidden" name="lookup_key" value="premium" />
                        <Form.Control type="hidden" name="stripeId" value={stripeId} />
                        <Button variant="primary" id="checkout-and-portal-button" type="submit">Purchase Now</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
        :
        <>
            <Spinner animation='grow' />
        </>
        }
    </Container>
  )
}
