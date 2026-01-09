import {useNavigate } from "react-router-dom"
import { FaPaperPlane } from "react-icons/fa";
import { useState } from "react";

function AdDetails({handleClick, annuncio}){
    const user = annuncio.userId || {}
    const [contactButtonStatus, setContactButtonStatus] = useState(false)

    const navigate = useNavigate();

    const viewProfile = () =>{
        handleClick()
        navigate('/profile', { state: { annuncio: annuncio } })
    }

    return(
        <div className='cardpageDetailsContainer'>
        <div className='firstColumn'>
            <h1 className='cardpageDetailsText'>{annuncio.titolo}</h1>
            <p className="adUser">Annuncio di <a path="" onClick={viewProfile}><b>{user.nome ? `${user.nome} ${user.cognome}` : "Utente"}</b></a></p>
            <div className="imageContainer">
            <img src={`http://localhost:5000${user.profileImageUrl || '/path/to/default-image.jpg'}`} alt="Foto Profilo" />
            </div>
            <h2>Descrizione dell'annuncio</h2>
            <p>{annuncio.descrizione}</p>
        </div>
        <div className='secondColumn'>
            <div className='asideBox'>
                <div>
                    <h3>Informazioni aggiuntive:</h3>
                    <p>Città: {annuncio.città}</p>
                    <p>Fascia oraria di disponibilità:{annuncio.orario}</p>
                    <p>Tariffa oraria: &euro;{annuncio.tariffa}</p>
                </div>
                <div>
                    <FaPaperPlane className="iconButton"/>
                    {contactButtonStatus === false && (
                        <button className='buttonInfoCard' onClick={() => setContactButtonStatus(true)}>Contatta</button>
                    )}
                        
                    {contactButtonStatus === true && (
                        <button className='buttonInfoCard' onClick={() => setContactButtonStatus(false)}>{user.number}</button>
                    )}
                </div>
            </div>
        </div>
    </div>
    )
}
export default AdDetails