import React, { useEffect, useState } from 'react'
import Nave from '../Components/Nave'
import axios from 'axios'
import { useAuth } from '../Store/authStore'
import { createAvatar } from '@dicebear/core';
import { pixelArt } from '@dicebear/collection';
import {useStore} from '../Store/InStore'

const Home = () => {
    const { auth } = useAuth()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [notes, setNotes] = useState([])
   
    const avatar = createAvatar(pixelArt, {
    
    });
  
    const svg = avatar.toString();
  
    const getNotes = async () => {
      try {
          const res = await axios.get('http://localhost:4000/notes/', {
              headers: {
                  Authorization : auth.token
              }
          })
          if(!res.data.msg) {
              console.log(res.data)
              setNotes(res.data)
          }
      } catch (err) {
          console.log(err)
      }
    }
  
    const addNote = async () => {
      try {
          const res = await axios.post('http://localhost:4000/notes/', {
              title,
              content,
          }, {
              headers: {
                  Authorization : auth.token
              }
          })
          setNotes([...notes, res.data])
          
      } catch (err) {
          console.log(err)
      }
    }
  
    const deleteNote = async (id) => {
      try {
          const res = await axios.delete('http://localhost:4000/notes/delete/'+id, {
              headers: {
                  Authorization : auth.token
              }
          })
          setNotes(notes.filter(n => n._id != id))
      } catch (err) {
          console.log(err)
      }
    }
    const divs = useStore((state) => state.divs);
    const deleteDiv = useStore((state) => state.deleteDiv);
    /* {
    const [b, setB] = useState('tap on the pens done');
    const [d, setD] = useState('you can write anything you want here');
    const [divs, setDivs] = useState([{ b, d }]);
  
    const deleteDiv = () => {
      setDivs([]);
    }; */
  
    useEffect(() => {
      getNotes()
    }, [])
  return (
    <div>
        <Nave/>
        <div className='px-8' >
    <div className='mt-8 grid grid-cols-4 gap-3' >
    {/* {divs.map((div) => ( 
      <div  className='p-4 bg-sky-400 rounded-2xl'>
        <h2 className='text-xl font-bold'>{div.b}</h2>
        <p>{div.d}</p>
        <button
          className='btn btn-sm bg-amber-200 text-slate-500 mt-4'
          onClick={() => deleteDiv(div.bd)}
        >
          Delete
        </button>
      </div>
    ))} */}
    {divs.map((div ) => (
        <div  className='p-4 bg-sky-400 rounded-2xl'>
          <h2 className='text-xl font-bold'>{div.b}</h2>
          <p>{div.d}</p>
          <button
            className='btn btn-sm bg-amber-200 text-slate-500 mt-4'
            onClick={deleteDiv}
          >
            Delete
          </button>
        </div>
      ))}
    
    {
    notes.map(n => 
      <div>
      
        <div className='p-4 bg-sky-400 rounded-2xl' >
        <h2 className='text-xl font-bold' > {n.title} </h2>
        <p> {n.content} </p>
        <button className='btn btn-sm bg-amber-200 text-slate-500 mt-4' 
        onClick={() => deleteNote(n._id)}
        >delete</button>
        </div></div>
        )
    }
    </div>
<dialog id="my_modal_2" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Add Your Note</h3>
    <div>
  <label
    htmlFor="Title"
    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  >
    Title
  </label>
  <input
    type="text"
    id="first_name"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    placeholder="Title"
    required=""
    onChange={e => setTitle(e.target.value)}
  />
</div>
<div>
  <label
    htmlFor="Title"
    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  >
    Content
  </label>
  <textarea
    type="text"
    id="first_name"
    className="bg-gray-50 border border-gray-300 h-56 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    placeholder="Title"
    required=""
    onChange={e => setContent(e.target.value)}
  />
</div>
<button
  type="button"
  onClick={addNote}
  className="mt-3 block mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
>
  Add
</button>

  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
    <>
  <div data-dial-init="" className="fixed bottom-6 right-10 group">
    <button
      type="button"
      data-dial-toggle="speed-dial-menu-dropdown-alternative"
      aria-controls="speed-dial-menu-dropdown-alternative"
      aria-expanded="false"
      onClick={()=>document.getElementById('my_modal_2').showModal()}
      className="flex items-center justify-center ml-auto text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800 animate-bounce"
    >
      <svg
        className="w-6 h-6"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="m13.835 7.578-.005.007-7.137 7.137 2.139 2.138 7.143-7.142-2.14-2.14Zm-10.696 3.59 2.139 2.14 7.138-7.137.007-.005-2.141-2.141-7.143 7.143Zm1.433 4.261L2 12.852.051 18.684a1 1 0 0 0 1.265 1.264L7.147 18l-2.575-2.571Zm14.249-14.25a4.03 4.03 0 0 0-5.693 0L11.7 2.611 17.389 8.3l1.432-1.432a4.029 4.029 0 0 0 0-5.689Z" />
      </svg>
      <span className="sr-only">Open actions menu</span>
    </button>
  </div>
 
</>

    </div>
    </div>
  )
}

export default Home