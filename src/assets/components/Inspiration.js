import { Container, Spinner, Card } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import axios from 'axios'
import './components.css'

export default function Inspiration() {
    // Global state for the inspration component
    const [quote, setQuote] = useState()
    const [author, setAuthor] = useState()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    // API
    const api = "https://type.fit/api/quotes"


    // Function to retrieve quote
    const getQuote = async () => {
        try {
            await axios.get(api).then((data) => {
                console.log(data.data)
                const randomQuote = data.data[Math.floor(Math.random() * data.data.length)];
                setQuote(randomQuote.text)
                setAuthor(randomQuote.author)
            })
        } catch (error) {
            console.log(error)
            setError(true)
        }
    }

    useEffect(() => {
        setLoading(true)

        getQuote()

        setLoading(false)
    }, [])

    const Fallback = () => {
        return(
            <Card className="bg-dark text-white w-100 p-3 card-opacity">
                <Card.Text>
                    <h3>Errors are a part of the process. The worst error of all is giving up.</h3>
                </Card.Text>
            <Card.Title>D. McDonald</Card.Title>
            </Card>  
        )
    }

    if(loading) {
        return(
            <Spinner animation='grow' />
        )
    }

  return (
    <Container fluid align='center' className='p-0 mt-1 mb-5'>
        {error ? 
        <>
            <Fallback />
        </>
        :
        <>
        <Card className="text-black w-100 p-3 card-opacity" style={{backgroundColor: '#FF5733'}}>
            <Card.Text>
                <h2>{quote}</h2>
            </Card.Text>
            <Card.Title>{author}</Card.Title>
        </Card>
        </>
        }
    </Container>
  )
}
