import React, { useEffect, useState } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import ImageForm from '../form/ImageForm'
import { UserContextData } from '../context/UserContext';

export default function ImageGenerator() {
  const {currentUser, accountActive, loading} = UserContextData()
  const [error, setError] = useState()

  useEffect(() => {
      if(!currentUser || accountActive == false){
        setError("Access Denied.")
      }
  }, [accountActive])

  return (
    <Container align='center' className="page mt-5">
        {!loading && error ? <p>{error}</p> : <></>}
        {loading ? <Spinner animation='grow' /> : <></>}
        {currentUser && accountActive == true ? 
        <>
        <h1 align='center'>AI Art Generator</h1>
        <h3 align='center'>Use the form below to create a unique image.</h3>
        <br />
        <ImageForm />
        </>
        :
        <>
        </>
        }
    </Container>
  )
}
