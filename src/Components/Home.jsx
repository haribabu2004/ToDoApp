import React, { useState, useEffect } from 'react'
import Create from './Create.jsx';
import axios from 'axios';
import { BsCircleFill,BsFillTrashFill } from "react-icons/bs";


function Home() {
    const [todo, setTodo] = useState([]);

    const handleAdd = (task) =>{
        console.log(task);
        setTodo([...todo, task]);
    }

    const handleDelete= (id) =>{
        console.log(id);
        axios.delete("http://localhost:3001/delete/"+id)
        .then(result=>{
            console.log(result.data);
            setTodo(todo.filter(item=> item._id !== id));
        })
    }

    useEffect(() => {
        axios.get("http://localhost:3001/get")
            .then(res => {
                console.log(res.data);
                setTodo(res.data);
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <div className='flex flex-col items-center justify-center pt-3 bg-gray-100'>
            <div className="flex items-center flex-col w-3/4 bg-gray-200 p-5 rounded-lg shadow-lg">
                <h2 className='my-5 text-3xl bg-black text-white p-2 rounded-sm'>Todo List</h2>
                <Create handleAdd={handleAdd} />
            </div>
            <div className='flex w-3/4 bg-gray-200 p-3 rounded-lg shadow-lg mt-5'>
                {
                    todo.length === 0
                        ?
                        <div className='flex items-center'><h2>No Record</h2></div>
                        :
                        <div className='flex flex-col gap-3 w-full'>
                            {
                                todo.map((item, index) => (
                                    <div key={index} className='w-full bg-white p-3 rounded-lg shadow-md'>
                                        <div className='flex justify-between items-center'>
                                            <BsCircleFill className='cursor-pointer bg-white hover:text-green-600'/>
                                            <span>{item.task}</span>
                                            <span className='cursor-pointer hover:text-red-600'>
                                        <BsFillTrashFill onClick={()=> handleDelete(item._id)} className=''/>
                                            </span>
                                        </div>
                                    
                                    </div>
                                ))
                            }
                        </div>
                }
            </div>
        </div>

    )
}

export default Home
