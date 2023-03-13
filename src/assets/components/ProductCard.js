import { Card } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

export default function ProductCard(props) {
  return (
    <Link to={props.link} style={{textDecoration: 'none'}}>
    <motion.div
      whileHover={{ scale: 1.1 }}
      transition={{duration: .25}}
      >
    <Card style={{ maxWidth: '20rem', minHeight: '15rem' }} bg='dark' text='white'>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text className='body-font'>{props.description}</Card.Text>
      </Card.Body>
    </Card>
    </motion.div>
    </Link>
  )
}
