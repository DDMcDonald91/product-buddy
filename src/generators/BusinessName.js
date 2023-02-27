import React from 'react'
import {Container} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import NameForm from '../form/NameForm'
import { UserContextData } from '../context/UserContext'

export default function BusinessName() {
  const navigate = useNavigate();
  const {currentUser, accountActive} = UserContextData()

  if(!currentUser || accountActive == false){
    navigate('/login')
  }

  return (
    <Container className="page">
        <h1 align='center'>Create a name for your business.</h1>
        <h3 align='center'>Use the form below to generate a creative name for your ecommerce business.</h3>
        <br />
        <NameForm />
    </Container>
  )
}
