import React, { useState, useEffect } from "react";

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

// FIREBASE
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";

export default function Navigation() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [sessionId, setSessionID] = useState(null);
    const [docSnap, setDocSnap] = useState(null);


    const auth = getAuth()
    const navigate = useNavigate()

    useEffect(() => {
      const accountCheck = async () => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            // ...
            setLoggedIn(true)
            setCurrentUser(user)
            console.log("User is signed in:", user.email)
          } else{
              console.log("No user logged in")
          }
        });

        if(currentUser) {
          //const docRef = query(usersCollectionRef, where("email", "==", currentUser.email));
          const docRef = doc(db, 'users', currentUser.uid);
          setDocSnap(await getDoc(docRef));
         
             if (docSnap) {
             console.log("Document data:", docSnap);
             console.log(docSnap.data())
             setSessionID(await docSnap.data().sessionId)
             console.log(sessionId)
             return
             } else {
             // doc.data() will be undefined in this case
             console.log("No such document!");
             }
        }
      }
      accountCheck()
  }, [sessionId])

    const logout = () => {
      signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("User signed out")
        setLoggedIn(false)
        navigate('/')
      }).catch((error) => {
        // An error happened.
        console.log(error)
      });
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
        <div style={{display: 'flex', marginLeft: '2rem'}}>
            <h3 style={{color: 'white'}}>Find your usecase:</h3>
        </div>
        <Container>
          {sessionId == '' ?
          <>
          </>
          :
          <>
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
          }
          </Container>
            {loggedIn == false ?
            <>
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
                <Button className='mt-1 mb-1' variant="primary" onClick={logout}>Logout</Button>
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
