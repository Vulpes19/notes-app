import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { text } from 'stream/consumers';

interface Note {
  id: number;
  title: string;
  content: string;
}

interface NoteProp {
  n: Note;
}

interface Selection {
  getRangeAt(index: number): Range;
}
//note page


function App() {
  const [notes, setNotes] = useState<Note[]>(Array(0));
  const [showPopUp, setPopUp] = useState<boolean>(false);
  const [noteContent, setNoteContent] = useState<string>('');
  const [newContent, setNewContent] = useState<boolean[]>(Array(false));
  const [newNoteTitle, setNoteTitle] = useState<string>('');

  function HandleChange(e: React.ChangeEvent<HTMLTextAreaElement>, id: number) {
    setNoteContent(e.target.value);
    newContent[id] = true;
  }
  function GetNoteContent({n}: NoteProp): string {
    if (newContent[n.id] )
    {
      // n.content = noteContent;
      newContent[n.id] = false;
      return (noteContent);
    }
    return (n.content);
  }
  function AssignContent() {
    notes.forEach((note) => {
      if (newContent[note.id])
      {
        note.content = noteContent;
      }
    })
  }
  function MoveCursorToEnd(e: React.ChangeEvent<HTMLTextAreaElement>) {
    var temp = e.target.value;
    e.target.value = '';
    e.target.value = temp;
  }
  function NotePage({n} : NoteProp) {
    AssignContent();
    return (
          <div>
            <h2>{n.title}</h2>
            <p>
              <textarea 
              placeholder="Write your note..."
              autoFocus
              onChange={(e) => HandleChange(e, n.id)}
              onFocus={MoveCursorToEnd}
              value={GetNoteContent({n})} ></textarea>
            </p>
          </div>
        );
  }

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