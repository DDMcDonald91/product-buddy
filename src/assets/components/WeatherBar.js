import React, { useEffect, useState } from 'react'
import { Container, Spinner, Button, Card, ListGroup, Row, Col } from 'react-bootstrap'
import axios from "axios";


export default function WeatherBar() {
    // Weather API Data
    const [weather, setWeather] = useState(null)
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(null)
    const [lat, setLat] = useState()
    const [long, setLong] = useState()

    useEffect(() => {
      setLoading(true);
  
      // Try to get user location via browser geolocation
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setLat(position.coords.latitude.toString());
          setLong(position.coords.longitude.toString());
        },
        function (error) {
          // Fallback to IP geolocation if user denies browser geolocation
          axios
            .get('https://ipapi.co/json/')
            .then(function (response) {
              setLat(response.data.latitude.toString());
              setLong(response.data.longitude.toString());
            })
            .catch(function (error) {
              setErrorMessage('Location currently unavailable.');
              console.log(error)
            });
        }
      );
    }, []);
  
    useEffect(() => {
      if (lat && long) {
        try {
          weatherCheck();
        } catch (error) {
          setErrorMessage('Location currently unavailable.');
        }
      }
      setLoading(false);
    }, [lat, long]);
  

    const weatherCheck = async () => {
      const options = {
        method: 'GET',
        url: `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${lat}%2C${long}&days=3`,
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_WEATHER_API,
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      };

      axios.request(options).then(function (response) {
        console.log(response.data);
        setWeather(response.data)
      }).catch(function (error) {
        console.error(error);
      });
    }

    const noWeatherData = () => {
      return (
      <Container fluid className='p-1 mt-1 mb-5' style={{color: 'black', borderRadius: '.375rem', border: '1px solid black'  }}>
        <Card bg='light'>
          <Card.Header>Error</Card.Header>
          <Card.Body>
            <Card.Title>{errorMessage}</Card.Title>
            <Card.Text>
            Would you like to activate this widget?
            </Card.Text>
            <Button onClick={() => window.location.reload()}>Get Location</Button>
          </Card.Body>
        </Card>
      </Container>
      )
    }

    const loadingSpinner = () => {
      return(
      <Container>
        <Spinner animation='grow' />
      </Container>
      )
    }

    if(!weather && !loading) {
      return(
        noWeatherData()
      )
    }

    if(loading && !weather) {
      return(
        loadingSpinner()
      )
    }

    if(weather && !loading) {
      return(
        <Card className='bg-dark text-white' style={{color: 'black', borderRadius: '.375rem', border: '1px solid black', maxWidth: '20rem'}}>
          <Card.Header><h4>{weather.location.name}, {weather.location.region}</h4></Card.Header>
            <Card.Body>
              <Card.Title><h5>Current Forecast:</h5></Card.Title>
              <Card.Text className='body-font'>
                <p>It's {weather.current.condition.text} and the temperature is: {weather.current.temp_f} °F.</p>
              </Card.Text>
            </Card.Body>
          <ListGroup variant="flush">
            {weather.forecast.forecastday.map((item, index) => {
              // Convert date string to Date object
              const date = new Date(item.date);
              // Get month name from Date object
              const monthName = date.toLocaleString('default', { month: 'long' });
              // Format date string as "month/xx/xxxx"
              const formattedDate = `${monthName} ${date.getDate()}, ${date.getFullYear()}`;

              return(
                <ListGroup.Item key={index} className='body-font'>
                  <p>Date: {formattedDate}</p>
                  <p>Forecast: {item.day.condition.text}</p>
                  <Row>
                    <Col>Average: {item.day.avgtemp_f} °F.</Col>
                    <Col>Chance of Rain: {item.day.daily_chance_of_rain} %</Col>
                  </Row>
                </ListGroup.Item>
              )
            })}
          </ListGroup>
        </Card>
      )
    }
}