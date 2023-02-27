import React from 'react'
import { Container } from 'react-bootstrap'
import TitleForm from '../form/TitleForm.js'
import { useNavigate } from 'react-router-dom';
import { UserContextData } from '../context/UserContext.js';

export default function Ecommerce() {
  const navigate = useNavigate();
  const {currentUser, accountActive} = UserContextData()

  if(!currentUser || accountActive == false){
    navigate('/login')
  }

  return (
    <Container className="page">
        <h1 align='center'>Generate a name for your product.</h1>
        <h3 align='center'>Use the form below to generate a creative name for your ecommerce product.</h3>
        <br />
        <TitleForm/>
    </Container>
  )
}
