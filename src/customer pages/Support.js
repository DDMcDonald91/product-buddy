import React, {useState, useRef} from 'react'
import { Container, Form, Button, Spinner } from 'react-bootstrap'
import emailjs from '@emailjs/browser';

export default function Support() {    
    const form = useRef()

    const [loading, setLoading] = useState(false)

    const serviceKey = process.env.REACT_APP_EMAILJS_SERVICE_KEY
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY

    // Function for sending email form
    const sendEmail = (e) => {
        e.preventDefault();

        setLoading(true)
    
        emailjs.sendForm(serviceKey, 'template_i718coe', form.current, publicKey)
          .then((result) => {
              console.log(result.text);
              alert('Thank you for contacting us. We will be in touch soon!')
              return
          }, (error) => {
              console.log(error.text);
              alert('There seems to be an error. Please refresh the page and try again.')
              return
          });

        form.current.reset();
 
        setLoading(false)
      };

  return (
    <Container className='page mt-5'>
        <Container style={{maxWidth: '30rem'}}>
            <Container align='center'>
            <h1>Support</h1>
            <p>Need some help with your account? <br /> Maybe you've run into an error. <br /> Don't worry. <br /> We're here for you!</p>
            </Container>
            <Form className='w-100 p-2' onSubmit={sendEmail} ref={form}>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control required type="text" placeholder="Enter your name" name="user_name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control required type="email" placeholder="Enter email" name="user_email" />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control 
                        required 
                        type="text" 
                        as="textarea" 
                        placeholder="Enter your message here..." 
                        name="message"
                        style={{ height: '100px' }} 
                        />
                </Form.Group>

                {!loading ? 
                <>
                <Button className='w-100 mt-5' variant="primary" type="submit">
                    Submit
                </Button>
                </> 
                : 
                <>
                <Container align='center' fluid>
                    <Spinner />
                </Container>
                </>}
            </Form>
            </Container>
    </Container>
  )
}
