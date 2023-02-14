import React from 'react'
import { Container } from 'react-bootstrap'
import ImageForm from '../form/ImageForm'

export default function ImageGenerator() {
  return (
    <Container className="page">
        <h1 align='center'>AI Art Generator</h1>
        <h3 align='center'>Use the form below to create a unique image.</h3>
        <br />
        <ImageForm />
    </Container>
  )
}
