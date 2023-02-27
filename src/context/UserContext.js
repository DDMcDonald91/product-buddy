import { useContext, createContext, useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";

const UserContext = createContext(null)

export function UserContextProvider({ children }) {
    // global user states
    const auth = getAuth();
    const [loading, setLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState(null);
    const [docSnap, setDocSnap] = useState(null);
    const [sessionID, setSessionID] = useState(null);
    const [eventSnap, setEventSnap] = useState(null);
    const [accountStatus, setAccountStatus] = useState(null);
    const [accountActive, setAccountActive] = useState(false)


    // check for Firebase user on load
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        if(currentUser){
            retrieveUser()
        }
        setLoading(false)
        return unsubscribe
    }, [!currentUser, !docSnap, !sessionID, !accountStatus, !eventSnap])

    // login user
    const login = (email, password) => {

        // login user w/ firebase function then sets the user
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        setCurrentUser(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log("Login error:", errorCode, errorMessage)
        });
    }

    // logout user
    const logout = async () => {
       await signOut(auth)
        .then(() => {
          // logout successful.
          console.log("User signed out")
          setCurrentUser(null)
          setDocSnap(null)
          setSessionID(null)
          setEventSnap(null)
          setAccountStatus(null)
          setAccountActive(false)
          window.location.reload(false);
        }).catch((error) => {
          // An error happened.
          console.log("Logout error:", error)
        });
    }

    // retrieves user account data if the user is signed in
    const retrieveUser = async () => {
        if(currentUser) {
            // Get events doc from Firebase database
            const userRef = await doc(db, 'users', currentUser.uid);
            const usersDoc = await getDoc(userRef);
            await setDocSnap(usersDoc.data());
            await setSessionID(docSnap.sessionId);
            console.log(docSnap, sessionID);
        } else {
            console.log('Error searching for user data.')
            return
        }

        try {
            const eventRef = await doc(db, 'events', docSnap.customerData.id);
            const eventDoc = await getDoc(eventRef);
            await setEventSnap(eventDoc.data());
            await setAccountStatus(eventSnap.accountStatus)
            console.log(eventSnap) 
        } catch (error) {
            console.log(error)
        }

        if(accountStatus == "active" || "trialing" || "paused") {
            setAccountActive(true)
        }

        if(accountStatus !== "active" || "trialing" || "paused") {
            setAccountActive(false)
        }
    }

    return (
        <UserContext.Provider value={
            {
            currentUser,
            login,
            logout,
            docSnap,
            sessionID,
            accountStatus,
            accountActive,
            retrieveUser
            }
        }>{!loading && children}</UserContext.Provider>
    )
}

export const UserContextData = () => {
    return useContext(UserContext)
}
