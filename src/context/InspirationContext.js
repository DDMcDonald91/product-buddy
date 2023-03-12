import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios'


const InspirationContext = createContext(null)

export function InspirationContextProvider({children}) {
    // Global state for the inspration component
    const [quote, setQuote] = useState()
    const [author, setAuthor] = useState()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    // API
    const api = "https://zenquotes.io/api/quotes/"

    useEffect(() => {
        // Set loading screen to on
        setLoading(true)

         // Function to retrieve quote
        const getQuote = async () => {
            try {
                const data = await fetch(api, {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': "*", 
                    },
                    body: JSON.stringify(data),
                });
                    console.log(data)
                    const randomQuote = data[Math.floor(Math.random() * data.length)];
                    setQuote(randomQuote.q);
                    setAuthor(randomQuote.a);
            } catch (error) {
                console.log(error)
                setError(true)
            }
        }

        // Set loading screen to off
        setLoading(false)
        
        // Call function to get quote
        getQuote();
        
    }, [])

    return(
        <InspirationContext.Provider value={
            {
                quote,
                author,
                loading,
                error
            }
        }>{children}</InspirationContext.Provider>
    )
}

export const InspirationContextData = () => {
    return useContext(InspirationContext);
}