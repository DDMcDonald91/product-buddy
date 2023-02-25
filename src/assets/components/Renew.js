import React, { useState, useEffect } from 'react'
import { UserContextData } from '../../context/UserContext'
import { Container, Card, Button, Form } from 'react-bootstrap'

export default function Renew() {
    // API
    const API_URL = process.env.REACT_APP_API_URL

    const {currentUser, docSnap, retrieveAccountDetails } = UserContextData()
    const [stripeId, setStripeId] = useState(null)
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        if(docSnap) {
            retrieveAccountDetails()
        }
        const accountCheck = async () => {
            // Set loading screen while function starts
            setLoading(true)
            //Finds user Stripe id from Firebase database  
            const docRef = await doc(db, 'users', currentUser.uid);
            setDocSnap(await getDoc(docRef));
            setStripeId(await docSnap.data().customerData.id)
            console.log(docSnap.data(), stripeId)
            // Turn off loading screen for user
            setLoading(false)
        }
        accountCheck()

    }, [currentUser, docSnap, !stripeId])

  return (
    <Container className='page'>
        {!loading ?
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Premium Subscription</Card.Title>
                    <Card.Text>
                    Ready to get started with all of the benefits of the product buddy ai system? Get started now!
                    </Card.Text>
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
            <p>Loading...please don't navigate away or reload the page...</p>
        </>
        }
    </Container>
  )
}
