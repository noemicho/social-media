import { Routes, Route } from "react-router-dom"
import { Home } from "../pages/Home"
import { Login } from "../pages/Login"
import { Profile } from "../pages/Profile"
import { Register } from "../pages/Register"

export function RouteApp(){
    return(
        <Routes>
            <Route path='/home' element={<Home />}/>
            <Route path='/' element={<Login />}/>
            <Route path='/profile' element={<Profile />}/>
            <Route path='/register' element={<Register />}/>
        </Routes>
    )
}