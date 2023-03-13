import TextBlock from './TextBlock'
import { Container } from 'react-bootstrap'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: .1 }}
      >
      <Container fluid className='mb-5 p-0 d-flex align-items-center justify-content-center' style={{backgroundImage: 'url(https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2864&q=80)', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '50rem'}}>
        <TextBlock heading={"Meet Kenzo."} size={"big-heading"} headingColor={"white"} subHeading={"Creativity At Your Fingertips"} subHeadingColor={"white"} />
      </Container>
    </motion.div>
  )
}
