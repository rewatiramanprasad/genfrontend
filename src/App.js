import "./App.css";
import Suggestion from "./Suggestion";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Chat from "./Chat";
const App = () => {
  const [raw, setRaw] = useState([{id:0,message:"",isUser:false}]);
  // console.log(raw)
  const [suggestionData, setSuggestionData] = useState([]);
  const [button, setButton] = useState(1);
  const [gemini, setGemini] = useState([]);
  const [chatgpt, setChatgpt] = useState([]);
  const [value, setValue] = useState("");
  // console.log(value)
  useEffect(() => {
    setGemini(raw);
    // const data = raw.slice(0, 5);
    // setSuggestionData(data);
    // console.log("they called me");
  }, [raw]);

  const handleSuggestion = (item) => {
    setValue(item.message);
  };
  const callSuggestion = async() => {
    try {
      console.log(value)
      const response = await fetch(`https://genapi-roan.vercel.app/gemini/suggestion`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: value }),
      });
      const resp = await response.json();
      console.log(resp)
      if (resp.success) {
        let data = JSON.parse(resp.data);
        console.log(data);
        let temp=[];
        for( let i=0;i<data.length-1;i++){
          temp.push({id:i,message:data[i]});
        }
        console.log(temp)
        return temp
        // console.log(data,temp);
        // setSuggestionData(temp);
      } else {
        throw new Error(resp.message);
      }
    } catch (error) {
      toast(error.message);
    }
  };
  const callAPI = async () => {
    try {
      console.log("underCallAPi",value)
      const response = await fetch('https://genapi-roan.vercel.app/gemini/api',{
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({ prompt: value })
      });
      const resp = await response.json();
      console.log(resp)
      if (resp.success) {
        let map = {};
        // console.log(raw[raw.length-1].id);
        map.id = raw[raw.length - 1].id + 1;
        map.message = resp.data;
        map.isUser = false;
        return map;
        // console.log(raw[raw.length-1].id);
        // setRaw([...raw, map]);
        // raw.push(push)
        
      } else {
        throw new Error(resp.message);
      }
    } catch (error) {
      toast(error.message);
      console.log(error)
    }
  };
  const handleSubmit = async() => {
    let map = {};
    console.log(raw[raw.length-1].id);
    map.id = raw[raw.length -1].id + 1;
    map.message = value;
    map.isUser = true;
    // raw.push(push)
    await setRaw([...raw, map]);
    const call=await callAPI();
    console.log("call",call)
    call.id=map.id+1
    await setRaw([...raw,map, call]);
    const sugdata=await callSuggestion();
    // console.log(sugdata)
    await setSuggestionData(sugdata);

    // raw.push(map)

    
    // console.log(data,map,raw)
  };
  return (
    <div className="App">
      <ToastContainer />
      <div className="chat">
      
        <div className="groupButton">
          <span>
            <button
              style={{
                backgroundColor: button === 1 ? "aqua" : "rgb(21, 111, 111)",
              }}
              onClick={() => {
                setButton(1);
              }}
            >
              Gemini
            </button>
            <button
              style={{
                backgroundColor: button === 2 ? "aqua" : "rgb(21, 111, 111)",
              }}
              onClick={() => {
                setButton(2);
              }}
            >
              Chatgpt
            </button>
            
          </span>
        </div>

        <Chat button={button} gemini={gemini} chatgpt={chatgpt} />
      </div>
      <div className="fixedContainer">
        <div className="suggestion">
          {suggestionData.map((item) => (
            <Suggestion
              data={item}
              key={item.id}
              handleSuggestion={handleSuggestion}
            />
          ))}
        </div>
        <div className="action">
          <input
            type="text"
            placeholder="Type a prompt"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <button
            className="submit"
            onClick={() => {
              handleSubmit();
            }}
          >
            submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
