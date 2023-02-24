import React, { useEffect, useState } from "react";

// ICONS
import * as FaIcons from "react-icons/fa"; //Now i get access to all the icons
import * as AiIcons from "react-icons/ai";

import { IconContext } from "react-icons";

// ROUTING
import { Link, useNavigate } from "react-router-dom";

// DATA FILE
import { SidebarData } from "./SlidebarData";

// BOOTSTRAP
import { Button, Container } from "react-bootstrap";

// STYLES
import './Navigation.css'

// Context
import { UserContextData } from "../context/UserContext";

export default function Navigation() {
    const {currentUser, logout, accountStatus, docSnap, retrieveAccountDetails} = UserContextData()

    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    const [showUserNav, setShowUserNav] = useState(false)
    const navigate = useNavigate()

   useEffect(() => {
    if(docSnap) {
        retrieveAccountDetails()
    }}, [currentUser, docSnap])

    useEffect(() => {
      if(accountStatus == "active"){ 
        setShowUserNav(true)
      }
      if(accountStatus == "trialing"){
        setShowUserNav(true)
      }
    }, [accountStatus])

    const tryLogout = () => {
      if(currentUser){
        try {
          logout()
          navigate('/')
        } catch (error) {
          console.log('Logout error:', error)
        }
      }
    }

  return (
    <>
      <IconContext.Provider value={{ color: "#FFF" }}>
        {/* All the icons now are white */}
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
        <Container>
          {showUserNav ?
          <>
          <div style={{display: 'flex', marginLeft: '2rem'}}>
            <h4 style={{color: 'black'}}>Find your usecase:</h4>
          </div>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
              );
            })}
          </>
          :
          <>
          </>
          }
          </Container>
            {!currentUser ?
            <>
            {SidebarData.slice(0, 1).map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
              );
            })}
            <li>
              <Link to='/register' className='nav-text'>
                <Button className='mt-1 mb-1' variant="primary">Sign Up</Button>
              </Link>
            </li>
            <li>
              <Link to='/login' className='nav-text'>
                <Button className='mt-1 mb-1' variant="primary">Login</Button>
              </Link>
            </li>
            </>
            :
            <>
            {SidebarData.slice(0, 1).map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
              );
            })}
            <li>
              <Link to='/dashboard' className='nav-text'>
                <Button className='mt-1 mb-1' variant="primary">Dashboard</Button>
              </Link>
            </li>
            <li>
              <Link to='/profile' className='nav-text'>
                <Button className='mt-1 mb-1' variant="primary">Profile</Button>
              </Link>
            </li>
            <li>
              <div className="nav-text">
                <Button className='mt-1 mb-1' variant="primary" onClick={tryLogout}>Logout</Button>
              </div>
            </li>
            </>
            }
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
