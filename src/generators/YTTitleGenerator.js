import React from 'react'
import { Container } from 'react-bootstrap'
import YTTitleForm from '../form/YTTitleForm'

export default function YTTitleGenerator() {
  return (
    <Container className="page">
      <h1 align='center'>YouTube Title Generator</h1>
      <h3 align='center'>Use the form below to create a list of titles for your YouTube video.</h3>
      <br />
      <YTTitleForm />
    </Container>
  )
}
