import { useState } from 'react';
import axios from 'axios';
import FormLayout from '../FormLayout';

export default function YTTitleForm() {
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
                prompt: `Generate 5 potential titles for a ${formData.tone} YouTube video on the topic: ${formData.aiPrompt}. Consider titles that are concise, attention-grabbing, and accurately reflect the content of the video. Aim to include keywords relevant to the topic and make the titles search engine optimized for ranking on YouTube.`,
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
