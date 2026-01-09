import {Link, useLocation} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from 'react';


function Navbar({ toggleButtonState, notifySuccess, notifyError}) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      const authStatus = sessionStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(authStatus);
    }, [sessionStorage.getItem('isAuthenticated')]);

    //gestisce lo scorrimento del menù a tendina laterale quando si preme il tasto "Accedi"
    const handleClick = (event) => {
      event.preventDefault();
      toggleButtonState();
    }
    //permette di effettuare il logout quando si preme su "Logout"
    const handleLogout = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.get('http://localhost:5000/users/logout',{ withCredentials: true });
        
        if (response.status === 200) {
        sessionStorage.clear()
        notifySuccess("Il logout è stato effettuato correttamente");
        navigate('/'); //si torna alla pagina "Cerca un Lavoretto"
        } else {  
          console.error('Errore durante la verifica:', response.status, response.statusText);
        }
        }catch (error) {
          notifyError("Si è verificato un errore");
          console.error('Error submitting form:', error.response ? error.response.data : error.message);
        }
    }
  

    //permette la visualizzazione del proprio profilo (accessibile solo se è stato pubblicato almeno un annuncio)
    const showProfile = async () => {
      if(location.pathname !== '/myProfile'){
      try {
        const response = await axios.get('http://localhost:5000/users/trovaUser',{ withCredentials: true });
        const response2 = await axios.get('http://localhost:5000/annunci/listingAnnunciUtente',{ withCredentials: true })
        const data = {
          utente: response.data.user,
          listaPropriAnnunci: response2.data
        };

        if(response.status === 200 && response2.status === 200){
            navigate('/myProfile', { state: { data } });
          }
      } catch (error) {
        notifyError("Per visualizzare il profilo devi prima pubblicare un annuncio!")
      }
    }else{
      return
    }
    }

    return(
      <nav className="container">
        <ul className="navbar">
          <li id="logo"><Link to="/">GIGS</Link></li>

          <li className = "centralContainer">
            <Link to="/" className='navbarLink'>Cerca un lavoretto</Link>
            <Link to="/offeringGigs" className='navbarLink'>Offri un lavoretto</Link>
          </li>


          {isAuthenticated === false && (
          <Link to="#" id="login" onClick={handleClick}>Accedi</Link>
          )}
              
          {isAuthenticated === true && (
            <div class="dropdown">
              <button id="loginbtn"><CgProfile color='forestgreen'/></button>
              <div class="dropdown-content">
                <Link to="#" onClick={showProfile} >Profilo</Link>
                <Link to="#" onClick={handleLogout}>Logout</Link>
              </div>
            </div>
          )}
        </ul>
      </nav>
    )
}

export default Navbar