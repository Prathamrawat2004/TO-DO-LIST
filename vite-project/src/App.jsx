import React from "react";
import Navbar from "./components/Navbar";
import {  Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import {Toaster} from "react-hot-toast";







function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
      </Routes>
      <Toaster/>
    


    </>
  )
}

export default App;
