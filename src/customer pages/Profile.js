import { UserContextData } from '../context/UserContext';
import { Container, Form, Button, Spinner, Card, ListGroup } from 'react-bootstrap';
import Checkout from './Checkout';
import Renew from '../assets/components/Renew';
import { motion } from 'framer-motion';

export default function Profile() {
    const {currentUser, docSnap, accountStatus, sessionID, accountActive, loading} = UserContextData()

    //API
    const API_URL = process.env.REACT_APP_API_URL
   
    if(loading) {
        return(
            <Container align="center" className='page mt-5'>
                <Spinner animation='grow' />
            </Container>
        )
    }

    if(!currentUser){
        return(
            <motion.div
            initial={{opacity: 0, x: -100}}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: .2 }}
            >
            <Container align='center' className='page mt-5'>
                <p>No User Logged In...</p>
            </Container>
            </motion.div>
        )
    }

    if(currentUser && !sessionID) {
        return(
            <motion.div
            initial={{opacity: 0, x: -100}}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: .2 }}
            >
            <Container align='center' className='page mt-5'>
                <h1>Profile</h1>
                <h2>Welcome</h2>
                <Checkout />
            </Container>
            </motion.div>
        )
    }

    if(currentUser && accountStatus === "canceled" && accountActive === false) {
        return(
            <motion.div
            initial={{opacity: 0, x: -100}}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: .2 }}
            >
            <Container align="center" className='page mt-5'>
                <h1>Profile</h1>
                <p align='center' style={{color: 'red'}}>Account is canceled.</p>
                <Renew />
            </Container>
            </motion.div>
        )
    }

    if(currentUser && accountStatus === "paused" && accountActive === false) {
        return(
            <motion.div
            initial={{opacity: 0, x: -100}}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: .2 }}
            >
            <Container align="center" className='mt-5'>
                <h1>Profile</h1>
                <Card style={{ maxWidth: '30rem' }}>
            <Card.Body>
                <Card.Title>Welcome back {docSnap.firstName}!</Card.Title>
                <p align='center' style={{color: 'red'}}>Account is paused. Manage your business information below.</p>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Account Status: {accountStatus}</ListGroup.Item>
                <ListGroup.Item>User Email: {docSnap.email}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Form action={`${API_URL}/create-portal-session`} method="POST">
                <input type="hidden" id="session-id" name="session_id" value={sessionID} />
                <Button id="checkout-and-portal-button" type="submit">
                    Manage your billing information
                </Button>
                </Form>
            </Card.Body>
            </Card>
            </Container>
            </motion.div>
        )
    }

  return (
    <Container align="center" className='mt-5'>
        <motion.div
          initial={{opacity: 0, x: -100}}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: .2 }}
        >
        <h1>Profile</h1>
        <Card style={{ maxWidth: '30rem' }}>
            <Card.Body>
                <Card.Title>Welcome back {docSnap.firstName}!</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Account Status: {accountStatus}</ListGroup.Item>
                <ListGroup.Item>User Email: {docSnap.email}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                {accountStatus === "vip" ? 
                <>
                    <p>You have a "VIP" account.</p>
                </> 
                :
                <> 
                <Form action={`${API_URL}/create-portal-session`} method="POST">
                <input type="hidden" id="session-id" name="session_id" value={sessionID} />
                <Button id="checkout-and-portal-button" type="submit">
                    Manage your billing information
                </Button>
                </Form>
                </>
                }
            </Card.Body>
            </Card>
        </motion.div>
    </Container>
  )
}
