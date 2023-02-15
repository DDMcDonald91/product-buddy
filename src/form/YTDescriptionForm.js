import { Button, Container, Form, Row, Col } from 'react-bootstrap'
import { useState } from 'react';
import axios from 'axios';

export default function YTDescriptionForm() {
    const [aiPrompt, setAIPrompt] = useState('');
    const [tone, setTone] = useState('Friendly');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const temp = 0

    //API
    const API_URL = process.env.REACT_APP_API_URL

    const fetchData = async (prompt, temperature, tone) => {
        setLoading(true);
        if(!aiPrompt){
          alert('Enter in all fields')
          setLoading(false);
          return
        }
        try {
            const result = await axios.post(`${API_URL}/chat`, {
                prompt: `Create a list of 3 unique, ${tone} descriptions for Youtube videos that rank well in search for the topic: "${prompt}". The description should aim to effectively communicate the value of the video to the target audience and optimize for search engines. It needs to be at least 3 sentences long.`,
                temperature: temperature,
            });
            setResponse(result.data)
            console.log(result);
            console.log(response)
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
                  <h5>Video Topic:</h5>
                </Form.Label>
                <br />
                <Form.Control required type="text" as="textarea" placeholder="Describe your product for me." style={{width: '100%', minHeight: '250px'}} onChange={e => {setAIPrompt(e.target.value)}}/>
              </Form.Group>

              <Form.Group style={{marginBottom: '1.5rem'}} controlId="formBasicText">
                <Form.Label>
                  <h5>Tone:</h5>
                </Form.Label>
                <br />
                <Form.Control required type="text" placeholder="What kind of tone do you want to have?" onChange={e => {setTone(e.target.value)}}/>
              </Form.Group>

              <Button className='mt-2' onClick={() => fetchData(aiPrompt, temp, tone)}>Generate</Button>
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
            <h3>Response:</h3>
            <div>
              {response.split("\n").map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
            </>
            }
          </Container>
        </Col>
        </Row>
      </Container>

  )
}
