import {Link} from 'react-router-dom'
import refresh from '../images/refresh-icon.png'
import "../styles/GoBack.css"

export function GoBack(){
    return(
      
        <div>
        <Link to='/'><img class="btn" src={refresh}/></Link>
        </div>
       
    )
}