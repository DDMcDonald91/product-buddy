import { Card } from 'react-bootstrap'
import { Link } from "react-router-dom";

export default function ProductCard(props) {
  return (
    <Link to={props.link} style={{textDecoration: 'none'}}>
    <Card style={{ maxWidth: '20rem', minHeight: '15rem' }} bg='dark' text='white'>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
      </Card.Body>
    </Card>
    </Link>
  )
}
