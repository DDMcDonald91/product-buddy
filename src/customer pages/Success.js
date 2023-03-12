import { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap'
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../Firebase";
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Success() {
  const [session_id, setSessionID] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [docSnap, setDocSnap] = useState(null)

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const upgrade = async () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            // ...
            setCurrentUser(user)
            console.log(user, uid)
        } else {
            // User is signed out
            // ...
            console.log('No user logged in currently.')
            navigate('/register')
        }
        });
  
      const searchParams = new URLSearchParams(window.location.search);
      const sessionId = searchParams.get('session_id');
      setSessionID(sessionId)
      console.log(session_id);
  
      if(currentUser) {
        //const docRef = query(usersCollectionRef, where("accountID", "==", currentUser.uid));
        const docRef = doc(db, "users", currentUser.uid);
        setDocSnap(await getDoc(docRef));
        
        if (docSnap) {
          console.log("Document found!")
          console.log("Document data:", docSnap);
          console.log(docSnap.data(), session_id);
          console.log(docSnap.data().sessionId);

          try {
           await updateDoc(docRef, {
            sessionId: session_id,
          });
        } catch (e) {
          console.error("Error adding document: ", e);
          alert("There has been a error")
          return
        }
          //await setDoc(docRef, { sessionId: session_id }, { merge: true }).then(console.log("document updated"));
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }
    }
    upgrade();

  }, [!session_id, !currentUser, !docSnap]);

  if(session_id === null || currentUser === null){
    return(
      <Container align="center" className='mt-5'>
        <p>Loading...</p>
      </Container>
    )
  }

  return (
    <Container align='center' className='mt-5'>
      <motion.div
        initial={{opacity: 0, x: -100}}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: .2 }}
        >
        <h2>Checkout Successful!</h2>
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
