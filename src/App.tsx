import React from 'react';
import { useState } from 'react';

interface Note {
  id: number;
  title: string;
  content: string;
}

interface NoteProp {
  n: Note;
}
//note page

function NotePage({n} : NoteProp) {
    return (
        <div>
          <h2>{n.title}</h2>
          <p>
          <textarea placeholder="Write your note..." value={n.content} ></textarea>
          </p>
        </div>
      );
}

function App() {
  const [notes, setNotes] = useState<Note[]>(Array(0));
  const [showPopUp, setPopUp] = useState<boolean>(false);
  const [newNoteTitle, setNoteTitle] = useState<string>('');

  function AddNote() {
    setPopUp(true);
  };

  function ConfirmTitle() {
    if ( newNoteTitle !== '' )
    {
      const newNote: Note = {
        id: notes.length + 1,
        title: newNoteTitle,
        content: ''
      };
      setNotes(prevNotes => [...prevNotes, newNote]);
    }
    setPopUp(false);
    setNoteTitle('');
  };
  function NoteButtons() {
    return notes.map( note => (
      <div className='row'>
        <button className='note button'>{note.title}</button>
        {/* <div className='content'> */}
          {/* <h2>{note.title}</h2> */}
          {/* <textarea defaultValue="Write your note..." value={note.content} ></textarea> */}
          {/* <p>{note.content}</p> */}
        {/* </div> */}
      </div>
  ))
  };
  return (
    <div>
      <div className='note list'>
        {NoteButtons()}
      </div>
      <div className='content'>
        {
          notes.map(note =>( <NotePage n={note}/>))
        }
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