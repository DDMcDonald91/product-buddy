import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ProductCard from '../generators/ProductCard'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom'; 

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
            <Row className='w-auto justify-content-center align-items-center w-100'>
                <Col className='w-auto justify-content-center align-items-center' xs={12} md={4}>
                    <ProductCard title='Product Description Generator' description='This is a tool used to create creative SEO friendly descriptions for your ecommerce products.' link='/ecommerce-generator' />
                </Col>
                <Col className='w-auto justify-content-center align-items-center'xs={12} md={4}>
                    <ProductCard title='Product Title Generator' description='Need a name for your products? Start here!' link='/title-generator' />
                </Col>
                <Col className='w-auto justify-content-center align-items-center'xs={12} md={4}>
                    <ProductCard title='Business Name Generator' description='Need a name for your new business? Start here!' link='/business-name-generator' />
                </Col>
            </Row>
        </Container>
    </Container>
  )
}
