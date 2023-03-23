import React, {useState, useEffect} from 'react'
import { Container, Card, Button, Form, Spinner, ListGroup } from 'react-bootstrap'
import { UserContextData } from '../context/UserContext';
import { motion } from 'framer-motion';

export default function Checkout() {
    //API
    const API_URL = process.env.REACT_APP_API_URL

    const { currentUser, docSnap, stripeID } = UserContextData()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!docSnap) {
          console.log('Stripe ID not present...');
        } else {
          accountUpdate();
        }
      }, [docSnap, currentUser, stripeID]);
      

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
        {loading ? (
          <Spinner align='center' animation="grow" />
        ) : (
          <>
            <Card className='w-100' style={{ border: 'none' }}>
              <Card.Body>
                <Card.Title>
                  <h3>Basic Membership Subscription</h3>
                </Card.Title>
                <Card.Text className="body-text">
                  Ready to get started with all of the benefits of the Kenzo AI system?
                  <br />
                  Get started now!
                </Card.Text>
                <Container>
                  <h2>$19.99/month</h2>
                  <h1>+ 3 Day FREE Trial</h1>
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
                  <Form.Control type="hidden" name="lookup_key" value="price_1MocmABqf38RkQF6t0gn92ff" />
                  <Form.Control type="hidden" name="stripeID" value={stripeID} />
                  <Button className="mt-5 w-100" variant="primary" id="checkout-and-portal-button" type="submit">
                    Purchase Now
                  </Button>
                </Form>
                <Card.Text>Don't like Kenzo AI? You can cancel at anytime!</Card.Text>
              </Card.Body>
            </Card>
          </>
        )}
        </motion.div>
    </Container>
  )
}
