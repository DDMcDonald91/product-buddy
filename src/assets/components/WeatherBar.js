import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import axios from "axios";


export default function WeatherBar() {
    // Weather API Data
    const [weather, setWeather] = useState(null)
    const [currentLocation, setCurrentLocation] = useState(null)
    const [lat, setLat] = useState()
    const [long, setLong] = useState()

    useEffect(() => {
        // find user location via latitude and longitude
        navigator.geolocation.getCurrentPosition(function(position) {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        });
      
        console.log("Latitude is:", lat)
        console.log("Longitude is:", long)

        const options = {
            method: 'GET',
            url: 'https://weatherapi-com.p.rapidapi.com/current.json',
            params: {q: lat,long},
            headers: {
              'X-RapidAPI-Key': '61254c1e4cmshcc74a38697e3b87p12bb76jsn4854c036d859',
              'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
              setWeather(response.data);
              console.log(weather);
          }).catch(function (error) {
              console.error(error);
          });
    }, [!lat, !long])

  return (
    <Container>WeatherBar</Container>
  )
}
