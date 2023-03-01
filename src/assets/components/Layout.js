import React, {useState, useEffect} from 'react'
import { UserContextData } from '../../context/UserContext'
import { Container, Spinner } from 'react-bootstrap'

export default function Layout(props) {
    const {currentUser, accountActive, loading} = UserContextData()
    const [error, setError] = useState()
  
    useEffect(() => {
        if(!loading && !currentUser || accountActive == false){
          setError("Access Denied.")
        } else {
            setError()
        }
    }, [])
    

  return (
    <Container align='center' className="page mt-5">
        {loading ? <Spinner animation='grow' /> : <></>}
        {currentUser && accountActive == true ? 
        <>
        <h1 align='center'>{props.title}</h1>
        <h3 align='center'>{props.instructions}</h3>
        <br />
        {props.form}
        </>
        :
        <>
        {!loading && error ? <p>{error}</p> : <></>}
        </>
        }
    </Container>
  )
}
