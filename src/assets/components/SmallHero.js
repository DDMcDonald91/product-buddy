import React from 'react'
import { Container } from 'react-bootstrap'
import { motion } from 'framer-motion'

export default function SmallHero(props) {
  return (
    <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.25, delay: .1 }}
    >
        <Container fluid style={{height: '30rem'}}  className="p-0">
            <Container style={{backgroundImage: `url(${props.image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100%', width: '100%', borderRadius: '0.375rem', backgroundPosition: 'center'}}></Container>
        </Container>
    </motion.div>
  )
}
