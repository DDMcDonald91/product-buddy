import React from 'react'
import { Card } from 'react-bootstrap'
import { motion } from 'framer-motion'

export default function FeatureCard(props) {
  return (
    <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.25, delay: .1 }}
    >
      <Card bg='dark' text='white'>
          <Card.Body>
            {props.icon}
            <Card.Title><h3>{props.title}</h3></Card.Title>
            <Card.Text>{props.text}</Card.Text>
          </Card.Body>
      </Card>
      </motion.div>
  )
}
