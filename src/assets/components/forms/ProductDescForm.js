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
          prompt: `Write a creative, SEO friendly product description for the product ${formData.title} in a ${formData.tone}. This is what the product does: ${formData.aiPrompt}. The e-commerce platform I'm using is ${formData.extraValueRadio} and I need an optimal description for that platform. Just in case my e-commerce platform is 'Other', just give me a generalized product description that will work on any platform.`,
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
    extraFormLabel={"Product Name"}
    extraFormPlaceholder={"Enter your product name here."}

    formLabel="Product Description"
    formPlaceholder="Describe your product for me." 

    extraFormFieldRadio={true}
    extraFormLabelRadio={"Which platform are you using?"}
    extraValueRadio={["Shopify", "WooCommerce", "Magneto", "BigCommerce", "Amazon", "Squarespace", "Wix", "Other"]}

    requestProgress={progress} 
    requestResponse={response} 
    requestError={error} 
    requestLoading={loading}
    
    onSubmit={fetchData} 
    /> 
  )
}
