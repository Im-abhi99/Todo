
import React, { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Update() {

    const [id, setId] = useState(0);
    const [task, setTask] = useState("");
    let navigate = useNavigate(); 
    useEffect(() => {
        setId(localStorage.getItem("id"));
         setTask(localStorage.getItem("task"));
       
      }, []);
      const update = (e) => {
        e.preventDefault();
        axios
          .put(`https://64620f15185dd9877e49f46e.mockapi.io/todo/${id}`, {
            id: id,
            task: task
          
          })
          .then((res) => {
            toast('🦄 Wow so easy!', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              progress: undefined,
              theme: "light",
              });
         
            navigate("/");
          })
          .catch((err) => console.log(err.message));
      };
  return (
   <>
 <div className="container flex mt-5">
        <form className="w-50 mx-auto" onSubmit={update}>
          <label>ID</label>
          <input type="text" className="form-control" value={id} disabled />
          <label htmlFor="">Username</label>
           <input
            type="text"
            className="form-control my-lg-2"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button type="submit" className="mt-3  p-3 ">
           Update
          </button>
          <ToastContainer />
        </form>
      </div>
     
   </>
  )
}
