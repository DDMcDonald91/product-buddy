import React from 'react'
import { Container, Card, Button, Form } from 'react-bootstrap'

export default function Checkout() {

  return (
    <Container className='page'>
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>Premium Subscription</Card.Title>
                <Card.Text>
                Ready to get started with all of the benefits of the product buddy ai system? Get started now!
                </Card.Text>
                <Form action="http://localhost:3001/create-checkout-session" method="POST">
                    <Form.Control type="hidden" name="lookup_key" value="premium" />
                    <Button variant="primary" id="checkout-and-portal-button" type="submit">Purchase Now</Button>
                </Form>
            </Card.Body>
        </Card>
    </Container>
  )
}
