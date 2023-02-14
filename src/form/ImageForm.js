import {useState} from 'react'
import axios from 'axios';
import {Container, Row, Col, Button, Form, Image} from 'react-bootstrap'

export default function ImageForm() {
    const [aiPrompt, setAIPrompt] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async (prompt) => {
        setLoading(true);

        if(!aiPrompt){
          alert('Enter in all fields')
          setLoading(false);
          return
        }

        try {
            const result = await axios.post('http://localhost:3001/image', {
                prompt: `${prompt}.`,
            });
            console.log(result.data);
            setResponse(result.data);
            console.log(result);
        } catch (err) {
            setError(err);
            console.log(error);
        }

        setLoading(false);
    };
  return (
    <Container className='d-flex align-items-center justify-content-center'>
      <Row className='w-100'>
        <Col xs={12} md={4}>
          <Form className='w-100'>
              <Form.Group style={{marginBottom: '1.5rem'}} controlId="formBasicText">
                <Form.Label>
                  <h5>Image Description:</h5>
                </Form.Label>
                <br />
                <Form.Control required type="text" as="textarea" placeholder="Describe your product for me." style={{width: '100%', minHeight: '250px'}} onChange={e => {setAIPrompt(e.target.value)}}/>
              </Form.Group>

              <Button className='mt-2' onClick={() => fetchData(aiPrompt)}>Generate</Button>
          </Form>
        </Col>
        <Col xs={12} md={8}>
          <Container className='w-100'>
          {!loading ?
            <>
            </>
            :
            <>
            <p>Loading...</p>
            </>
            }
            {!response ?
            <>
            </>
            :
            <>
            <h3 align='center'>Response:</h3>
            <Container align='center'>
              <Image src={response} className='img-fluid' />
            </Container>
            </>
            }
          </Container>
        </Col>
        </Row>
      </Container>

  )
}
