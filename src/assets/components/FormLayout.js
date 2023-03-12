import { Button, Container, Form, Row, Col, Card } from 'react-bootstrap'
import { useState } from 'react';
import RequestStatus from './forms/RequestStatus';
import '../components/components.css'

export default function FormLayout(props) {
    const [formData, setFormData] = useState({
      aiPrompt: '',
      title: '',
      tone: '',
    })
    const [tone, setTone] = useState('Friendly')
    const [error, setError] = useState(false);

    const handleChange = (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    };

    const passData = async (e) => {
      e.preventDefault()
         if(!formData){
          alert('Enter in all fields')
          return
        }
        props.onSubmit(formData);
      };

   // const { response, error, loading } = useChatGPT(aiPrompt, temperature);

  return (
    <Container className='d-flex align-items-center justify-content-center mb-5' fluid>
      <Row className='w-100'>
        <Col xs={12} md={4}>
          <Form className='w-100' onSubmit={passData}>
            {props.extraFormField ?
                <>
                <Form.Group style={{marginBottom: '1.5rem'}} controlId="formBasicText">
                    <Form.Label>
                    <h5>{props.extraFormLabel}</h5>
                    </Form.Label>
                    <br />
                    <Form.Control required type="text" placeholder={props.extraFormPlaceholder} name="title" value={formData.title} onChange={handleChange} />
                </Form.Group>
                </>
              :
              <></>
            }
              <Form.Group style={{marginBottom: '1.5rem'}} controlId="formBasicText">
                <Form.Label>
                  <h5>{props.formLabel}:</h5>
                </Form.Label>
                <br />
                <Form.Control required type="text" as="textarea" placeholder={props.formPlaceholder} style={{width: '100%', minHeight: '250px'}} name="aiPrompt" value={formData.aiPrompt} onChange={handleChange} />
              </Form.Group>

              <Form.Group style={{marginBottom: '1.5rem'}} controlId="formBasicText">
                <Form.Label>
                  <h5>Tone:</h5>
                </Form.Label>
                <br />
                <Form.Control type="text" placeholder="What kind of tone do you want to have?" name="tone" value={formData.tone} onChange={handleChange} />
              </Form.Group>
              {!props.requestLoading ? 
              <>
                <Button className='mt-2' type='submit'>Generate</Button>
              </>
              :
              <>
                <RequestStatus progress={props.requestProgress} />
              </>
              }
          </Form>
        </Col>
        <Col xs={12} md={8}>
          <Container className='w-100'>
          <Card className='w-100' style={{minHeight: '60vh'}}>
              <Card.Body>
            {!props.requestResponse ?
            <>
            </>
            :
            <>
            <div>
              {props.requestResponse.split("\n").map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
            </>
            }
            {props.requestError === false ? 
            <>
            </>
            :
            <>
            <Container align='center'>
              <p>There seems to be an error. Refresh the page and try again.</p>
            </Container>
            </>}
            </Card.Body>
            </Card>
          </Container>
        </Col>
        </Row>
      </Container>
  )
}
