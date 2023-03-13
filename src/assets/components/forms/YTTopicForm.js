import { useState } from 'react';
import axios from 'axios';
import FormLayout from '../FormLayout';

export default function YTScriptForm() {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(0)
    const [loading, setLoading] = useState(false);

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
                prompt: `Generate a list of 5 unique and engaging YouTube video idea topics revolving around this topic: ${formData.aiPrompt}. Consider topics that are relevant, trending, and have potential for creative expression. The ideas should be suitable for a variety of audiences and video formats (e.g. vlog, tutorial, review).`,
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
  
      formLabel="Video Idea"
      formPlaceholder="Describe the type of video you want to make." 
  
      requestProgress={progress} 
      requestResponse={response} 
      requestError={error} 
      requestLoading={loading} 
  
      onSubmit={fetchData} 
      /> 
    )
}
