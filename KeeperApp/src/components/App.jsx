import Heading from './Header';
import Note from './Note';
import Footer from './Footer';
import Notes from './notes';
import CreateArea from './CreateArea';
import { useState } from 'react';

function App(){
    const [notes, setNotes] = useState([]);

    // We take as argument the new note coming from CreateArea.
    function addNote(newNote) {
        setNotes(prevValues => {
            console.log([...prevValues, newNote]);
            return [...prevValues, newNote];
        });
    }

    function deleteNote(id){
        setNotes(prevItems => {
            return prevItems.filter((item, index) => {
              return index !== id;
            });
        });
    }

    return (
    <div>
        <Heading />
        <CreateArea OnAdd={addNote} />
        {notes.map((item, i) => {
            return (
                <Note 
                    key={i} id={i} title={item.title} content={item.content}
                    OnDelete={deleteNote} 
                />  
            );
        })}
        <Footer />
    </div>
    );
}

export default App;
