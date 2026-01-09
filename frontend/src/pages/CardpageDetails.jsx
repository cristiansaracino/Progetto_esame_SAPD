import { useState, useEffect } from 'react'
import LoginPage from '../components/LoginPage'
import {useLocation, useNavigate} from 'react-router-dom'
import Profilepage from '../components/Profilepage'
import AdDetails from '../components/AdDetails'
import axios from 'axios'

function CardpageDetails({handleClick, toggleButtonState, buttonState}){

    const location = useLocation();
    const annuncio = location.state?.annuncio || {};
    const [listaAnnunci, setListAnnunci] = useState({});


    const [hasClickedProfile, setHasClickedProfile] = useState(() => {
        return sessionStorage.getItem('hasClickedProfile') === 'true';
    });


    const userId = annuncio.userId;
    const data = {
        userId: userId
    };
    
    const listAnnunci = async () => {
        try {
            const response = await axios.get('http://localhost:5000/annunci/listingAnnunciVisitatore', {
                params: data
            });
            
            if (response.status === 200) {
                setListAnnunci(response.data);
            }
        } catch (error) {
            console.error('Errore durante il caricamento degli annunci:', error);
        }
    };
    

    useEffect(() => {
        sessionStorage.setItem('hasClickedProfile', hasClickedProfile);
    }, [hasClickedProfile]);

    useEffect(() => {
        const fetchAnnunci = async () => {
            if (location.pathname === '/profile') {
                await listAnnunci();
                setHasClickedProfile(true);
            } else {
                setHasClickedProfile(false);
            }
        };
        fetchAnnunci();
    }, [location.pathname, location.state]);


    return(
        <>
        <div className={`overlay ${buttonState ? 'active' : ''}`}>
        </div>

        {hasClickedProfile === false && (
            <AdDetails handleClick={handleClick} annuncio={annuncio} />
        )}

        {hasClickedProfile === true && (
            <Profilepage annuncio={annuncio} listaAnnunci={listaAnnunci}/>
        )}
        <LoginPage toggleButtonState={toggleButtonState} buttonState={buttonState}/>
        </>
    )
}
export default CardpageDetails