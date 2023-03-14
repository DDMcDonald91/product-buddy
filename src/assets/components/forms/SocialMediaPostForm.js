import React, {useState} from 'react'
import axios from 'axios'
import FormLayout from '../FormLayout'

export default function SocialMediaPostForm() {
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
            prompt: `Imagine you're a social media influencer or content creator and you're about to post to your followers. Your goal is to create a post that will grab their attention and make them interested in whatever it is you're posting about in a ${formData.tone} tone. For context, the post is about ${formData.aiPrompt}, my target audience is ${formData.extraValue2} and the platform is ${formData.extraValueRadio}.`,

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
    
        formLabel="Post Description"
        formPlaceholder="Describe what you want to post about." 
    
        extraFormField2={true}
        extraFormLabel2={"Target Audience"}
        extraFormPlaceholder2={"Describe your target audience"}

        extraFormFieldRadio={true}
        extraFormLabelRadio={"Which platform are you posting to?"}
        extraValueRadio={["Facebook", "Instagram", "TikTok", "Pinterest"]}
    
        requestProgress={progress} 
        requestResponse={response} 
        requestError={error} 
        requestLoading={loading} 
    
        onSubmit={fetchData} 
        /> 
      )
}
