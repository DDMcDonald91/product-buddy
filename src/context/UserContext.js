import { useContext, createContext, useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut, getAuth, updatePassword, sendPasswordResetEmail, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";
import axios from "axios";

const UserContext = createContext(null)

export function UserContextProvider({ children }) {
    // global user states
    const auth = getAuth();
    const [loading, setLoading] = useState(false)
    const [currentUser, setCurrentUser] = useState(null);
    const [docSnap, setDocSnap] = useState(null);
    const [sessionID, setSessionID] = useState(null);
    const [eventSnap, setEventSnap] = useState(null);
    const [accountStatus, setAccountStatus] = useState(null);
    const [accountActive, setAccountActive] = useState(false);

    const API_URL = process.env.REACT_APP_API_URL


    // check for Firebase user on load
    useEffect(() => {
        setLoading(true)
        const userCheck = async () => {
            const unsubscribe = auth.onAuthStateChanged(user => {
                setCurrentUser(user)
            })
    
            if(currentUser){
               retrieveUser()
            }

            return unsubscribe
        }
        userCheck()
    }, [currentUser, !docSnap, !sessionID, !accountStatus, !eventSnap, accountActive])

// retrieves user account data if the user is signed in
const retrieveUser = async () => {
    if (currentUser) {
      // Get events doc from Firebase database
      const userRef = doc(db, "users", currentUser.uid);
      const usersDoc = await getDoc(userRef);
      const updatedDocSnap = usersDoc.data();
      await setDocSnap(updatedDocSnap);
      await setSessionID(updatedDocSnap.sessionId);
      console.log(updatedDocSnap, sessionID);
    } else {
      console.log("Error searching for user data.");
    }
  
    // Checks for VIP accounts
    if (sessionID === "xxx") {
      const eventRef = doc(db, "events", "vip_" + currentUser.uid);
      const eventDoc = await getDoc(eventRef);
      const updatedEventSnap = eventDoc.data();
      await setEventSnap(updatedEventSnap);
      await setAccountStatus(updatedEventSnap.accountStatus);
      console.log(updatedEventSnap);
  
      if (accountStatus === "vip") {
        await setAccountActive(true);
      }
      setLoading(false);
    }
  
    // Checks for regular accounts
    if (accountStatus !== "vip") {
      try {
        const eventRef = doc(db, "events", docSnap.customerData.id);
        const eventDoc = await getDoc(eventRef);
        const updatedEventSnap = eventDoc.data();
        await setEventSnap(updatedEventSnap);
        await setAccountStatus(updatedEventSnap.accountStatus);
        console.log(updatedEventSnap);
  
        if (accountStatus === "active" || "trialing" && sessionID !== null) {
          await setAccountActive(true);
        }
        if (accountStatus === "paused") {
          await setAccountActive(false);
        }
        if (accountStatus === "canceled") {
          await setAccountActive(false);
        }
        if (sessionID === null) {
          await setAccountActive(false)
        }
      } catch (error) {
        console.log(error);
      }
    }
  
    console.log(accountActive);
    setLoading(false);
  };

  // create a new user
  const register = async (email, password, firstName, lastName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
          firstName: firstName,
          lastName: lastName,
          email: email,
          accountID: user.uid,
          sessionId: "",
      });
      console.log("new user added", user.uid);
  
      await axios.post(`${API_URL}/create-customer`, {
          name: firstName + " " + lastName,
          customerEmail: email,
          user: user.uid,
      });

      setLoading(false)
  } catch (error) {
      console.error(error);
      setLoading(false)
      alert("Sorry, there has been a error. Please try again.")
      return
  }
  }

    // login user
    const login = (email, password) => {

        // login user w/ firebase function then sets the user
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        setCurrentUser(user)
        console.log(currentUser)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log("Login error:", errorCode, errorMessage)
            alert("Sorry, try entering your credentials again.")
            return
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
          alert("Logout successful.")
        }).catch((error) => {
          // An error happened.
          console.log("Logout error:", error)
          alert('There seems to be an issue logging out. Refresh your page and try again.')
        });
    }

    // update user password
    const updateUserPassword = async (newPassword) => {
      // checks for a user before attempting password update
      if(!currentUser){
        alert('No user signed in.')
        return
      }
      // run reset password function from firebase
      await updatePassword(currentUser, newPassword).then(() => {
        alert("Password was updated successfully.")
      }).catch((error) => {
        // An error ocurred
        console.log(error)
        alert("Sorry, there seems to be an error. Try refreshing the page and try again.")
        return
      });
    }

    // reset user password
    const resetUserPassword = async (email) => {
      // run update password function from firebase
      await sendPasswordResetEmail(auth, email).then(() => {
        alert("Password reset link sent to your email.")
      }).catch((error) => {
        // An error ocurred
        console.log(error)
        alert("Sorry, there seems to be an error. Try refreshing the page and try again.")
        return
      });
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
            retrieveUser,
            updateUserPassword,
            resetUserPassword,
            register,
            loading
            }
        }>{children}</UserContext.Provider>
    )
}

export const UserContextData = () => {
    return useContext(UserContext)
}
