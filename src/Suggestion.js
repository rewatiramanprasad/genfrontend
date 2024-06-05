import "./App.css";
const Suggestion=({data,handleSuggestion})=> {
    // console.log(props.data.message)
    
     return (
    //    <div  >
       <button className="suggestionBox" key={data.id} onClick={()=>{handleSuggestion(data)}}>{data.message}</button>

    //    </div>
     );
   }

   export default Suggestion;