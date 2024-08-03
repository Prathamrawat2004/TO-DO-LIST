import React, { useState } from 'react'
import Update from './Update';
import axios from 'axios';
const Strip = ({ item, dark, onDelete }) => {
    // opening update modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        console.log("modal opened");
        setIsModalOpen(true);
    }

    const closeModal = () => {
        console.log("modal closed");
        setIsModalOpen(false);
    }

    // updating the note
    const Updatenote = async (title, desc) => {
        try {
            const updated = await axios.put(`http://localhost:3000/Notes/update/${item._id}`, { title, desc }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("note updated", updated.data)
        } catch (error) {
            console.log("failed to update", error);
        }
    };

    // deleting the note(from backend)
    const deleteNote = async () => {
        try {
            await axios.delete(`http://localhost:3000/Notes/delete/${item._id}`);
            console.log("note deleted");
            onDelete(item._id);
        } catch (error) {
            console.log("failed to delete", error);
        }
    };


    return (
        <>
            <div className={`strip w-50 mx-auto mt-3 container ${dark ? 'strip_dark' : ''}`} >
                <div className="strip-body d-flex justify-content-between">
                    <div>
                        <h5 className="strip-title">"{item.title}"</h5>
                        <p className="strip-text">{item.desc}</p>
                    </div>
                    <div>
                        <button className="btn btn-warning mt-2 mx-2" onClick={openModal}>Update</button>
                        <button className="btn btn-danger mt-2" onClick={deleteNote}>Delete</button>
                    </div>
                </div>

            </div>
            {/* opening update modal */}
            {isModalOpen && <Update Title={item.title}
                Desc={item.desc}
                Onupdate={Updatenote}
                OnClose={closeModal}
            />}
        </>
    )
}

export default Strip;