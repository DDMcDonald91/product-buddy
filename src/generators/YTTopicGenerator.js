import React from 'react'
import { Container } from 'react-bootstrap'
import YTTopicForm from '../form/YTTopicForm'

export default function YTTopicGenerator() {
  return (
    <Container className="page">
      <h1 align='center'>YouTube Topic Generator</h1>
      <h3 align='center'>Use the form below to create a list of topics for your YouTube video.</h3>
      <br />
      <YTTopicForm />
    </Container>
  )
}
