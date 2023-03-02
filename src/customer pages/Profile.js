import { UserContextData } from '../context/UserContext';
import { Container, Form, Button, Spinner, Card, ListGroup } from 'react-bootstrap';
import Checkout from './Checkout';
import Renew from '../assets/components/Renew';

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
            <Container align='center' className='page mt-5'>
                <p>No User Logged In...</p>
            </Container>
        )
    }

    if(currentUser && !sessionID) {
        return(
            <Container align='center' className='page mt-5'>
                <h1>Profile</h1>
                <h2>Welcome back</h2>
                <Checkout />
            </Container>
        )
    }

    if(currentUser && accountStatus === "canceled" && accountActive === false) {
        return(
            <Container align="center" className='page mt-5'>
                <h1>Profile</h1>
                <p align='center' style={{color: 'red'}}>Account is canceled.</p>
                <Renew />
            </Container>
        )
    }

    if(currentUser && accountStatus === "paused" && accountActive === false) {
        return(
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
        )
    }

  return (
    <Container align="center" className='mt-5'>
        <h1>Profile</h1>
        <>
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
        </>
    </Container>
  )
}
