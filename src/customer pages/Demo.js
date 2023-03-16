import React from 'react'
import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Demo() {
  return (
    <Container className='mt-5' align='center'>
        <h1>Demo Coming Soon!</h1>
        <p>Stay tuned or sign up now!</p>
        <br />
        <Link to='/register'>
            <Button variant='primary'>Try For Free</Button>
        </Link>
    </Container>
  )
}
