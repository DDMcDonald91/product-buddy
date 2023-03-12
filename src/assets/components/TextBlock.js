import { motion } from 'framer-motion'
import { Container } from 'react-bootstrap'
import './components.css'

export default function TextBlock(props) {

  return (
    <Container fluid className='p-0'>
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: .1 }}
            >
                <h1 className={props.size} style={{color: props.headingColor}}>{props.heading}</h1>
                <h3 style={{color: props.subHeadingColor}}>{props.subHeading}</h3>
        </motion.div>
    </Container>
  )
}
