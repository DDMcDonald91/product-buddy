import { useEffect, useState } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { UserContextData } from '../context/UserContext';
import ProductCard from '../generators/ProductCard'
import { useNavigate } from 'react-router-dom'; 
import { DashboardData } from '../assets/components/DashboardData';
import WeatherBar from '../assets/components/WeatherBar';

export default function Dashboard() {
    const {currentUser, accountActive} = UserContextData()
    const [showDashboard, setShowDashboard] = useState(false)

    const navigate = useNavigate()

    if(!currentUser){
        navigate('/login')
    }

   useEffect(() => {
    if(accountActive == true) {
        setShowDashboard(true)
    }}, [currentUser, accountActive])


    if(!currentUser) {
        return(
            <Container align='center' className='page'>
                <Spinner />
            </Container>
        )
    }

  return (
    <Container align='center' className='page'>
        {showDashboard ?
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
            <Container className='mt-5'>
                <p>Login or update your account for Dashboard access.</p>
            </Container>
        </>
        }
    </Container>
  )
}
