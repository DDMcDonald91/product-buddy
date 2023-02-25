import React from 'react'
import { UserContextData } from '../../context/UserContext'
import { Container, Card, Button } from 'react-bootstrap'

export default function Renew() {
    const {currentUser, docSnap, } = UserContextData()
    
    useEffect(() => {
        const accountCheck = async () => {
            // Set loading screen while function starts
            setLoading(true)
            // Find user from Firebase
            onAuthStateChanged(auth, (user) => {
                if (user) {
                  // User is signed in, see docs for a list of available properties
                  // https://firebase.google.com/docs/reference/js/firebase.User
                  const uid = user.uid;
                  // ...
                  setCurrentUser(user)
                  console.log("User is signed in:", user, uid);
                } else {
                    console.log('No user signed in from checkout...')
                }
              });
            //Finds user Stripe id from Firebase database  
            const docRef = await doc(db, 'users', currentUser.uid);
            setDocSnap(await getDoc(docRef));
            setStripeId(docSnap.data().customerData.id)
            console.log(docSnap.data(), stripeId)
            // Turn off loading screen for user
            setLoading(false)
        }
        accountCheck()
        
    }, [!currentUser, !docSnap, !stripeId])

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
