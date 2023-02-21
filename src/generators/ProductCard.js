import { Card, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";

export default function ProductCard(props) {
  return (
    <Card style={{ maxWidth: '18rem', minHeight: '10rem' }} border={props.bg}>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
        <Link to={props.link}>
            <Button variant="primary">Use Tool</Button>
        </Link>
      </Card.Body>
    </Card>
  )
}
