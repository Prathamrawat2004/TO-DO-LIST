import React from 'react'
import { useState, useEffect } from 'react';
const Update = ({  Title, Desc, Onupdate, OnClose }) => {
    const [title, setTitle] = useState( Title );
    const [desc, setDesc] = useState( Desc );

    // showing initial content
    // useEffect(() => {
    //     setTitle(title);
    //     setDesc(desc);
    // }, [title, desc]);

    // saving my data
    const handleSave = () => {
       
        Onupdate(title,desc);
        // saving the content after editing
        OnClose();
        window.location.reload();
    }

    return (
        <div className={`container border shadow rounded d-flex flex-column justify-content-center align-items-center w-25 mt-5`}>
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
                <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>

            </div>
        </div>
    )
}

export default Update;