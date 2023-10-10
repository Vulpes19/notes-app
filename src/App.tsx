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
            <h2 className='absolute top-10 left-80 text-4xl font-bold'>{n.title}</h2>
            <div className='absolute top-20 left-80 w-40 border-b-2 border-black'></div>
            <textarea 
            className='absolute grow top-40 left-80 w-80 h-80 text-black z-10 border-hidden outline-none rounded'
              id='text'
              placeholder="Write your note..."
              cols={100}
              rows={100}
              ref={textAreaRef}
              ></textarea>
              <button className='' onClick={() =>
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
    return (
      notes.map( note => (
        <button className='bg-blue w-60 h-10 left-2 text-white font-semibold z-10 rounded' onClick={ () => {
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

  {/* <div className='flex flex-col space-y-3 bg-MidGray h-screen w-64 z-0 fixed top-0 left-26 rounded'> */}
      {NoteButtons()}
    {/* <div>
    <div className='absolute bg-WhitishYellow font-semibold text-black z-10 absolute bottom-5 left-10 rounded text-xl w-40 h-10 flex items-center justify-center' onClick={AddNote}>
      <button>Add Note</button>
    </div>
  </div>
  <div className='flex flex-col bg-pink'>
    { notes.length > 0 ? (<div>
      {
        <NotePage  {...SelectNote()} />
      }
    </div >) : (
      <div className='text-xl' ><p>no notes created</p></div>
      )}
    {showPopUp && (
      <div className='absolute w-64 h-20 bg-MidGray rounded'>
        <input
        className='relative bg-white left-5 top-5 text-black z-10 rounded'
        type='text'
        placeholder='enter title'
        value={newNoteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
        ></input>
        <button className='absolute left-1 bottom-1 bg-WhitishYellow w-20 text-black z-10 rounded' onClick={ConfirmTitle}>Confirm</button>
        <button className='absolute right-1 bottom-1 bg-WhitishYellow w-20 text-black z-10 rounded' onClick={() => setPopUp(false)}>Cancel</button>
      </div>
  )
}
    </div> */}
  return (
    <div className='flex flex-row h-full w-full bg-pink'>
      {/* sidebar */}
      <div className='flex-col w-64 bg-MidGray h-screen rounded-r-2xl'>
        <div>{NoteButtons()}</div>
        <div className='bg-WhitishYellow w-40 text-center rounded ml-5 self-baseline ' onClick={AddNote}><button>Add Note</button></div>
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
              <div><button className='ml-5 mt-5 bg-WhitishYellow w-20 text-black z-10 rounded' onClick={ConfirmTitle}>Confirm</button></div>
              <div><button className='ml-16 mt-5 bg-WhitishYellow w-20 text-black z-10 rounded' onClick={() => setPopUp(false)}>Cancel</button></div>
            </div>
          </div>
          )}
        {/* <div className='w-full h-14 border-b-solid border-black border-b-[2px] bg-white text-3xl'>title</div>
        <div className='bg-white mt-4'>asdkjasdluasdkjahsdasd
        asdjasdkahsdashd asjdhaskjdhaskljdhas dasjdhas dd </div> */}
      </div>
    </div>
  )
};

export default App;