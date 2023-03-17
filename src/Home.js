import { Button, Container, Col, Row } from 'react-bootstrap'
import { SocialData } from './assets/components/FeaturesData'
import image_4 from '../src/assets/images/image_4.png'
import image_5 from '../src/assets/images/image_5.png'

import * as AiIcons from "react-icons/ai";
import * as TiIcons from "react-icons/ti";

import { Link } from 'react-router-dom'
import FeatureCard from './assets/components/FeatureCard'
import Hero from './assets/components/Hero'
import TextBlock from './assets/components/TextBlock'
import FeatureBlock from './assets/components/FeatureBlock'
import ReverseFeatureBlock from './assets/components/ReverseFeatureBlock'
import { motion } from 'framer-motion'
import SmallHero from './assets/components/SmallHero'
import Divider from './assets/components/Divider';

export default function Home() {

  function scrollToSection() {
    const section = document.getElementById("about-container");
    section.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <Container align='center' fluid className="p-0">

      <Hero />

      <Container>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: .1 }}
          >
          <Link to='/register'>
            <Button size="lg">Try For Free</Button>
          </Link>
          <br />
            <Button className='mt-3' size="lg" onClick={scrollToSection}>Learn More</Button>
        </motion.div>
      </Container>

      <Divider spacingTop={"7rem"} spacingBottom={"7rem"} />

      <Container className='mt-5 mb-5' id="about-container">
        <TextBlock heading={"What is Kenzo?"} size={"small-heading"} headingColor={"black"} subHeading={"Kenzo is an artificial intelligence program created to help content creators quickly create new and unique ideas for their business."} subHeadingColor={"black"} />
      </Container>

      <Divider spacingTop={"7rem"} spacingBottom={"7rem"} />

      <Container className='mt-5 mb-5' style={{ overflowX: "hidden" }}>
        <FeatureBlock />
      </Container>

      <Divider spacingTop={"7rem"} spacingBottom={"7rem"} />

      <Container className='mt-5 mb-5'>
        <TextBlock heading={"Professional Content Everytime"} size={"small-heading"} headingColor={"black"} subHeading={"Content created using Kenzo will have a professional quality finish thanks to sophisticated artificial intelligence algorithms."} subHeadingColor={"black"} />
      </Container>

      <Divider spacingTop={"7rem"} spacingBottom={"7rem"} />

      <Container className='mt-5 mb-5'> 
        <SmallHero image={image_5} />
      </Container>
      
      <Divider spacingTop={"7rem"} spacingBottom={"7rem"} />

      <Container className='mt-5 mb-5'>
        <TextBlock heading={"Perfect For Any Platform"} size={"small-heading"} headingColor={"black"} subHeading={"Create faster social media captions, product descriptions, SEO keywords, and more!"} subHeadingColor={"black"} />
      </Container>

      <Divider spacingTop={"7rem"} spacingBottom={"7rem"} />

      <Container className='mt-5 mb-5' style={{ overflowX: "hidden" }}>
        <ReverseFeatureBlock />
      </Container>

      <Divider spacingTop={"7rem"} spacingBottom={"7rem"} />

      <Container className='mt-5 mb-5'>
        <TextBlock heading={"Versatile and Powerful"} size={"small-heading"} headingColor={"black"} subHeading={"Created to help content creators grow their brand in new and exciting ways."} subHeadingColor={"black"} />
      </Container>

      <Divider spacingTop={"7rem"} spacingBottom={"7rem"} />
      
      <Container className='mt-5 mb-5'>
        <Row xs={1} style={{maxWidth: '60rem'}} className="g-2">
          {SocialData.map((item, index) => (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: .1 }}
            >
            <Col key={index}>
              <FeatureCard title={item.title} text={item.text} />
            </Col>
            </motion.div>
          ))}
        </Row>
      </Container>

      <Divider spacingTop={"7rem"} spacingBottom={"7rem"} />

      <Container className='mt-5 mb-5'>
        <TextBlock heading={"Ready to get started with Kenzo?"} size={"small-heading"} headingColor={"black"} subHeading={"With Kenzo's powerful AI technology and intuitive user interface, you can generate high-quality, accurate descriptions in minutes."} subHeadingColor={"black"} />
      </Container>

      <Divider spacingTop={"7rem"} spacingBottom={"7rem"} />

      <Container className='mt-5 mb-5'>
        <SmallHero image={image_4} />
      </Container>

      <Container className='mb-5'>
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: .1 }}
            >
            <Link to='/register'>
              <Button size="lg">Get Started</Button>
            </Link>
          </motion.div>
        </Container>
    </Container>
  )
}
