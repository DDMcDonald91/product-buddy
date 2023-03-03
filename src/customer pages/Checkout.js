import React, {useState, useEffect} from 'react'
import { Container, Card, Button, Form, Spinner } from 'react-bootstrap'
import { UserContextData } from '../context/UserContext';

export default function Checkout() {
    //API
    const API_URL = process.env.REACT_APP_API_URL

    const { docSnap } = UserContextData()
    const [stripeId, setStripeId] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // Set loading screen while function starts
        setLoading(true)

        const accountUpdate = async () => {
            //Finds user Stripe id from Firebase database 
            const stripe = await docSnap.customerData.id 
            setStripeId(stripe)
            console.log(stripeId, stripe)
        }

        // Set loading screen off
        setLoading(false)


        accountUpdate()
        
    }, [!docSnap, !stripeId])


  return (
    <Container align="center" className='page'>
        {!loading ?
        <>
            <Card style={{ width: '30rem' }}>
                <Card.Body>
                    <Card.Title>Premium Subscription</Card.Title>
                    <Card.Text>
                    Ready to get started with all of the benefits of the product buddy ai system? Get started now!
                    </Card.Text>
                    <Container>
                        <h2>$49.99/month</h2>
                        <h3>+ 3 Day FREE Trial</h3>
                    </Container>
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
