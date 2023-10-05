import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { text } from 'stream/consumers';

interface Note {
  id: number;
  title: string;
  content: string;
  selected: boolean;
}

// interface NoteProp {
//   n: Note;
// }

function App() {
  const [notes, setNotes] = useState<Note[]>(Array(0));
  // const [pressedNote, setPressedNote] = useState<boolean[]>(Array(false));
  const [showPopUp, setPopUp] = useState<boolean>(false);
  const [newNoteTitle, setNoteTitle] = useState<string>('');
  
  
  function NotePage(n : Note) {
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    function UpdateContent(id: number) {
      console.log('updateContent is pressed');
      if (textAreaRef.current)
        notes[id].content = (textAreaRef.current.value);
    }
    return (
          <div>
            <h2>{n.title}</h2>
            <p>{n.content}</p>
            <textarea 
              id='text'
              placeholder="Write your note..."
              defaultValue={''}
              ></textarea>
              <button className='confirm' onClick={() =>
              {
                UpdateContent(n.id);
              }}>c</button>
          </div>
        );
  }

  function AddNote() {
    setPopUp(true);
  };

  //confirm the addition of a note with title
  function ConfirmTitle() {
    if ( newNoteTitle !== '' )
    {
      const newNote: Note = {
        id: notes.length + 1,
        title: newNoteTitle,
        content: '',
        selected: true
      };
      
      setNotes(prevNotes => [...prevNotes, newNote]);
    }
    setPopUp(false);
    setNoteTitle('');
  };


  //generates buttons for the existed notes
  function NoteButtons() {
    return notes.map( note => (
      <div className='row'>
        <button className='note button' onClick={() => {
          note.selected = true;
        }}>{note.title}</button>
      </div>
  ))
  };

  //checks which note is selected and returns it to show its content
  function SelectNote(): Note {
    for ( let i = 0; i < notes.length; i++)
    {
      if (notes[i].selected === true)
        return(notes[i]);
    };
    return (notes[0]);
  }

  return (
    <div>
      <div className='note list'>
        {NoteButtons()}
      </div>
      <div>
      { notes.length > 0 ? (<div className='content'>
        {
            <NotePage  {...SelectNote()} />
        }
      </div>) : (
        <p>no notes created</p>
      )}
      </div>
      {showPopUp && (
        <div className='popup'>
          <input
          type='text'
          placeholder='enter title'
          value={newNoteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          ></input>
          <button className='confirm' onClick={ConfirmTitle}>Confirm</button>
          <button className='cancel' onClick={() => setPopUp(false)}>cancel</button>
        </div>
      )
      }
      <div className='addButton' onClick={AddNote}>
        <button>Add Note</button>
      </div>
    </div>
  )
};

export default App;