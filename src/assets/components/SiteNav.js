import React, { useEffect, useState } from "react";
import { UserContextData } from "../../context/UserContext";
import UserNav from "./UserNav";
import { Navbar, Container, Image } from "react-bootstrap";
import Kenzo from '../images/Kenzo.png'
import { motion } from "framer-motion";

export default function SiteNav() {
    const {currentUser, accountActive} = UserContextData()
    const [showUserNav, setShowUserNav] = useState(false)

    useEffect(() => {
        if(accountActive === true) {
          setShowUserNav(true)
        }
        if(accountActive === false) {
          setShowUserNav(false)
        }
      }, [currentUser, accountActive])

    return (
    <Navbar variant="dark" className='w-100 pt-3 pb-3' style={{position: 'relative', background: 'black'}}>
        <Container className="d-flex justify-content-between align-items-center w-auto" style={{zIndex: '1000', position: 'absolute'}}>
          <UserNav />
        </Container>
        <Container className='d-flex w-auto justify-content-center align-items-center flex-grow-1'>
        <motion.div
          initial={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: .1 }}
          animate={{ opacity: 1 }}
        >
          <Navbar.Brand href="/">
              <Image src={Kenzo} style={{height: '100px', width: '200px'}} />
          </Navbar.Brand>
        </motion.div>
        </Container>
    </Navbar>
  )
}
