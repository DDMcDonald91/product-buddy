import { ProgressBar, Container } from "react-bootstrap"

export default function RequestStatus(props) {
  return (
    <Container>
        <ProgressBar animated now={props.progress} />
        <p>Loading...</p>
    </Container>
  )
}
