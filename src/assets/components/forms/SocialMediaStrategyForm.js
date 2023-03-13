import React, { useState } from 'react'
import FormLayout from '../FormLayout'
import axios from 'axios'

export default function SocialMediaStrategyForm() {
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
            prompt: `Create a unique strategy for increasing organic reach on my social media account. This is my brand or business name: ${formData.aiPrompt}. This is my target audience: ${formData.extraFormValue2}. And lastly, this is the goal I hope to achieve with this strategy: ${formData.extraFormValue3}.`,
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
    extraFormLabel={"Brand or Business Name"}
    extraFormPlaceholder={"Enter your business name here."}


    formLabel="Brand Description"
    formPlaceholder="Describe your brand and what it represents." 

    extraFormField2={true}
    extraFormLabel2={"Target Audience"}
    extraFormPlaceholder2={"Describe your target audience"}

    extraFormField3={true}
    extraFormLabel3={"Strategy Goal"}
    extraFormPlaceholder3={"What do you want to achieve with this strategy?"}

    requestProgress={progress} 
    requestResponse={response} 
    requestError={error} 
    requestLoading={loading} 

    onSubmit={fetchData} 
    /> 
  )
}
