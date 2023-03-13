import {useState} from 'react'
import axios from 'axios';
import FormLayout from '../FormLayout';

export default function ImageForm() {
    const [response, setResponse] = useState(null);
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(false);
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
            const result = await axios.post(`${API_URL}/image`, {
                prompt: `${formData.aiPrompt}.`,
            }, {
              // You can use the `onUploadProgress` function provided by Axios
              onUploadProgress: progressEvent => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setProgress(percentCompleted);
              },
            });
            console.log(result.data);
            setResponse(result.data);
            console.log(result);
        } catch (err) {
            setError(err);
            console.log(error);
        }

        setLoading(false);
    };

    return (
      <FormLayout 
      extraFormField={false}
  
      formLabel="Image Description"
      formPlaceholder="Describe the image you want to create. Try to be as detailed as possible." 
  
      requestProgress={progress} 
      requestResponse={response} 
      requestError={error} 
      requestLoading={loading} 
  
      onSubmit={fetchData} 
      /> 
    )
}
