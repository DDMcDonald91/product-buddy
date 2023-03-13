import { useState } from 'react';
import axios from 'axios';
import FormLayout from '../FormLayout';

export default function YTScriptForm() {
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
                prompt: `Create a script outline for a ${formData.tone} YouTube video on the topic: ${formData.aiPrompt}. The outline should include an introduction, key sections, and a conclusion. Think about incorporating visually engaging elements and keeping the overall length of the video in mind (aim for around 5-10 minutes).`,
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
