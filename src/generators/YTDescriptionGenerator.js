import React from 'react'
import { Container } from 'react-bootstrap'
import YTDescriptionForm from '../form/YTDescriptionForm'
import { useNavigate } from 'react-router-dom';
import { UserContextData } from '../context/UserContext';

export default function YTDescriptionGenerator() {
  const navigate = useNavigate();
  const {currentUser, accountActive} = UserContextData()

  if(!currentUser || accountActive == false){
    navigate('/login')
  }

  return (
    <Container className="page">
      <h1 align='center'>YouTube Description Generator</h1>
      <h3 align='center'>Use the form below to a list of descriptions for your YouTube video.</h3>
      <br />
      <YTDescriptionForm />
    </Container>
  )
}