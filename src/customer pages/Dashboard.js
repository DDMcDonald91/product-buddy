import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ProductCard from '../generators/ProductCard'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom'; 
import { DashboardData } from '../assets/components/DashboardData';

export default function Dashboard() {
    const [currentUser, setCurrentUser] = useState(null)
    const auth = getAuth();
    const navigate = useNavigate()

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
    }, [])

    if(!currentUser) {
        return(
            <Container>
                Loading...
            </Container>
        )
    }

  return (
    <Container align='center' className='page'>
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
    </Container>
  )
}
