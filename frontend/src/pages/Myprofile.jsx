import { useState, useEffect } from 'react'
import LoginPage from '../components/LoginPage'
import {useLocation, useNavigate} from 'react-router-dom'
import Profilepage from '../components/Profilepage'

function Myprofile({buttonState, toggleButtonState, notifyError, notifySuccess}){

    const location = useLocation();
    const [utente, setUtente] = useState(location.state?.data?.utente || {});
    const [listaPropriAnnunci, setListaPropriAnnunci] = useState(location.state?.data?.listaPropriAnnunci || []);

    useEffect(() => {
        // Aggiorna i dati se sono presenti nello stato
        if (location.state && location.state.data) {
          setUtente(location.state.data.utente || {});
          setListaPropriAnnunci(location.state.data.listaPropriAnnunci || [])
        }
      }, [location])
    
    return(
        <>
        <div className={`overlay ${buttonState ? 'active' : ''}`}>
        </div>


        <Profilepage utente={utente} listaAnnunci={listaPropriAnnunci} notifyError={notifyError} notifySuccess={notifySuccess} />


        <LoginPage toggleButtonState={toggleButtonState} buttonState={buttonState}/>
        </>
    )
}
export default Myprofile