import React, {useState, useEffect} from 'react'
import { Container, Spinner, Button, Image } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { UserContextData } from '../../context/UserContext';
import { SidebarData } from './SlidebarData';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai'
import { ImMenu } from 'react-icons/im'
import './components.css'
import KenzoLogo from '../images/KenzoLogo.png'

export default function UserNav() {
    const { currentUser, accountActive, logout, sessionID } = UserContextData()
    
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
        if(!sessionID) {
            setIsAvailable(false)
        }
        if(!currentUser && accountActive === false) {
            setIsAvailable(false)
        }
        setLoading(false)
    }, [currentUser, accountActive])

    // Logs out the user
    const tryLogout = async () => {
        if(currentUser){
          try {
            await logout()
            navigate('/')
            window.location.reload(false);
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
                    <h4 className='pt-3'>Kenzo</h4>
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
                        <Link to='/demo' className='nav-text' onClick={handleClose}>
                            <Button className='mt-1 mb-1' variant="primary">Demo</Button>
                        </Link>
                    </li>
                </ul>
                <Container className='mt-3' style={{backgroundImage: `url(${KenzoLogo})`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', height: '10rem', width: '15rem'}}></Container>
            </Offcanvas.Body>
            </>
            :
            <></>
            }

            {currentUser && accountActive === false ? 
            <>
            <Offcanvas.Header>
                <Offcanvas.Title className='d-flex align-items-center w-100 justify-content-between'>
                    <h4 className='pt-3'>Kenzo</h4>
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
                <Container className='mt-3' style={{backgroundImage: `url(${KenzoLogo})`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', height: '10rem', width: '15rem'}}></Container>
            </Offcanvas.Body>
            </>
            : <></> }
            
            {currentUser && accountActive === true ? 
            <>
            <Offcanvas.Header>
                <Offcanvas.Title className='d-flex align-items-center w-100 justify-content-between'>
                    <h4 className="pt-3">Templates</h4>
                    <AiOutlineClose onClick={handleClose} style={{float: 'right'}} size={30} className="close-button" />
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {SidebarData.map((item, index) => {
                    return (
                      <li key={index} className={item.cName}>
                        <Link to={item.path} onClick={handleClose}>
                          <span className="nav-icon" style={{paddingRight: '10px'}}>{item.icon}</span>
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
                    <Container className='mt-3' style={{backgroundImage: `url(${KenzoLogo})`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', height: '10rem', width: '15rem'}}></Container>
                </Offcanvas.Body>
            </>
            : <></>}
        </Offcanvas>
      </>      
    )
}
