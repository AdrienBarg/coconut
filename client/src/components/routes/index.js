import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import NotFound from '../../pages/NotFound';
import CommentCaMarche from '../../pages/CommentCaMarche';
import NavBar from '../NavBar';

const index = () => {
    return (
        <div>
            <Router>
            <NavBar />
                    <div className="main-container">
                <Routes>
                    <Route exact path="/" element={<Home/>}></Route>
                    <Route exact path="/profil" element={<Profil/>}></Route>
                    <Route exact path="/profil/login" element={<Login/>}></Route>
                    <Route exact path="/profil/register" element={<Register/>}></Route>
                    <Route exact path="/comment-ca-marche" element={<CommentCaMarche/>}></Route>
                    <Route path="*" element={<NotFound/>}></Route>
                </Routes>
                    </div>
            </Router>
        </div>
    );
};

export default index;