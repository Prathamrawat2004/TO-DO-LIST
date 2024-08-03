import React, { useState } from 'react';

const Modal = ({ Onclose, dark, addnotes }) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const handleAdd = () => {
        const note = { title, desc };
        addnotes(note);
        Onclose();
    };

    return (
        <>
            <div className={`container border shadow rounded d-flex flex-column justify-content-center align-items-center w-25 mt-5 modalPos z-index-1  ${dark ? 'text-white' : 'text-black'}`}>
                <div className="title mb-2">
                    <h3>Add Tasks</h3>
                </div>
                <div className="title mb-2">
                    <input
                        type="text"
                        placeholder="add task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="description mb-2">
                    <textarea
                        name="description"
                        placeholder="Add your tasks..."
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                </div>
                <div className="send mb-2">
                    <button className="btn btn-primary" onClick={handleAdd}>ADD</button>
                    <button className="btn btn-danger mx-2" onClick={Onclose}>CLOSE</button>
                </div>
            </div>
            
            {/* blurring */}
            < div className='back position-absolute w-100 h-100 z-index-0 ' />


        </>
    );
};

export default Modal;