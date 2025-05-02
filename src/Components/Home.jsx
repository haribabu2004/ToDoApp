import React from 'react'
import Create from './Create.jsx';

function Home() {
    return (
        <div className='flex justify-center p-6'>
            <div className="flex items-center flex-col w-3/4 bg-gray-200 p-5 rounded-lg shadow-lg">
                <h2 className='my-5 text-3xl bg-black text-white p-2 rounded-sm'>Todo List</h2>
                <Create />
            </div>
        </div>

    )
}

export default Home
