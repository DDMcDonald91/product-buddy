import { Container } from 'react-bootstrap'

export default function Divider(props) {
  return (
    <Container fluid className="p-0" style={{marginTop: `${props.spacingTop}`, marginBottom: `${props.spacingBottom}`}}></Container>
  )
}
