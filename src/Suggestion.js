import { useEffect, useState } from "react";
import "./App.css";

const Suggestion = ({ data, handleSuggestion }) => {
  console.log(data);
  const [show, setShow] = useState([]);
  const [flag, setFlag] = useState(false);
  useEffect(()=>{
   if (data) {
      setShow(data);
      setFlag(true);
    } else {
      setShow([]);
      setFlag(false);
    } 
  },[data])
  return (
    <>
      {flag &&
        show.map((message, index) => (
          <button
            className="suggestionBox"
            key={index}
            onClick={() => {
              handleSuggestion(message);
            }}
          >
            {message}
          </button>
        ))}
    </>
  );
};

export default Suggestion;
