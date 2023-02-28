import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'; 
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

    const [newNote, setNewNote] = useState({
      title: "",
      content: ""
    });

    function handleChange(event){
      const {value, name} = event.target;

      setNewNote(prevValue => {
        // We need to return this.
        return {
          ...prevValue,
          [name]: value
        }
      });
    }

    function addNewNote(event){
      event.preventDefault();
      props.OnAdd(newNote);
      setNewNote({
        title: "",
        content: ""
      });
    }

    function expand(){
      setExpanded(true);
    }

    return (
      <div>
        <form className="create-note">
          <input name="title" placeholder="Title" onChange={handleChange}
                 value={newNote.title} onClick={expand} />
          { isExpanded ? <textarea name="content" placeholder="Take a note..." rows="3" onChange={handleChange}
                    value={newNote.content} /> : null}
          {/* <button onClick={addNewNote}>Add</button> */}
          <Zoom in={isExpanded}>
            <Fab onClick={addNewNote}>
              <AddIcon />
            </Fab>
          </Zoom>
        </form>
      </div>
    );
  }
  
  export default CreateArea;