import { Button, Container, Form, Row, Col, Card } from 'react-bootstrap'
import { useState } from 'react';
import RequestStatus from './forms/RequestStatus';
import '../components/components.css'

export default function FormLayout(props) {
    const [formData, setFormData] = useState({
      aiPrompt: '',
      title: '',
      tone: '',
      extraValue2: '',
      extraValue3: '',
      extraValueRadio: '',
    })
    const [tone, setTone] = useState('Friendly')

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
          <Form className='w-100' align="left" onSubmit={passData}>
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

              {props.extraFormField2 ?
                <>
                <Form.Group style={{marginBottom: '1.5rem'}} controlId="formBasicText">
                    <Form.Label>
                    <h5>{props.extraFormLabel2}</h5>
                    </Form.Label>
                    <br />
                    <Form.Control required type="text" placeholder={props.extraFormPlaceholder2} name="extraValue2" value={formData.extraValue2} onChange={handleChange} />
                </Form.Group>
                </>
              :
              <></>
              }

              {props.extraFormField3 ?
                <>
                <Form.Group style={{marginBottom: '1.5rem'}} controlId="formBasicText">
                    <Form.Label>
                    <h5>{props.extraFormLabel3}</h5>
                    </Form.Label>
                    <br />
                    <Form.Control required type="text" placeholder={props.extraFormPlaceholder3} name="extraValue3" value={formData.extraValue3} onChange={handleChange} />
                </Form.Group>
                </>
              :
              <></>
              }

              {props.extraFormFieldRadio ?
                <>
                <Form.Group style={{marginBottom: '1.5rem'}} controlId="formBasicText">
                    <Form.Label>
                    <h5>{props.extraFormLabelRadio}</h5>
                    </Form.Label>
                    <br />
                    {props.extraValueRadio.map((item) => {
                      return(
                      <Form.Check 
                      type='radio'
                      label={item}
                      name="extraValueRadio"
                      value={item}
                      checked={formData.extraValueRadio === item}
                      onChange={handleChange}
                      onClick={() => {console.log(item)}}
                      />
                      )
                      })}
                </Form.Group>
                </>
              :
              <></>
              }

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
