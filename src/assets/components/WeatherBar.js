import React, { useEffect, useState } from 'react'
import { Container, Spinner, Button, Card } from 'react-bootstrap'
import axios from "axios";


export default function WeatherBar() {
    // Weather API Data
    const [weather, setWeather] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
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
        url: `https://weatherapi-com.p.rapidapi.com/current.json?q=${lat}%2C${long}`,
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
            <Card.Title>Forecast Unavailable</Card.Title>
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
        <Container fluid className='p-1 mt-1 mb-5' style={{color: 'black', borderRadius: '.375rem', border: '1px solid black'  }}>
          <Card bg='light'>
          <Card.Header>{weather.location.name}, {weather.location.region}</Card.Header>
          <Card.Body>
            <Card.Title>Current Forecast:</Card.Title>
            <Card.Text>
            It's {weather.current.condition.text} and the temperature is: {weather.current.temp_f} °F.
            </Card.Text>
          </Card.Body>
        </Card>
        </Container>
      )
    }
}
