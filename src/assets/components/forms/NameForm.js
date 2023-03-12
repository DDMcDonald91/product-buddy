import { useState } from 'react';
import axios from 'axios';
import FormLayout from '../FormLayout';

export default function NameForm() {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0)

    //API
    const API_URL = process.env.REACT_APP_API_URL

      const fetchData = async (formData) => {
        // Sets loading while function runs
          setLoading(true);
        // Checks for input from user
          if(!formData.aiPrompt){
            alert('Enter in all fields')
            setLoading(false);
            return
            }
        // Post request to server for ChatGPT API
        // Also stores result in state variable 
          try {
              const result = await axios.post(`${API_URL}/chat`, {
                  prompt: `Give a list of 5 creative, clever and thoughtful ideas for a business name based on this description of what the business does: ${formData.aiPrompt}. Try not to be repetetive in your naming suggestions and double check to make sure any suggestion isn't a business name that is already in use. `,
                  temperature: 0,
              }, {
                // You can use the `onUploadProgress` function provided by Axios
                onUploadProgress: progressEvent => {
                  const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                  setProgress(percentCompleted);
                },
              });
              setResponse(result.data)
              console.log(result);
              console.log(response)
          } catch (err) {
              setError(err);
              console.log(error);
          }
          setLoading(false);
      };


  return (
    <FormLayout 
    extraFormField={false}

    formLabel="Business Service Description"
    formPlaceholder="Describe what your business offers." 

    requestProgress={progress} 
    requestResponse={response} 
    requestError={error} 
    requestLoading={loading} 

    onSubmit={fetchData} 
    /> 
  )
}