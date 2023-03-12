import React, {useState, useEffect} from 'react'
import { Container, Spinner, Button } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { UserContextData } from '../../context/UserContext';
import { SidebarData } from './SlidebarData';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai'
import { ImMenu } from 'react-icons/im'
import './components.css'

export default function UserNav() {
    const { currentUser, accountActive, logout } = UserContextData()
    
    const [loading, setLoading] = useState(false)
    const [isAvailable, setIsAvailable] = useState(false)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate()

    // Checks for user and active account status
    useEffect(() => {
        setLoading(true)
        if(currentUser && accountActive === true) {
            setIsAvailable(true)
        }
        if(!currentUser && accountActive === false) {
            setIsAvailable(false)
        }
        setLoading(false)
    }, [currentUser, accountActive])

    // Logs out the user
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


    // Sets the loading spninner from React Bootstrap
    const Loading = () => {
        return(
            <Container>
                <Spinner animation='grow' style={{color: 'white'}} />
            </Container>
        )
    }

    return(
        <>
        <ImMenu style={{color: 'white', fontSize: "2rem"}} onClick={handleShow} className="nav-icon" />
        
        <Offcanvas style={{background: 'black', color: 'white'}} className='body-font' show={show} onHide={handleClose}>
            {loading === true ? 
            <>
            <Offcanvas.Header closeButton={<AiOutlineClose />} style={{color: 'white'}} className="close-button">
                Please wait...
            </Offcanvas.Header>
                <Loading />
            </>
            : <></>}

            {!currentUser ? 
            <>
            <Offcanvas.Header>
                <Offcanvas.Title className='d-flex align-items-center w-100 justify-content-between'>
                    <h4>Kenzo</h4>
                    <AiOutlineClose onClick={handleClose} style={{float: 'right'}} size={30} className="close-button" />
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ul style={{listStyle: 'none'}}>
                    <li>
                        <Link to='/login' className='nav-text' onClick={handleClose}>
                            <Button className='mt-1 mb-1' variant="primary">Login</Button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/register' className='nav-text' onClick={handleClose}>
                            <Button className='mt-1 mb-1' variant="primary">Sign Up</Button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/' className='nav-text' onClick={handleClose}>
                            <Button className='mt-1 mb-1' variant="primary">Demo</Button>
                        </Link>
                    </li>
                </ul>
            </Offcanvas.Body>
            </>
            :
            <></>
            }

            {currentUser && accountActive === false ? 
            <>
            <Offcanvas.Header>
                <Offcanvas.Title className='d-flex align-items-center w-100 justify-content-between'>
                    <h4>Kenzo</h4>
                    <AiOutlineClose onClick={handleClose} style={{float: 'right'}} size={30} className="close-button" />
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ul style={{listStyle: 'none'}}>
                    <li>
                        <Link to='/profile' className='nav-text' onClick={handleClose}>
                            <Button className='mt-1 mb-1' variant="primary">Profile</Button>
                        </Link>
                    </li>
                    <li>
                        <div className="nav-text" onClick={handleClose}>
                            <Button className='mt-1 mb-1' variant="primary" onClick={tryLogout}>Logout</Button>
                        </div>
                    </li>
                </ul>
            </Offcanvas.Body>
            </>
            : <></> }
            
            {currentUser && accountActive === true ? 
            <>
            <Offcanvas.Header>
                <Offcanvas.Title className='d-flex align-items-center w-100 justify-content-between'>
                    <h4>Generators</h4>
                    <AiOutlineClose onClick={handleClose} style={{float: 'right'}} size={30} className="close-button" />
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {SidebarData.map((item, index) => {
                    return (
                      <li key={index} className={item.cName}>
                        <Link to={item.path} onClick={handleClose}>
                          <span className="nav-icon">{item.icon}</span>
                          <span>{item.title}</span>
                        </Link>
                      </li>
                      );
                    })}
                    <ul style={{listStyle: 'none'}}>
                        <li>
                            <Link to='/dashboard' className='nav-text' onClick={handleClose}>
                                <Button className='mt-1 mb-1' variant="primary">Dashboard</Button>
                            </Link>
                        </li>
                        <li>
                            <Link to='/profile' className='nav-text' onClick={handleClose}>
                                <Button className='mt-1 mb-1' variant="primary">Profile</Button>
                            </Link>
                        </li>
                        <li>
                            <div className="nav-text" onClick={handleClose}>
                                <Button className='mt-1 mb-1' variant="primary" onClick={tryLogout}>Logout</Button>
                            </div>
                        </li>
                    </ul>
                </Offcanvas.Body>
            </>
            : <></>}
        </Offcanvas>
      </>      
    )
}

/*
    if(currentUser && accountActive === true) {
        return (
            <>
            <ImMenu style={{color: 'white', fontSize: "2rem"}} onClick={handleShow} />
            
            <Offcanvas style={{background: 'black', color: 'white'}} show={show} onHide={handleClose}>
                {loading === true ? 
                <>
                <Offcanvas.Header closeButton={<AiOutlineClose />} style={{color: 'white'}} className="close-button">
                    Please wait...
                </Offcanvas.Header>
                    <Loading />
                </>
                :
                <>
                <Offcanvas.Header>
                    <Offcanvas.Title className='d-flex align-items-center w-100 justify-content-between'>
                        <h4>Generators</h4>
                        <AiOutlineClose onClick={handleClose} style={{float: 'right'}} size={30} className="clost-button" />
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                {SidebarData.map((item, index) => {
                    return (
                      <li key={index} className={item.cName}>
                        <Link to={item.path} onClick={handleClose}>
                          <span className="nav-icon">{item.icon}</span>
                          <span>{item.title}</span>
                        </Link>
                      </li>
                      );
                    })}
                    <ul style={{listStyle: 'none'}}>
                        <li>
                            <Link to='/dashboard' className='nav-text' onClick={handleClose}>
                                <Button className='mt-1 mb-1' variant="primary">Dashboard</Button>
                            </Link>
                        </li>
                        <li>
                            <Link to='/profile' className='nav-text' onClick={handleClose}>
                                <Button className='mt-1 mb-1' variant="primary">Profile</Button>
                            </Link>
                        </li>
                        <li>
                            <div className="nav-text" onClick={handleClose}>
                                <Button className='mt-1 mb-1' variant="primary" onClick={tryLogout}>Logout</Button>
                            </div>
                        </li>
                    </ul>
                </Offcanvas.Body>
                </>
                }
            </Offcanvas>
          </>
        )
    }
    */
