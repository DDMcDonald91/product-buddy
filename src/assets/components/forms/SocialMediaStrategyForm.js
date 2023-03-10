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
            prompt: `I am a content creator or social media influencer with multiple social media accounts. Create a unique and effective social media strategy for my brand's online presence. This is my brand or business name: ${formData.title}. An accurate description of my business would be: ${formData.aiPrompt}.  This is my brand's target audience: ${formData.extraValue2}. The brand personality or identity would be: ${formData.extraValue3} And lastly, this is the goal I hope to achieve with this strategy: ${formData.extraValueRadio}.`,
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
    extraFormLabel3={"Brand Personality"}
    extraFormPlaceholder3={"How would you describe your brand?"}

    extraFormFieldRadio={true}
    extraFormLabelRadio={"Strategy Goal"}
    extraValueRadio={["Increase Brand Awareness", "Drive Website Traffic", "Boost Engagement", "Generate Leads", "Increase Sales"]}

    requestProgress={progress} 
    requestResponse={response} 
    requestError={error} 
    requestLoading={loading} 

    onSubmit={fetchData} 
    /> 
  )
}
