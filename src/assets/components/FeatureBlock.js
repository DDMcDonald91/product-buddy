import React, { useRef } from 'react'
import { FeaturesData } from './FeaturesData'
import { Container, Row, Col, Card } from 'react-bootstrap'
import image_1 from '../images/image_1.png'
import { motion, useInView } from 'framer-motion'

export default function FeatureBlock() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })  
    
  return (
    <motion.div
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: .5, delay: .25 }}
        whileInView={{ opacity: 1 }}
        >
        <Container>
            <Row ref={ref}>
                <Col xs={12} lg={6} className='p-1' style={{minHeight: '30rem'}}>
                    <Container style={{backgroundImage: `url(${image_1})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100%', width: '100%', borderRadius: '0.375rem'}}></Container>
                </Col>
                <Col xs={12} lg={6} className='p-1'>
                    <Row xs={1} md={2} className="g-2">
                    {FeaturesData.slice(4, 9).map((item, index) => (
                        <Col>
                        <motion.div
                            initial={{ opacity: 0, x: -300 }}
                            animate={
                            isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -300 }
                            }
                            transition={{ duration: 0.5, delay: index / 10 }}
                            >
                            <Card style={{minHeight: '15em'}} bg='dark' text='white' key={index}>
                                <Container className='d-flex align-items-center justify-content-center m-auto'>
                                <Card.Body>
                                <Card.Title>{item.feature}</Card.Title>
                                <Card.Text>{item.description}</Card.Text>
                                </Card.Body>
                                </Container>
                            </Card>
                        </motion.div>
                        </Col>
                    ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    </motion.div>
  )
}
