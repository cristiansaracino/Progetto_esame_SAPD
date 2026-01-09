import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import OtpForm from "./OtpForm";
import SearchForm from "./SearchForm";
import PartialProfileJobForm from "./PartialProfileJobForm";
import CompleteProfileJobForm from "./CompleteProfileJobForm";
import SignupForm from "./SignupForm";

const buttonVisitorStyle = {    
    backgroundColor: 'rgb(221, 235, 237)',               
  };

const buttonGigStyle ={
    backgroundColor: 'rgba(251, 220, 192, 0.996)', 
}

function HomepageForm({ formType,buttonText, notifySuccess, notifyError,setIsAuthenticated}){
    
    const navigate = useNavigate();
    const [isAuthenticated,setIsAuthenticated2] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [formData, setFormData] = useState({
      fotoProfilo: '',
      nome: '',
      cognome: '',
      città: '',
      lavoro: '',
      titolo: '',
      descrizione: '',
      tariffa: '',
      orario: '',
    });

    // gestisce cambiamenti degli input: associa a un campo del formData, con un dato name, il value inserito dall'utente.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    //gestisce la modifica della città nel SearchCityInput
    const setCitta = (e) => {
        setFormData({
            ...formData,
            città: e
            
        });
    }
    //se l'utente ha compilato il form preliminare, il formData viene compilato con i dati precedentemente salvati nel sessionStorage
    useEffect(() => {
        setFormData({
            ...formData,
            città: sessionStorage.getItem('città'),
            lavoro: sessionStorage.getItem('lavoro')
        });

        //vengono definiti nel sessionStorage isAuthenticated e isRegistered per il rendering condizionale dei form, che deve persistere anche a seguito di aggiornamenti della pagina
        //isAuthenticated === true indica che l'utente ha correttamente effettuato l'accesso con le proprie credenziali
        //isRegistered === true indica che l'utente ha completato il proprio profilo
        if(!sessionStorage.getItem('isAuthenticated')){
            sessionStorage.setItem('isAuthenticated', false)
        }
        setIsAuthenticated2(sessionStorage.getItem('isAuthenticated') === 'true');
        if(!sessionStorage.getItem('isRegistered')){
            sessionStorage.setItem('isRegistered', false)
        }
        setIsRegistered(sessionStorage.getItem('isRegistered') === 'true');
    }, [isRegistered]);
    
    //gestione dell'invio del form per un utente che non ha ancora completato il proprio profilo
    //due step: aggiornamento del profilo e pubblicazione dell'annuncio
    const handleisNotRegisteredSubmit = async (formDataToSend) => {
        try {
            // Invia il form per aggiornare il profilo
            const response1 = await axios.post('http://localhost:5000/users/updateAccount', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
    
            if (response1.status === 200) {
                sessionStorage.setItem('isRegistered', true)
                setIsRegistered(true)
                sessionStorage.removeItem('città')
                sessionStorage.removeItem('lavoro')                
                notifySuccess("L'account è stato correttamente aggiornato");
            }
    
            // Invia il form per creare l'annuncio
            const annuncioData = {
                città: formData.città,
                lavoro: formData.lavoro,
                titolo: formData.titolo,
                descrizione: formData.descrizione,
                tariffa: formData.tariffa,
                orario: formData.orario,
            };
            //viene effettuato un controllo sulla validità del lavoro
            const lavoriDisponibili = [
                "Fotografo",
                "Tutor per ripetizioni",
                "Giardiniere",
                "Baby-sitter",
                "Pet-sitter"
            ];
    
            if(!lavoriDisponibili.includes(formData.lavoro)){
                notifyError("Il lavoro inserito non è valido")
                return
            }
    
            const response2 = await axios.post('http://localhost:5000/annunci/createAnnuncio', annuncioData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
    
            if (response2.status === 201) {
                notifySuccess("L'annuncio è stato correttamente pubblicato")
                sessionStorage.removeItem('città')
                sessionStorage.removeItem('lavoro')
                setFormData({...formData, città: '', lavoro: '' });
            }
        } catch (error) {
            // Log più dettagliato dell'errore
            if (error.response) {
                if (error.response.config.url.includes('/users/updateAccount')) {
                    // Errore durante l'aggiornamento dell'account
                    notifyError("L'account non è stato correttamente aggiornato");  // Chiama notifica di errore per l'aggiornamento dell'account
                } else if (error.response.config.url.includes('/annunci/createAnnuncio')) {
                    // Errore durante la creazione dell'annuncio
                    notifyError("L'annuncio non è stato correttamente pubblicato. Controlla i dati inseriti.");  // Chiama notifica di errore per l'annuncio
                }
                console.error('Errore durante l\'invio del form:', error.response.status, error.response.data);
            }
        }
    };
    //gestione dell'invio del form per un utente che ha completato il proprio profilo
    const handleisRegisteredSubmit = async (event) =>{
        event.preventDefault()
        const annuncioData = {
            città: formData.città,
            lavoro: formData.lavoro,
            titolo: formData.titolo,
            descrizione: formData.descrizione,
            tariffa: formData.tariffa,
            orario: formData.orario,
        };

        const lavoriDisponibili = [
            "Fotografo",
            "Tutor per ripetizioni",
            "Giardiniere",
            "Baby-sitter",
            "Pet-sitter"
        ];

        if(!lavoriDisponibili.includes(formData.lavoro)){
            notifyError("Il lavoro inserito non è valido")
            return
        }

        try {
            const response = await axios.post('http://localhost:5000/annunci/createAnnuncio', annuncioData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
            if (response.status === 201) {
                notifySuccess("L'annuncio è stato correttamente pubblicato")
                sessionStorage.removeItem('città')
                sessionStorage.removeItem('lavoro')
                setFormData({...formData, città: '', lavoro: '', titolo: '', descrizione: '', tariffa: '', orario: ''});
            }
        } catch (error) {
            notifyError("L'annuncio non è stato correttamente pubblicato. Controlla i dati inseriti.")
        }        
    }
    
    
    
    //rendering del form da compilare sulla base delle variabili precedentemente definite
    //SignupForm è il form iniziale della pagina "Offri un lavoretto", che viene compilato quando l'utente non ha ancora effettuato l'accesso
    //CompleteProfileJobForm è il form che viene visualizzato nel caso in cui l'utente sia autentificato e abbia completato il profilo
    //PartialProfileJobForm è il form che viene visualizzato nel caso in cui l'utente sia autentificato e non abbia completato il profilo
    //SearchForm è il form per la ricerca dei lavoretti nella pagina "Cerca un lavoretto"
    //OtpForm è il form per l'inserimento del codice OTP.
    return(
        <div>
            {formType === 'offer'  && isAuthenticated===false && (
                <SignupForm  notifyError={notifyError} setCitta={setCitta} navigate={navigate} handleChange={handleChange} buttonText={buttonText} formData={formData} buttonGigStyle={buttonGigStyle}/>
            )}

            {formType === 'offer' && isAuthenticated===true && isRegistered===true &&(
                <CompleteProfileJobForm notifyError={notifyError} setCitta={setCitta} handleChange={handleChange} handleisRegisteredSubmit={handleisRegisteredSubmit} buttonText={buttonText} formData={formData} buttonGigStyle={buttonGigStyle}/>
            )}

            {formType === 'offer' && isAuthenticated===true && isRegistered===false &&(
                <PartialProfileJobForm notifyError={notifyError} setFormData={setFormData} setCitta={setCitta} handleisNotRegisteredSubmit={handleisNotRegisteredSubmit} formData={formData} handleChange={handleChange} buttonGigStyle={buttonGigStyle} buttonText={buttonText}/>
            )}

            {formType === 'search' && (
                <SearchForm  notifyError={notifyError} formData={formData} buttonText={buttonText} buttonVisitorStyle={buttonVisitorStyle}/>
            )} 

            {formType === 'otp' && (
                <OtpForm  buttonText={buttonText} setIsAuthenticated={setIsAuthenticated} buttonVisitorStyle={buttonVisitorStyle} navigate={navigate}/>
            )}     
        </div>
    )
}
export default HomepageForm