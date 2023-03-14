import React, {useState, useEffect} from 'react'
import { Container, Card, Button, Form, Spinner, ListGroup } from 'react-bootstrap'
import { UserContextData } from '../context/UserContext';
import { motion } from 'framer-motion';

export default function Checkout() {
    //API
    const API_URL = process.env.REACT_APP_API_URL

    const { currentUser, docSnap } = UserContextData()
    const [stripeId, setStripeId] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!docSnap) {
          console.log('Stripe ID not present...');
        } else {
          accountUpdate();
        }
      }, [!docSnap, docSnap, currentUser]);
      

      const accountUpdate = async () => {
        if (!docSnap || !docSnap.customerData) {
          console.log('Stripe ID not present...');
          window.location.reload(false);
          return;
        }
      
        try {
          const { id } = docSnap.customerData;
          setStripeId(id);
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };
      

  return (
    <Container align="center" className='mt-5'>
        <motion.div
            initial={{opacity: 0, x: -100}}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: .2 }}
        >
        {loading ? (
          <Spinner align='center' animation="grow" />
        ) : (
          <>
            <Card style={{ width: '30rem', border: 'none' }}>
              <Card.Body>
                <Card.Title>
                  <h3>Premium Subscription</h3>
                </Card.Title>
                <Card.Text className="body-text">
                  Ready to get started with all of the benefits of the Kenzo AI system?
                  <br />
                  Get started now!
                </Card.Text>
                <Container>
                  <h2>$39.99/month</h2>
                  <h3>+ 3 Day FREE Trial</h3>
                </Container>
                <Card.Header>
                  <h6>Features:</h6>
                </Card.Header>
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
                  <Button className="mt-5 w-100" variant="primary" id="checkout-and-portal-button" type="submit">
                    Purchase Now
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </>
        )}
        </motion.div>
    </Container>
  )
}
