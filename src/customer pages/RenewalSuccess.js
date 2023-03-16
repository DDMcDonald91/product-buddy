import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import { motion } from 'framer-motion'

export default function RenewalSuccess() {
    return (
        <Container align='center' className='mt-5'>
          <motion.div
            initial={{opacity: 0, x: -100}}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: .2 }}
            >
            <h2>Subscription Renewal Successful!</h2>
            <Link to='/profile'  style={{margin: '5px'}}>
              <Button>
                Profile
              </Button>
            </Link>
            <Link to='/dashboard' style={{margin: '5px'}}>
              <Button>
                Dashboard
              </Button>
            </Link>
            </motion.div>
        </Container>
    )
}
