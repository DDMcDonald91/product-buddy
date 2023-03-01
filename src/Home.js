import { Button, Container, Col, Row, Image, Card, CardGroup, Nav } from 'react-bootstrap'
import { FeaturesData } from './assets/components/FeaturesData'
import image_1 from '../src/assets/images/image_1.png'
import image_2 from '../src/assets/images/image_2.png'
import image_3 from '../src/assets/images/image_3.png'
import image_4 from '../src/assets/images/image_4.png'
import image_5 from '../src/assets/images/image_5.png'
import image_10 from '../src/assets/images/image_10.png'


import * as AiIcons from "react-icons/ai";
import * as TiIcons from "react-icons/ti";

import { Link } from 'react-router-dom'

export default function Home() {

  return (
    <Container align='center' fluid style={{maxWidth: '70rem'}}>

      <Container className='mt-5 mb-5'>
        <h1>Meet Keni.</h1>
        <h3>The #1 AI assistant for Content Creators and Entrepreneurs.</h3>
        <Container className='mt-5 mb-5 p-0' fluid style={{height: '500px'}}>
          <Container style={{backgroundImage: `url(${image_10})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100%', width: '100%', borderRadius: '0.375rem', backgroundPosition: 'center'}}></Container>
        </Container>
        <Link to='/register'>
          <Button>Get Started</Button>
        </Link>
        <br />
        <Link to='#about-container'>
          <Button className='mt-2'>Learn More</Button>
        </Link>
      </Container>

      <Container className='mt-5 mb-5' style={{maxWidth: '30rem'}}>
        <h1>How can Keni help you grow your business?</h1>
        <h3>Learn all the various ways the Keni AI tools can help streamline and increase your creative workflow.</h3>
      </Container>

      <Container className='mt-5 mb-5'>
      <h1>Leave the writing up to Keni.</h1>
        <h3>Keni is the AI Content Generator assistant created for content creators and entrepreneurs that helps scale business higher and faster. Break through creative blocks to create amazing, original content 10X faster.</h3>
        <Row className='mt-5 mb-5'>
          <Col xs={12} lg={6}>
            <Container style={{backgroundImage: `url(${image_1})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100%', width: '100%', borderRadius: '0.375rem'}}></Container>
          </Col>
          <Col xs={12} lg={6}>
            <Row xs={1} md={2} className="g-4">
            {FeaturesData.slice(4, 9).map((item, index) => (
                <Col>
                  <Card style={{minHeight: '14rem'}} bg='dark' text='white' key={index}>
                    <Card.Body>
                      <Card.Title>{item.feature}</Card.Title>
                      <Card.Text>{item.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>

      <Container id="about-container">
              
      </Container>

      <Container className='mt-5 mb-5'>
        <h1>Professional Content Everytime</h1>
        <h3>Content created using Keni will have a professional quality finish thanks to ChatGPT's sophisticated algorithms.</h3>
        <Container className='mt-5 mb-5 p-0' fluid style={{height: '500px'}}>
          <Container style={{backgroundImage: `url(${image_5})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100%', width: '100%', borderRadius: '0.375rem', backgroundPosition: 'center'}}></Container>
        </Container>
      </Container>

      <Container>
        <Row className='mt-5 mb-5'>
          <Col xs={12} lg={6}>
            <Row xs={1} md={2} className="g-4">
              {FeaturesData.slice(0, 4).map((item, index) => (
                <Col>
                  <Card style={{minHeight: '14rem'}} bg='dark' text='white' key={index}>
                    <Card.Body>
                      <Card.Title>{item.feature}</Card.Title>
                      <Card.Text>{item.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
          <Col xs={12} lg={6}>
            <Container style={{backgroundImage: `url(${image_3})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100%', width: '100%', borderRadius: '0.375rem', backgroundPosition: 'center'}}></Container>
          </Col>
        </Row>
      </Container>
      
      <Container className='mt-5 mb-5'>
        <h1>Perfect For Any Platform</h1>
        <h3>Create faster social media captions, product descriptions, SEO keywords, and more!</h3>
        <CardGroup className='mt-5' style={{borderRadius: '5px'}}>
          <Card style={{background: 'none'}}>
            <Card.Body>
              <AiIcons.AiOutlineYoutube style={{height: '50px', width: '50px'}} />
              <Card.Title>Youtube</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural lead-in
                to additional content. This content is a little bit longer.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{background: 'none'}}>
            <Card.Body>
              <TiIcons.TiSocialInstagram style={{height: '50px', width: '50px'}} />
              <Card.Title>Social Media</Card.Title>
              <Card.Text>
                This card has supporting text below as a natural lead-in to
                additional content.{' '}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{background: 'none'}}>
            <Card.Body>
              <AiIcons.AiOutlineShoppingCart style={{height: '50px', width: '50px'}} />
              <Card.Title>E-Commerce</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural lead-in
                to additional content. This card has even longer content than the
                first to show that equal height action.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{background: 'none'}}>
            <Card.Body>
              <AiIcons.AiOutlineRobot style={{height: '50px', width: '50px'}} />
              <Card.Title>AI Art</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural lead-in
                to additional content. This card has even longer content than the
                first to show that equal height action.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{background: 'none'}}>
            <Card.Body>
              <AiIcons.AiOutlineFormatPainter style={{height: '50px', width: '50px'}} />
              <Card.Title>Brand Assets</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural lead-in
                to additional content. This card has even longer content than the
                first to show that equal height action.
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
      </Container>

      <Container className='mt-5 mb-5'>
        <h1>Ready to get started with Keni?</h1>
        <h3>With Keni's powerful ChatGPT technology and intuitive user interface, you can generate high-quality, accurate descriptions in minutes</h3>
        <Container className='mt-5 mb-5 p-0' fluid style={{height: '500px'}}>
          <Container style={{backgroundImage: `url(${image_4})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100%', width: '100%', borderRadius: '0.375rem', backgroundPosition: 'center'}}></Container>
        </Container>
        <Link to='/register'>
          <Button>Get Started</Button>
        </Link>
      </Container>

    </Container>
  )
}
