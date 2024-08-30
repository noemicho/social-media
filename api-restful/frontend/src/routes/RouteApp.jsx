import { Routes, Route } from "react-router-dom"
import { Home } from "../pages/Home"
import { Login } from "../pages/Login"
import { Profile } from "../pages/Profile"
import { Register } from "../pages/Register"
import { AddPost }  from "../pages/AddPost"

export function RouteApp(){
    return(
        <Routes>
            <Route path='/' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/home' element={<Home />}/>
            <Route path='/profile' element={<Profile />}/>      
            <Route path='/addPost' element={<AddPost />}/>
        </Routes>
    )
}