import React, { useState } from "react";
import NewLiItem from "./NewLiItem";

function App() {
  const [items, setNewItem] = useState([]);
  const [sentence, setSentence] = useState("");
  
  function keepTrackSentence(event){
    const sentenceBeingWritten = event.target.value;
    // Keeps track of the sentence that is being written
    setSentence(sentenceBeingWritten);
  }

  function addNewItem(){
    setNewItem(prevItems => {
      return [...prevItems, sentence];
    });
  }

  function deleteItem(id) {
    setItems(prevItems => {
      return prevItems.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input type="text" onChange={keepTrackSentence}/>
        <button onClick={addNewItem}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          <li>To Do List</li>
          {items.map((item, i) => <NewLiItem key={i} id={i} 
          onChecked={deleteItem} text={item}/>)}
        </ul>
      </div>
    </div>
  );
}

export default App;
