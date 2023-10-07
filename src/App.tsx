import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { text } from 'stream/consumers';
import './index.css'

interface Note {
  id: number;
  title: string;
  content: string;
  selected: boolean;
}

const sideBar_css: string = 'bg-MidGray h-screen w-64 z-0 fixed top-0 left-26 rounded';
const addButton_css: string = 'bg-WhitishYellow text-black z-10 absolute bottom-5 left-10 rounded text-xl w-40 h-10 flex items-center justify-center';
const confirmButton_css: string = 'bg-WhitishYellow text-black z-10 rounded';
const noteButtons_css: string = 'bg-WhitishYellow text-black z-10 rounded';
const noteContent_css: string = 'text-black';

function App() {
  const [notes, setNotes] = useState<Note[]>(Array(0));
  // const [pressedNote, setPressedNote] = useState<boolean[]>(Array(false));
  const [showPopUp, setPopUp] = useState<boolean>(false);
  const [newNoteTitle, setNoteTitle] = useState<string>('');
  // const [contentInput, setContentInput] = useState<string>('');
  
  function NotePage(n : Note) {
    console.log(n.id);
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    //updates the content of the note
    useEffect(()=>{
      if (textAreaRef.current)
        textAreaRef.current.value = n.content;
    },[n.content]);

    function UpdateContent(id: number) {
      console.log('updateContent is pressed');
      let updatedNotes = [...notes];
      if (textAreaRef.current)
      {
        updatedNotes[id - 1].content = (textAreaRef.current.value);
        console.log(textAreaRef);
        setNotes(updatedNotes);
        textAreaRef.current.value = updatedNotes[id - 1].content;
      }
    }
    
    return (
      <div>
            <h2>{n.title}</h2>
            <textarea 
              id='text'
              placeholder="Write your note..."
              ref={textAreaRef}
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
      notes.forEach(element => {
        if (element.id !== newNote.id)
          element.selected = false;
      });
    }
    setPopUp(false);
    setNoteTitle('');
  };


  function HandleClick(id: number) {
    let updatedNotes = [...notes];
    updatedNotes.map( (note) => {
      if (note.id === id)
        note.selected = true;
      else
        note.selected = false;
    })
    setNotes(updatedNotes);
  }
  //generates buttons for the existed notes
  function NoteButtons() {
    return notes.map( note => (
      <div className='row'>
        <button className={noteButtons_css} onClick={ () => {
          HandleClick(note.id);
        }}>{note.title}</button>
      </div>
  ))
  };

  //checks which note is selected and returns it to show its content
  function SelectNote(): Note {
    for ( let i = 0; i < notes.length; i++)
    {
      if (notes[i].selected === true)
      {
        console.log(notes[i].title);
        return(notes[i]);
      }
    };
    return (notes[0]);
  }

  return (
    <div>
      <div className={sideBar_css}></div>
      <div className='note list'>
        {NoteButtons()}
      </div>
      <div>
      { notes.length > 0 ? (<div className='content'>
        {
          <NotePage  {...SelectNote()} />
        }
      </div >) : (
        <div className='absolute top-20 right-40 left-85 text-xl' ><p>no notes created</p></div>
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
          <button className={confirmButton_css} onClick={ConfirmTitle}>Confirm</button>
          <button className={confirmButton_css} onClick={() => setPopUp(false)}>cancel</button>
        </div>
      )
      }
      <div className={addButton_css} onClick={AddNote}>
        <button>Add Note</button>
      </div>
    </div>
  )
};

export default App;