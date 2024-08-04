import React, { useEffect, useState } from 'react';
import { FaMoon } from "react-icons/fa";
import { CiSun } from "react-icons/ci";
import Modal from "./modal";
import Strip from './Strip';
import Login from './Login';
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';


const Navbar = () => {
    const [authUser, setAuthUser] = useAuth();
    const navigate = useNavigate();
    // Theme changing function
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        document.body.style.backgroundColor = darkMode ? 'black' : 'white';
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    // Opening and closing modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const openModal = () => {
        console.log("modal opened");
        setIsModalOpen(true);
    }

    const closeModal = () => {
        console.log("modal closed");
        setIsModalOpen(false);
    }

    const openLogin = () => {
        setIsLogin(true);
    }

    const handleAddButtonClick = () => {
        if (authUser) {
            navigate('/');
            openModal();
        } else {
            navigate('/signup');
        }
    };



    // Receiving the notes
    const [Notes, setNotes] = useState([]);
    useEffect(() => {
        const getNotes = async () => {
            try {
                const res = await axios.get("http://localhost:3000/Notes");
                setNotes(res.data); // Corrected state update
            } catch (error) {
                console.log(error);
            }
        }
        getNotes();
    }, []);

    // Similarly creating a function to add notes
    const addNotes = async (note) => {
        try {
            const newNote = await axios.post("http://localhost:3000/Notes/add", JSON.stringify(note), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log("Note added successfully", note);
            setNotes((prevNotes) => [...prevNotes, newNote.data]);

        } catch (error) {
            console.log(error);
        }
    };

    // Deleting a note(from fontend or ui)
    const deleteNote = (id) => {
        setNotes((prevNotes) => prevNotes.filter(note => note._id !== id));
    };

    // creating a searched based input
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const filteredNotes = Notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );



    return (
        <>
            <nav className="navbar navbar-expand-lg bg-warning">
                <div className="container d-flex justify-content-between items">
                    <div className="d-flex justify-content-center align-items-center item-1">
                        <div className='btn btn-light border-dark navbar-brand '>
                            <Link to="/" className='custom-link black'>TO-DO LIST</Link>
                        </div>
                        <div className='mx-2 moon' onClick={toggleTheme}>
                            {darkMode ? <CiSun /> : <FaMoon />}
                        </div>
                    </div>

                    <div className='d-flex align-items-center item-2'>
                        <input type="search" className='px-2 py-2 mx-2 rounded' placeholder='search notes...' onChange={handleSearchChange} />
                        <button className='btn btn-danger add' onClick={handleAddButtonClick} >Add</button>
                        {authUser ? (
                            <Logout />
                        ) : (
                            <div className='btn btn-primary mx-2' onClick={openLogin}>
                                <span>LOGIN</span>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Passed prop to modal */}
            {isModalOpen && <Modal Onclose={closeModal} dark={darkMode} addnotes={addNotes} />}
            {isLogin && <Login dark={darkMode} />}

            {/* Showing tasks on UI */}
            <div>
                {
                    (searchTerm ? filteredNotes : Notes).map((item) => (
                        <Strip key={item._id} item={item} dark={darkMode} onDelete={deleteNote} />
                    ))
                }
            </div>
        </>
    );
};

export default Navbar;
