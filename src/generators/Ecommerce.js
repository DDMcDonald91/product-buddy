import React from 'react'
import { Container } from 'react-bootstrap'
import AIForm from '../form/AIForm'

export default function Ecommerce() {
  return (
    <Container className="page">
        <h1 align='center'>Product Descriptions</h1>
        <h3 align='center'>Use the form below to have Keni generate a SEO friendly product description for your product.</h3>
        <br />
        <AIForm />
    </Container>
  )
}
