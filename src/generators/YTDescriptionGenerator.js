import React from 'react'
import { Container } from 'react-bootstrap'
import YTDescriptionForm from '../form/YTDescriptionForm'

export default function YTDescriptionGenerator() {
  return (
    <Container className="page">
      <h1 align='center'>YouTube Description Generator</h1>
      <h3 align='center'>Use the form below to a list of descriptions for your YouTube video.</h3>
      <br />
      <YTDescriptionForm />
    </Container>
  )
}