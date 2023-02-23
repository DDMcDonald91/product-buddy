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
        headers: {
          'X-RapidAPI-Key': '61254c1e4cmshcc74a38697e3b87p12bb76jsn4854c036d859',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      };
      
      fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${lat}%2C${long}`, options)
        .then(response => response.json())
        .then(response => {
          setWeather(response); 
          console.log(weather);
        })
        .catch(err => console.error(err));
    }

  return (
    <Container>
      {loading ? <><Spinner /></> : <>Weather Bar</>}
    </Container>
  )
}
