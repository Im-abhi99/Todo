import React, {useEffect, useState } from 'react'
import axios from 'axios'
import {Link, useNavigate } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin3Line } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Home() {
  const [task, setTask] = useState("");
  const [readtask, setReadtask] = useState([]);

  const update = (id,task) => {
    localStorage.setItem("id", id);
    localStorage.setItem("task",task);

  };
  useEffect(() => {
    let url = 'https://64620f15185dd9877e49f46e.mockapi.io/todo';
    axios.get(url).then((res) => {
     
      console.log(res.data);
      setReadtask(res.data.reverse());
    }).catch((err) => console.log(err))
  }, []);


  let navigate = useNavigate();
  const addtojson = (e) => {
    if (task.length !== 0) {
      e.preventDefault()
      axios.post("https://64620f15185dd9877e49f46e.mockapi.io/todo", {
        task: task
      }
      ).then((res) => {
        toast.success('🦄 Add successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          theme: "light",
          });
        navigate("/");
        window.location.reload()
      }).catch((err) => console.log(err.message));
      console.log(task);
    }
    else {
      alert('Please enter data')
    }
  }





  const deletetask = (id) => {
    if (window.confirm("do you want to Delete the task ?")) {
      axios.delete(`https://64620f15185dd9877e49f46e.mockapi.io/todo/${id}`).then((res) => {
        toast.success('🦄 Deleted successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          theme: "light",
          });
        navigate("/home");
      }).catch((err) => console.log(err))
    }
  }
  return (
    <>

      <div className='container my-5 text-center'>
        <h1> Welcome to abhi's Todo</h1>
        <form onSubmit={addtojson}>
          <div className='d-lg-flex '>
            <input type="text" className='form-control w-50 mb-3 ms-lg-auto ms-auto me-auto' placeholder='Enter text' id="" onChange={(event) => setTask(event.target.value)} />

            <button className='mb-3 ms-lg-2 me-auto' type="submit">Add task</button><ToastContainer /></div>
        </form></div>

      <div className='container'>
        
        <h3 className='text-center'>Your Task</h3 >
     
          {
            readtask.map((data) => {
              return (
                <>
              
                  <div className='container justify-content-evenly ' >
                    <div className='d-lg-flex sha my-3 mx-auto mb-lg-4 px-lg-5 py-lg-2 p-1'>
                      <div className='col-lg-9 abhi ms-5 py-lg-1 fs-5 text-lg-left pe-lg-5'>{data.task}</div>
                  <div className="d-flex mx-auto">
                      <div className='col-lg-1 mx-auto'>  <Link to="/update"><BiEdit className='fs-3 text-white' onClick={()=>update(data.id, data.task)} /></Link></div>

                      <div className='col-lg-1 me-5 mx-auto ' ><RiDeleteBin3Line onClick={() => deletetask(data.id)} className='fs-3 ms-lg-5' />  <ToastContainer />
                     </div>
                    </div>
                    </div>
                  </div>
                </>)
            })
          }
       

      </div>

    </>
  )
}






