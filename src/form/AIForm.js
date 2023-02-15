import { Button, Container, Form, Row, Col } from 'react-bootstrap'
import { useState } from 'react';
import axios from 'axios';

export default function AIForm() {
    const [aiPrompt, setAIPrompt] = useState('');
    const [title, setTitle] = useState('');
    const [tone, setTone] = useState('Friendly');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const temp = 0

    //API
    const API_URL = process.env.REACT_APP_API_URL

      const fetchData = async (prompt, temperature, title, tone) => {
          setLoading(true);
          if(!aiPrompt && !title){
            alert('Enter in all fields')
            setLoading(false);
            return
          }
          try {
              const result = await axios.post(`${API_URL}/chat`, {
                  prompt: `Write a creative, SEO friendly product description for the product ${title} in a ${tone}. This is what the product does: ${prompt}. This is a Shopify product and I need an optimal description for that platform. Include a list of keywords I can use for SEO.`,
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

   // const { response, error, loading } = useChatGPT(aiPrompt, temperature);

  return (
    <Container className='d-flex align-items-center justify-content-center' fluid>
      <Row className='w-100'>
        <Col xs={12} md={4}>
          <Form className='w-100'>
              <Form.Group style={{marginBottom: '1.5rem'}} controlId="formBasicText">
                <Form.Label>
                  <h5>Product Name:</h5>
                </Form.Label>
                <br />
                <Form.Control required type="text" placeholder="Enter your product name here." onChange={e => {setTitle(e.target.value)}}/>
              </Form.Group>

              <Form.Group style={{marginBottom: '1.5rem'}} controlId="formBasicText">
                <Form.Label>
                  <h5>Product Description:</h5>
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

              <Button className='mt-2' onClick={() => fetchData(aiPrompt, temp, title, tone)}>Generate</Button>
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


/*
    const inputAICall = async () => {
      const configuration = new Configuration({
          organization: 'org-dFTf6HjiqjxMEYShjDvxkmnZ',
          apiKey: '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',
        });
      const openai = new OpenAIApi(configuration);
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Convert this text to a programmatic command:\n\n${inputAI}`,
        temperature: 0,
        max_tokens: 100,
        top_p: 1.0,
        frequency_penalty: 0.2,
        presence_penalty: 0.0,
        stop: ["\n"],
      });
      setResponseAI(response)
    }
*/