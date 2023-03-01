import React from 'react'
import { Container, Nav } from 'react-bootstrap'

export default function Footer() {
  return (
    <Container style={{borderTop: '1px solid white'}} fluid className='p-0'>
        <Nav className="p-3 justify-content-center align-items-center" activeKey="/" style={{background: "black"}}>
            <Nav.Item>
                <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/support">Support</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2">Link</Nav.Link>
            </Nav.Item>
        </Nav>
    </Container>
  )
}
