import React from 'react'
import { Card } from 'react-bootstrap'

export default function FeatureCard(props) {
  return (
    <Card style={{background: 'none'}} border='white'>
        <Card.Body>
          {props.icon}
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.text}</Card.Text>
        </Card.Body>
  </Card>
  )
}
