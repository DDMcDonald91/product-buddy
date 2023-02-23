import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import axios from "axios";


export default function WeatherBar() {
    // Weather API Data
    const [weather, setWeather] = useState(null)
    const [currentLocation, setCurrentLocation] = useState(null)

    useEffect(() => {
        getLocation()
        const options = {
            method: 'GET',
            url: 'https://weatherapi-com.p.rapidapi.com/current.json',
            params: {q: [currentLocation.coords.latitude, currentLocation.coords.longitude]},
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
    }, [!currentLocation])

    const getLocation = () => {
        if (navigator.geolocation) {
         const location = navigator.geolocation.getCurrentPosition(showPosition);
         console.log(location)
        } else { 
          console.log("Geolocation isn't supported by this browser");
        }
      }
      
      const showPosition = (position) => {
        setCurrentLocation(position)
        console.log(position);
      }

  return (
    <Container>WeatherBar</Container>
  )
}
