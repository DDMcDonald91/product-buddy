import React, { useState, useEffect } from 'react'
import { UserContextData } from '../../context/UserContext'
import { Container, Card, Button, Form, ListGroup, Spinner } from 'react-bootstrap'
import { motion } from 'framer-motion'



export default function Renew() {
    // API
    const API_URL = process.env.REACT_APP_API_URL

    const { currentUser, docSnap, stripeID } = UserContextData(null)
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        if (!docSnap) {
          console.log('Stripe ID not present...');
        } else {
          accountUpdate();
        }
      }, [docSnap, stripeID, currentUser]);
      

      const accountUpdate = async () => {
        if (!stripeID || !docSnap.customerData.id) {
          console.log('Stripe ID not present...');
          window.location.reload(false);
          return;
        }
      
        try {
          console.log(docSnap.customerData.id, 'State value:', stripeID)
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };

  return (
    <Container align="center" className='mt-5' style={{ maxWidth: '30rem' }}>
        <motion.div
            initial={{opacity: 0, x: -100}}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: .2 }}
        >
        {!loading ?
        <>
            <Card className='w-100' style={{ border: 'none' }}>
                <Card.Body>
                    <Card.Title><h3>Renew Your Subscription</h3></Card.Title>
                    <Card.Text className='body-text'>
                    Canceled your subscription? 
                    <br />
                    No problem, let's renew your plan!
                    </Card.Text>
                    <Container>
                        <h2>$19.99/month</h2>
                    </Container>
                    <Card.Header><h6>Features:</h6></Card.Header>
                    <ListGroup className="list-group-flush body-text">
                        <ListGroup.Item>Unlimited Usage</ListGroup.Item>
                        <ListGroup.Item>Social Media Tools</ListGroup.Item>
                        <ListGroup.Item>Strategy Generation</ListGroup.Item>
                        <ListGroup.Item>Business Tools</ListGroup.Item>
                        <ListGroup.Item>Art Generation</ListGroup.Item>
                    </ListGroup>
                    <Form action={`${API_URL}/create-renewal-checkout-session`} method="POST">
                        <Form.Control type="hidden" name="lookup_key" value="price_1MocmABqf38RkQF6t0gn92ff" />
                        <Form.Control type="hidden" name="stripeID" value={stripeID} />
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
