import React from 'react'
import { Container } from 'react-bootstrap'
import YTScriptForm from '../form/YTScriptForm'

export default function YTScriptGenerator() {
  return (
    <Container className="page">
      <h1 align='center'>YouTube Script Outline Generator</h1>
      <h3 align='center'>Use the form below to create script outline for your YouTube video.</h3>
      <br />
      <YTScriptForm />
    </Container>
  )
}
