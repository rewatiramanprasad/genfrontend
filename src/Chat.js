import React, { useEffect,useRef } from 'react';
import "./App.css";

const Chat = ({button,gemini,chatgpt}) => {
  console.log(button,gemini,chatgpt)
  const ref=useRef(null);
    useEffect(()=>{
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    },[gemini]);
    
  return (
    <div className='chatContainer'>
        
        <div className='chatInside'>{gemini&&button===1&& gemini.map((item)=>(
        
        <div key={item.id} style={{
            alignSelf: item.isUser ? 'flex-end' : 'flex-start',
            backgroundColor: item.isUser ? 'white' : 'whiteSmoke',
            margin:"7px",
            padding: "7px",
            borderRadius:'5px'

        }}>
            <div  ref={ref} >{item.message}</div>
            
        </div>
    
  ))}
  </div>
      
      <div>
        {chatgpt&&button===2&& chatgpt.map((item)=>(
        
            <div key={item.id} style={{
                alignSelf: item.isUser ? 'flex-end' : 'flex-start',
                padding: "7px",
                margin:"7px",
                backgroundColor: item.isUser ? '#d1e7dd' : '#f8d7da',
            }}>
                <div  >{item.message}</div>
               
            </div>
        
      ))}
      
      </div>
    
    </div>
  )
}

export default Chat;
