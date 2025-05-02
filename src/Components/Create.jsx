import React from 'react'

function Create(){
    return(
        <div className='flex gap-3'>
            <input type="text" placeholder='enter the task' className='border h-10 w-80 rounded-full px-4 py-2'/>
            <button type="submit" className='bg-black text-white rounded-full px-4 py-2'>add</button>
        </div>
    )
}

export default Create   