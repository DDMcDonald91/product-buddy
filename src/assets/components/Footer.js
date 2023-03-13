import '../components/components.css'
import { Container, Nav } from 'react-bootstrap'

export default function Footer() {
  return (
    <Container fluid className='p-0 mt-5'>
        <Nav className="p-3 justify-content-center align-items-center" activeKey="/" style={{background: "black"}}>
            <Nav.Item>
                <Nav.Link href="/" className="footer-link">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/support" className="footer-link">Customer Support</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="contact" className="footer-link">Contact Us</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="register" className="footer-link">Sign Up</Nav.Link>
            </Nav.Item>
        </Nav>
    </Container>
  )
}
