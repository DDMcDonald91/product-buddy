import React, { useEffect, useState } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import axios from "axios";


export default function WeatherBar() {
    // Weather API Data
    const [weather, setWeather] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [loading, setLoading] = useState(null)
    const [lat, setLat] = useState()
    const [long, setLong] = useState()

    useEffect(() => {
        // find user location via latitude and longitude
        setLoading(true)
        navigator.geolocation.getCurrentPosition(function(position) {
          setLat(position.coords.latitude.toString());
          setLong(position.coords.longitude.toString());
        });
      
        console.log("Latitude is:", lat)
        console.log("Longitude is:", long)
        
        if(lat && long) {
          try {
            weatherCheck()
          } catch (error) {
            setErrorMessage('Location currently unavailable.')
          }
        }
        setLoading(false)
    }, [!lat, !long])

    const weatherCheck = async () => {
      const options = {
        method: 'GET',
        url: `https://weatherapi-com.p.rapidapi.com/current.json?q=${lat}%2C${long}`,
        headers: {
          'X-RapidAPI-Key': '61254c1e4cmshcc74a38697e3b87p12bb76jsn4854c036d859',
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

  return (
    <Container>
      {!weather ? 
      <><Spinner /></> 
      : 
      <>
      <Container fluid className='p-1 mt-3' style={{background: 'black', color: 'white', borderRadius: '.375rem', border: '1px solid white'}}>
        <p>Location: {weather.location.name}, {weather.location.region}</p>
        <p>It's {weather.current.condition.text} and the temperature is: {weather.current.temp_f}</p>
      </Container>
      </>}
    </Container>
  )
}
