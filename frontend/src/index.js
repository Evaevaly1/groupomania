import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Home from "./pages/home/Home";
import NewPost from "./pages/newpost/NewPost";
import ModifPost from "./pages/crudPost/ModifPost";
import GuardedRoute from "./utils/GuardedRoute";
import {AuthProvider} from "./utils/AuthContext";
import {UserProvider} from "./utils/UserContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <UserProvider>
            <React.StrictMode>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<SignIn/>}/>
                        <Route exact path="/signup" element={<SignUp/>}/>
                        <Route exact path="/home" element={<GuardedRoute/>}>
                            <Route exact path="/home" element={<Home/>}></Route>
                        </Route>
                        <Route exact path="/new-post" element={<GuardedRoute/>}>
                            <Route exact path="/new-post" element={<NewPost/>}/>
                        </Route>
                        <Route exact path="/modif-post/:id" element={<GuardedRoute/>}>
                            <Route exact path="/modif-post/:id" element={<ModifPost/>}/>
                        </Route>
                    </Routes>
                </Router>
            </React.StrictMode>
        </UserProvider>
    </AuthProvider>

);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
