import { useEffect, useState } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { UserContextData } from '../context/UserContext';
import ProductCard from '../generators/ProductCard'
import { useNavigate } from 'react-router-dom'; 
import { DashboardData } from '../assets/components/DashboardData';
import WeatherBar from '../assets/components/WeatherBar';

export default function Dashboard() {
    const {currentUser, accountActive, loading} = UserContextData()
    const [error, setError] = useState()
    const [showDashboard, setShowDashboard] = useState(false)

    useEffect(() => {
        if(!currentUser || accountActive == false){
          setError("Access Denied.")
        } else {
            setShowDashboard(true)
            setError()
        }
    }, [accountActive])


  return (
    <Container align='center' className='page'>
        {!loading && error ? <p>{error}</p> : <></>}
        {loading ? <Spinner animation='grow' /> : <></>}
        {showDashboard && accountActive == true ?
        <>
            <Container className="page mt-5">
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
            </Container>
        </>
        :
        <>
        </>
        }
    </Container>
  )
}
