import React from 'react'
import { Container } from 'react-bootstrap'
import TitleForm from '../form/TitleForm.js'

export default function Ecommerce() {
  return (
    <Container className="page">
        <h1 align='center'>Generate a name for your product.</h1>
        <h3 align='center'>Use the form below to generate a creative name for your ecommerce product.</h3>
        <br />
        <TitleForm/>
    </Container>
  )
}
