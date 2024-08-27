import homeIcon from '../images/home-icon.png'
import addPostIcon from '../images/add-post-icon.png'
import profileIcon from '../images/profile-icon.png'
import '../styles/NavBar.css'

import {Link} from 'react-router-dom'

export function NavBar(){
    return(
        <>
            <div className='menu'>
                <Link to='/'><img src={homeIcon} className='hover' alt="home-icon"/></Link>
                <Link to='/addPost'> <img src={addPostIcon}  className='hover' alt="add-post-icon"/></Link>
                <Link to='/profile'><img src={profileIcon} className='hover' alt="profile-icon"/></Link>       
            </div>

        </>
    )
}