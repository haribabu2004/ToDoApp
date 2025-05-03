import React from 'react'
import Create from './Create.jsx';

function Home() {
    const [todo, setTodo] = React.useState([]);
    return (
        <div className='flex-col justify-center p-6'>
            <div className="flex items-center flex-col w-3/4 bg-gray-200 p-5 rounded-lg shadow-lg">
                <h2 className='my-5 text-3xl bg-black text-white p-2 rounded-sm'>Todo List</h2>
                <Create />
            </div>
            <div className='flex w-3/4 bg-gray-200 p-3 rounded-lg shadow-lg mt-5'>
                {
                    todo.length === 0
                    ?
                    <div className='flex items-center'><h2>No Record</h2></div>
                    :
                    <div className='flex flex-col gap-3'>
                        {
                            todo.map((item, index) => {
                                return (
                                    <div key={index} className='bg-white p-4 rounded-lg shadow-md'>
                                        <h2>{item}</h2>
                                    </div>
                                )
                            })
                        }
            </div>
        }   
            </div>
        </div>

    )
}

export default Home
