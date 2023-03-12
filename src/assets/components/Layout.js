import React, {useState, useEffect} from 'react'
import { UserContextData } from '../../context/UserContext'
import { Container, Spinner } from 'react-bootstrap'
import { motion } from 'framer-motion'

export default function Layout(props) {
    const {currentUser, accountActive, loading} = UserContextData()
    const [error, setError] = useState()
  
    useEffect(() => {
        if(!loading && !currentUser && !accountActive){
          setError("Access Denied.")
        } else {
            setError()
        }
    }, [loading, currentUser, accountActive])

  return (
      <Container align='center' className="mt-5">
        <motion.div
          initial={{opacity: 0, x: -100}}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: .2 }}
          >
          {loading ? <Spinner animation='grow' /> : <></>}
          {!currentUser ? <p>No user logged in.</p> : <>
                  {accountActive ? <>
                    <h1 align='center'>{props.title}</h1>
                    <p align='center'>{props.instructions}</p>
                    <br />
                    {props.form}
                  </> : <></>}
                  {!loading && error ? <>{error}</> : <></>}
                </>}
        </motion.div>
      </Container>
  )
}
