import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ProductCard from '../generators/ProductCard'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom'; 
import { DashboardData } from '../assets/components/DashboardData';
import {doc, getDoc } from "firebase/firestore"; 
import { db } from "../Firebase";
import WeatherBar from '../assets/components/WeatherBar';

export default function Dashboard() {
    const [currentUser, setCurrentUser] = useState(null)
    const auth = getAuth();
    const navigate = useNavigate()

    const [docSnap, setDocSnap] = useState(null)
    const [eventSnap, setEventSnap] = useState(null)
    const [accountStatus, setAccountStatus] = useState(null)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              // ...
              setCurrentUser(user)
              console.log("User is signed in:", user, uid);
            } else {
                navigate('/login')
            }
          });
          // Function to find user account
        const account = async () => {
            if(currentUser) {
                // Get events doc from Firebase database
                const docRef = await doc(db, 'users', currentUser.uid);
                const usersDoc = await getDoc(docRef);
                setDocSnap(usersDoc.data());
            } else {
                console.log('No user data')
            }
        }
        // Function to find user account status
        const status = async () => {
            if(docSnap) {
                // Get events doc from Firebase database
                console.log(docSnap.customerData.id)
                const docRef = await doc(db, 'events', docSnap.customerData.id);
                const eventsDoc = await getDoc(docRef);
                setEventSnap(eventsDoc.data());
                console.log(eventSnap);
                setAccountStatus(eventSnap.accountStatus)
            } else {
                console.log('No user data')
            }
        }
    account()
    status()
    }, [!currentUser, !docSnap, !eventSnap, !accountStatus])

    if(!currentUser) {
        return(
            <Container className='page'>
                Loading...
            </Container>
        )
    }

  return (
    <Container align='center' className='page'>
        {accountStatus != null || 'active' || 'trialing' ?
        <>
            <WeatherBar />
            <p>Welcome Back {currentUser.email}</p>
            <h1>What can Keni help you with today?</h1>
            <Container className='mt-5'>
                <Row>
                    {DashboardData.map((item, index) => {
                        return(
                            <Col xs={12} md={4} lg={3} className='p-1' key={index}>
                                <ProductCard title={item.title} description={item.description} link={item.link} bg={item.color} />
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </>
        :
        <>
            <Container>
                <p>You need to update your payment information.</p>
            </Container>
        </>
        }
    </Container>
  )
}
