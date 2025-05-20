import React, { useState } from 'react'
import axios from 'axios';

function Create(props) {

    const [task, setTask] = useState('');

    const handleadd = () => {
        if (task === '') {
            alert('Please enter a task');
        }
        else {
            axios.post("http://localhost:3001/add", { task: task })
                .then(result => {
                    console.log(result.data);
                    props.handleAdd(result.data);
                    setTask('');
        })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className='flex gap-3'>
            <input type="text" placeholder='enter the task' className='border h-10 w-80 rounded-full px-4 py-2' value={task} onChange={(e) => setTask(e.target.value)} />
            <button type="submit" className='bg-black text-white rounded-full px-4 py-2' onClick={handleadd}>add</button>
        </div>
    )
}

export default Create   