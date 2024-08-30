import {Link} from 'react-router-dom'
import returnIcon from '../images/return.png'
import "../styles/GoBack.css"

export function GoBack(){
    return(
      
        <div>
        <Link to='/'><img class="btn" src={returnIcon}/></Link>
        </div>
       
    )
}