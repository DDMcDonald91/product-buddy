import { Button, Container, Form, Row, Col } from 'react-bootstrap'
import { useState } from 'react';
import axios from 'axios';

export default function AIForm() {
    const [aiPrompt, setAIPrompt] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const temp = 0

    //API
    const API_URL = process.env.REACT_APP_API_URL

      const fetchData = async (prompt, temperature) => {
        // Sets loading while function runs
          setLoading(true);
        // Checks for input from user
          if(!aiPrompt){
            alert('Enter in all fields')
            setLoading(false);
            return
          }
        // Post request to server for ChatGPT API
        // Also stores results in state variable 
          try {
              const result = await axios.post(`${API_URL}/chat`, {
                  prompt: `Give 3-5 creative ideas for a product name based on this description: ${prompt}`,
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
                  <h5>Product Description:</h5>
                </Form.Label>
                <br />
                <Form.Control required type="text" as="textarea" placeholder="Describe your product for me." style={{width: '100%', minHeight: '250px'}} onChange={e => {setAIPrompt(e.target.value)}}/>
              </Form.Group>

              <Button className='mt-2' onClick={() => fetchData(aiPrompt, temp)}>Generate</Button>
          </Form>
        </Col>
        <Col xs={12} md={8}>
          <Container className='w-100'>
            {!aiPrompt ?
            <>
            </>
            :
            <>
            <h3>Your Description:</h3>
            <p>{aiPrompt}</p>
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
            {!loading ?
            <>
            </>
            :
            <>
            <p>Loading...</p>
            </>
            }
          </Container>
        </Col>
        </Row>
      </Container>

  )
}
