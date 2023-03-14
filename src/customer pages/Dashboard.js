import { useEffect, useState } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { UserContextData } from '../context/UserContext';
import ProductCard from '../assets/components/ProductCard'
import { DashboardData } from '../assets/components/DashboardData';
import Inspiration from '../assets/components/Inspiration';
import WeatherBar from '../assets/components/WeatherBar';
import { motion } from 'framer-motion';

export default function Dashboard() {
    const {currentUser, accountActive, loading} = UserContextData()
    const [error, setError] = useState()
    const [showDashboard, setShowDashboard] = useState(false)

    useEffect(() => {
        if(!currentUser || accountActive === false){
          setError("Access Denied.")
        } else {
            setShowDashboard(true)
            setError()
        }
    }, [accountActive])


  return (
    <Container align='center' className='page'>
        {!loading && error && (!currentUser || !accountActive) ? <p>{error}</p> : <></>}
        {loading ? <Spinner animation='grow' className='mt-5'/> : <></>}
        {showDashboard && accountActive === true ?
        <>
            <motion.div
            initial={{opacity: 0, x: -100}}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: .2 }}
            >
            <Container className="page mt-5 mb-5">
                <Inspiration />
                <h1>What can Kenzo help you with today?</h1>
                <Row>
                    <Col xs={12} md={9}>
                        <Container className='mt-5'>
                            <Row xs={1} md={2} lg={3} className="g-2">
                                {DashboardData.map((item, index) => {
                                    return(
                                        <Col key={index}>
                                            <ProductCard title={item.title} description={item.description} link={item.link} bg={item.color} />
                                        </Col>
                                    )
                                })}
                            </Row>
                        </Container>
                    </Col>
                    <Col>
                        <Container className='mt-5'>
                            <WeatherBar />
                        </Container>
                    </Col>
                </Row>
            </Container>
            </motion.div>
        </>
        :
        <>
        </>
        }
    </Container>
  )
}
