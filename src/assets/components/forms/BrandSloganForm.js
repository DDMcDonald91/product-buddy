import React, { useState } from 'react'
import FormLayout from '../FormLayout'
import axios from 'axios'

export default function ProductDescForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [progress, setProgress] = useState(0)
  const [response, setResponse] = useState(null)
  //API
  const API_URL = process.env.REACT_APP_API_URL

  const fetchData = async (formData) => {
      setLoading(true);
      try {
        const result = await axios.post(`${API_URL}/chat`, {
          prompt: `Write a creative and unique list of 5 brand slogans for my business in a ${formData.tone}. For context, my business name is ${formData.title}.`,
          temperature: 0,
          },{
            // You can use the `onUploadProgress` function provided by Axios
            onUploadProgress: progressEvent => {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setProgress(percentCompleted);
            },
          });
          setResponse(result.data);
          console.log(result);
          console.log(response);
          } catch (error) {
              setError(true);
              console.log(error);
          }
          setLoading(false);
    };

  return (
    <FormLayout 
    extraFormField={true}
    extraFormLabel={"Business Name"}
    extraFormPlaceholder={"Enter your business name here."}


    formLabel="Business Service Description"
    formPlaceholder="Describe what your business offers to your clients or customers." 

    requestProgress={progress} 
    requestResponse={response} 
    requestError={error} 
    requestLoading={loading} 

    onSubmit={fetchData} 
    /> 
  )
}