import { useState } from 'react';
import axios from 'axios';
import FormLayout from '../FormLayout';

export default function ProductTitleForm() {
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
        // Also stores results in state variable 
          try {
              const result = await axios.post(`${API_URL}/chat`, {
                  prompt: `Give 5 creative and unique ideas for a product name based on this description of what the product is and what it does. My business name is ${formData.title} and my product does this: ${formData.aiPrompt}`,
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
        extraFormField={true}
        extraFormLabel={"Business Name"}
        extraFormPlaceholder={"Enter your business name."}
    
        formLabel="Product Description"
        formPlaceholder="Describe what your product is." 
    
        requestProgress={progress} 
        requestResponse={response} 
        requestError={error} 
        requestLoading={loading} 
    
        onSubmit={fetchData} 
        /> 
      )
}
