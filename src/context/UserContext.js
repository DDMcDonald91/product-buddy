import { useContext, createContext, useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, getAuth } from "firebase/auth";

const userContext = createContext(null)

export function userContextProvider({ children }) {
    // global user states
    const auth = getAuth();
    const [loading, setLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState(null);
    const [docSnap, setDocSnap] = useState(null);
    const [sessionId, setSessionID] = useState(null);
    const [eventSnap, setEventSnap] = useState(null);
    const [accountStatus, setAccountStatus] = useState(null);

    // check for Firebase user on load
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
            console.log(currentUser, uid)
        })
        retrieveUser()
        retrieveAccountDetails()
        return unsubscribe
    }, [currentUser])

    // login user
    const login = (e) => {
        e.preventDefault();
        
        // login user w/ firebase function then sets the user
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        setCurrentUser(user)
        navigate("/dashboard");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log("Login error:",errorCode, errorMessage)
        });
    }

    // logout user
    const logout = () => {
        signOut(auth)
        .then(() => {
          // logout successful.
          console.log("User signed out")
          setCurrentUser(null)
          navigate('/')
        }).catch((error) => {
          // An error happened.
          console.log("Logout error:", error)
        });
    }

    // retrieves user account data if the user is signed in
    const retrieveUser = async () => {
        if(currentUser) {
            // Get events doc from Firebase database
            const docRef = await doc(db, 'users', currentUser.uid);
            const usersDoc = await getDoc(docRef);
            setDocSnap(usersDoc.data());
            setSessionID(docSnap.sessionId)
            console.log(docSnap, sessionId);
        } else {
            console.log('Error searching for user data.')
        }
    }

    // retrieves account status from events database
    const retrieveAccountDetails = async () => {
        if(docSnap) {
            // Get events doc from Firebase database
            console.log(docSnap.customerData.id)
            const docRef = await doc(db, 'events', docSnap.customerData.id);
            const eventsDoc = await getDoc(docRef);
            setEventSnap(eventsDoc.data());
            setAccountStatus(eventSnap.accountStatus)
            console.log(eventSnap, accountStatus);
        } else {
            console.log('Error searching for user events and account data.')
        }
    }
}

return(
    <userContext.Provider value={
        {
        currentUser,
        login,
        logout,
        docSnap,
        sessionId,
        accountStatus
        }
    }>{!loading && children}</userContext.Provider>
)

export const userContextData = () => {
    return useContext(userContext)
}
