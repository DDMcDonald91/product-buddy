import React from 'react'
import {Container} from 'react-bootstrap'
import NameForm from '../form/NameForm'

export default function BusinessName() {
  return (
    <Container className="page">
        <h1 align='center'>Create a name for your business.</h1>
        <h3 align='center'>Use the form below to generate a creative name for your ecommerce business.</h3>
        <br />
        <NameForm />
    </Container>
  )
}
