import React, { useState } from 'react'
import FormLayout from '../FormLayout'
import axios from 'axios'

export default function SocialMediaContentFormatForm() {
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
            prompt: `I am a social media influencer and content creator with multiple social media accounts. I need a list of 5 unique content formats I can experiment with to stand out from my competitors that can be used across all of my various social media accounts. For context my content is centered around: ${formData.aiPrompt} and my target audience is: ${formData.extraValue2}}`,
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
    extraFormField={false}

    formLabel="Content Description"
    formPlaceholder="Describe your content and what it revolves around." 

    extraFormField2={true}
    extraFormLabel2={"Target Audience"}
    extraFormPlaceholder2={"Describe your target audience."}

    extraFormField3={false}

    requestProgress={progress} 
    requestResponse={response} 
    requestError={error} 
    requestLoading={loading} 

    onSubmit={fetchData} 
    /> 
  )
}
/* 
"What are some unique content formats I can experiment with to stand out from my competitors?"
*/