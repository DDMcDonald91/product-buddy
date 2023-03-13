import { useState } from 'react';
import axios from 'axios';
import FormLayout from '../FormLayout';

export default function YTDescriptionForm() {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0)

    //API
    const API_URL = process.env.REACT_APP_API_URL

    const fetchData = async (formData) => {
        setLoading(true);
        if(!formData.aiPrompt){
          alert('Enter in all fields')
          setLoading(false);
          return
        }
        try {
            const result = await axios.post(`${API_URL}/chat`, {
                prompt: `Create a list of 5 unique and creative descriptions for a Youtube video that rank well in search for this topic: ${formData.aiPrompt}. The description should aim to effectively communicate the value of the video to the target audience and optimize for search engines and be written in a ${formData.tone} tone.`,
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

    formLabel="Video Topic"
    formPlaceholder="Describe the topic you're making your video around." 

    requestProgress={progress} 
    requestResponse={response} 
    requestError={error} 
    requestLoading={loading} 

    onSubmit={fetchData} 
    /> 
  )
}
