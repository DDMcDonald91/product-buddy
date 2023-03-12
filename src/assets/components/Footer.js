import React from 'react'
import { Container, Nav } from 'react-bootstrap'

export default function Footer() {
  return (
    <Container fluid className='p-0 mt-5'>
        <Nav className="p-3 justify-content-center align-items-center" activeKey="/" style={{background: "black"}}>
            <Nav.Item>
                <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/support">Customer Support</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="contact">Contact Us</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="register">Sign Up</Nav.Link>
            </Nav.Item>
        </Nav>
    </Container>
  )
}
