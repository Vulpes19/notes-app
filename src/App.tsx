import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import './index.css'

interface Note {
  id: number;
  title: string;
  content: string;
  selected: boolean;
}

function App() {
  const [notes, setNotes] = useState<Note[]>(Array(0));
  const [deletedNote, setDeleteNote] = useState<boolean>(false);
  const [showPopUp, setPopUp] = useState<boolean>(false);
  const [newNoteTitle, setNoteTitle] = useState<string>('');
  
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
            <div className='flex flex-row justify-between'>
              <div><h2 className='ml-6 text-4xl font-bold font-sans'>{n.title}</h2></div>
              <div className='self-end text-2xl hover:text-blue'><button onClick={() => {
                setDeleteNote(true);
              }}>...</button></div>
            </div>
            <div className='mt-2 w-full border-b-2 border-black font-sans'></div>
            <textarea 
            className='mt-5 bg-pink w-full h-80 text-black z-10 border-hidden rounded'
              id='text'
              placeholder="Write your note..."
              cols={100}
              rows={100}
              ref={textAreaRef}
              ></textarea>
              <button className='bg-WhitishYellow rounded w-20 text-center font-semibold hover-bg-WhitishYellowhover' onClick={() =>
              {
                UpdateContent(n.id);
              }}>save</button>
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
    updatedNotes.forEach( (note) => {
      if (note.id === id)
        note.selected = true;
      else
        note.selected = false;
    })
    setNotes(updatedNotes);
  }
  //generates buttons for the existed notes
  function NoteButtons() {
    return (
      notes.map( note => (
        <button className='bg-blue ml-5 w-40 h-10 text-white font-semibold rounded hover:text-WhitishYellow hover:bg-bluehover' onClick={ () => {
          HandleClick(note.id);
        }}>{note.title}</button>
      ))
    )
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
    <div className='flex flex-row h-full w-full bg-pink'>
      {/* sidebar */}
      <div className='flex flex-col w-64 bg-MidGray h-screen rounded-r-2xl'>
        <div className='text-3xl text-WhitishYellow ml-6 mt-4 font-bold italic font-poppins'><h1>MyNotes</h1></div>
        <div className='mt-20 space-y-2'>{NoteButtons()}</div>
        <div onClick={AddNote}><button className='absolute bg-WhitishYellow w-40 text-center rounded bottom-4 ml-5 self-baseline font-bold hover:bg-WhitishYellowhover'>Add Note</button></div>
      </div>
      {/* note content */}
      <div className='bg-pink w-full flex-col m-6'>
          { notes.length > 0 ? (<div>
          {
            <NotePage  {...SelectNote()} />
          }
          </div >) : (
          <div className='text-xl ml-80' ><p>no notes created</p></div>
          )}
          {showPopUp && (
          <div className='flex flex-col ml-60 w-64 h-20 bg-MidGray rounded'>
            <div className='mt-2 ml-6'>
            <input
            className='bg-white text-black z-10 rounded'
            type='text'
            placeholder='enter title'
            value={newNoteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            ></input>
            </div>
            <div className='flex flex-row'>
              <div><button className='ml-5 mt-5 bg-WhitishYellow w-20 text-black z-10 rounded font-semibold hover-bg-WhitishYellowhover' onClick={ConfirmTitle}>Confirm</button></div>
              <div><button className='ml-16 mt-5 bg-WhitishYellow w-20 text-black z-10 rounded font-semibold hover-bg-WhitishYellowhover' onClick={() => setPopUp(false)}>Cancel</button></div>
            </div>
          </div>
          )}
      </div>
    </div>
  )
};

export default App;