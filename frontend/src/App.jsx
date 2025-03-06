import React, { useEffect, useState } from 'react'
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

const App = () => {
  const [notes, setNotes] = useState([])
  
  const [creatingNote, setCreatingNote] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const [updatingNote, setUpdatingNote] = useState(false)
  const [updateID, setUpdateID] = useState(0)

  const [viewing, setViewing] = useState(false)
  const [viewID, setViewID] = useState(0)

  useEffect(()=>{
    fetchNote()
  },[])

  const fetchNote = async ()=>{
    const response = await fetch('http://localhost:4200/notes')
    const data = await response.json()
    setNotes(data)
    console.log(data)
  }

  const createNote = async () => {
    const response = await fetch("http://localhost:4200/add-note", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        title: title, 
        content: content,
      }),
    })
    const data = await response.json();
    console.log(data)
    fetchNote()
  }

  const updateNote = async (id) => {
    const response = await fetch("http://localhost:4200/edit-note/"+id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        title: title, 
        content: content,
      }),
    })
    fetchNote()
    setUpdatingNote(false)
  }

  const deleteNote = async (id) => {
    await fetch("http://localhost:4200/delete-note/"+id, {
      method: "DELETE",
    })
    fetchNote()
  }

  const createNew = ()=>{
    setTitle("")
    setContent("")
    setViewing(false)
    setCreatingNote(true)
    setUpdatingNote(false)
  }

  return (
    <div className='bg-gray-900 text-white min-h-screen flex'>
      <div className='bg-gray-800 flex flex-col align-center p-3'>
        <p className='p-4 mb-3 text-3xl cursor-pointer' onClick={()=>{
          setViewing(false)
          setCreatingNote(false)
          setUpdatingNote(false)
        }}>Your Notes</p>
        {notes.map((note)=>{
          return(
            <button className='my-1 flex gap-3  hover:bg-gray-700 py-2 px-4 rounded-md min-w-52'>
              <h3 className='text-xl self-stretch cursor-pointer grow text-left'
                onClick={()=>{
                setViewID(note.id)
                setViewing(true)
                setCreatingNote(false)
                setUpdatingNote(false)
              }}>
                {note.title}
              </h3>
              <div className='flex gap-3'>
              <button className='cursor-pointer' onClick={()=>{
                setUpdateID(note.id)
                setUpdatingNote(true)
                setViewing(false)
                setCreatingNote(false)
                setTitle(note.title)
                setContent(note.content)
              }}><FaPencilAlt /></button>
              <button onClick={()=>{deleteNote(note.id)}} className='cursor-pointer'><FaTrash /></button>
              </div>
            </button>
          )
        })}
        <button className='mt-3 text-2xl hover:bg-gray-700 p-2 px-4 rounded-md self-center cursor-pointer' onClick={()=>{createNew()}}>+</button>
      </div>
      <div className='grow'>
        {creatingNote && 
          <div className='flex flex-col gap-5 h-screen p-20'>
            <p className='text-5xl pb-3 text-center font-extrabold'>Create New Note</p>
            <input className='bg-gray-800 p-5 text-2xl' placeholder='title' value={title} onChange={(e)=>{setTitle(e.target.value)}}></input>
            <textarea className='bg-gray-800 grow p-5' placeholder='content (markdown)' value={content} onChange={(e)=>{setContent(e.target.value)}}></textarea>
            <button className='mt-3 text-xl bg-gray-800 hover:bg-gray-700 p-2 px-4 rounded-md self-center cursor-pointer' onClick={()=>{createNote()}}>Add note</button>
          </div>
        }
        {viewing && 
          <div className='p-20 flex flex-col h-full'>
          {notes.map((note)=>{
            if (note.id == viewID){
              return(
                <>
                <h1 className='text-5xl text-center font-extrabold mb-10'>{note.title}</h1>
                <div className='bg-gray-800 p-5 rounded-md grow'>
                  <ReactMarkdown components={{
                    h1: ({ children }) => <h1 className="text-3xl font-bold">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-2xl font-semibold">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-xl font-medium">{children}</h3>
                  }}>
                    {note.content.replace(/\n/g, "  \n")} 
                  </ReactMarkdown>
                </div>
                </>
              )
            }
          })}
          </div>
        }
        {updatingNote && 
          <div className='flex flex-col gap-5 h-screen p-20'>
            <p className='text-5xl pb-3 text-center font-extrabold'>Updating Note</p>
            <input className='bg-gray-800 p-5 text-2xl' placeholder='title' value={title} onChange={(e)=>{setTitle(e.target.value)}}></input>
            <textarea className='bg-gray-800 grow p-5' placeholder='content (markdown)' value={content} onChange={(e)=>{setContent(e.target.value)}}></textarea>
            <button className='mt-3 text-xl bg-gray-800 hover:bg-gray-700 p-2 px-4 rounded-md self-center cursor-pointer' onClick={()=>{updateNote(updateID)}}>Update Note</button>
          </div>
        }
        {!viewing && !creatingNote && !updatingNote &&
          <div className='grid place-items-center h-screen'>
            <div className='text-center'>
              <p className='text-5xl pb-3 font-extrabold'>Nothing here yet</p>
              <p>You can view, update, or create new notes by the bar on the left</p>
              <p>Ps: This notes partially support markdown, try to use * or #</p>
            </div>
          </div>
        }
      </div>
    </div>
  ) 
}

export default App