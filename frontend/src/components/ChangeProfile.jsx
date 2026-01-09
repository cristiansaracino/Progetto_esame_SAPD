import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ChangeProfile({setButtonStatus, buttonStatus, notifySuccess, notifyError}) {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [userData, setUserData] = useState({
        nome: "",
        cognome: "",
        biografia: "",
    });

    const [phoneData, setPhoneData] = useState({
        oldPhoneNumber: "",
        newPhoneNumber: "",
        newPhoneNumberConferm: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handlePhoneChange = (e) => {
        const { name, value } = e.target;
        setPhoneData({
            ...phoneData,
            [name]: value,
        });
    };

    const handleDelete = async () => {
        try {
            await axios.post("http://localhost:5000/users/deleteUserData", {}, { withCredentials: true });
            sessionStorage.clear();
            navigate("/");
            notifySuccess("L'account è stato correttamente eliminato");
        } catch (error) {
            notifyError("L'account non è stato correttamente eliminato");
        }
    };

    const onChangeGeneralData = async (formData) => {
        try {
            await axios.post("http://localhost:5000/users/updateAccount", formData, { withCredentials: true });
            notifySuccess("Le generalità sono state correttamente aggiornate");
            showProfile();
        } catch (error) {
            switch (error.response.data.message) {
                case "Non c'è nulla da modificare":
                    toast.info("Non c'è nulla da modificare");
                    break;
                default:
                    toast.error('Si è verificato un errore sconosciuto.');
                    break;
            }
        }
    };

    const onChangePhoneData = async (event) => {
        event.preventDefault();
        if (phoneData.newPhoneNumber !== phoneData.newPhoneNumberConferm) {
            notifyError("Il nuovo numero di telefono e la conferma non coincidono");
            return;
        }
        else{
            sessionStorage.setItem('phoneData', JSON.stringify(phoneData));
            navigate('/otp');
        }

    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmitGeneralData = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();

        // Aggiunge il file solo se è stato selezionato
        if (selectedFile) {
            formDataToSend.append("fotoProfilo", selectedFile);
        }

        // Aggiunge le generalità
        formDataToSend.append("nome", userData.nome);
        formDataToSend.append("cognome", userData.cognome);
        formDataToSend.append("biografia", userData.biografia);

        // Resetta i campi delle generalità
        setUserData({
            nome: "",
            cognome: "",
            biografia: "",
        });

        // Invia il form con le generalità
        onChangeGeneralData(formDataToSend);
    };

    // viene definita questa funzione per permettere l'aggiornamento dei contenuti visualizzati sul profilo a seguito di un aggiornamento
    const showProfile = async () => {
        try {
          const response = await axios.get('http://localhost:5000/users/trovaUser',{ withCredentials: true });
          const response2 = await axios.get('http://localhost:5000/annunci/listingAnnunciUtente',{ withCredentials: true })
          const data = {
            utente: response.data.user,
            listaPropriAnnunci: response2.data
          };
  
          if(response.status === 200 && response2.status === 200){
            navigate('/myProfile', { state: { data }});
          }
        } catch (error) {
          notifyError("Per visualizzare il profilo devi prima pubblicare un annuncio!")
          console.error('Errore durante il recupero del profilo:', error);
        }
    }

    return (
        <div className="containerPage">
            <div className="flexContainer">
                <div className="containerProfile">
                    <button onClick={() => setButtonStatus(!buttonStatus)}>X</button>
                    <h1>Aggiorna il tuo profilo</h1>

                    {/* Form per generalità e foto profilo */}
                    <h2>Aggiorna le tue generalità:</h2>
                    <form onSubmit={handleSubmitGeneralData}>
                        <div>
                            <h3>Aggiorna la tua foto profilo:</h3>
                            <input type="file" className="fileFormSpace" onChange={handleFileChange} />
                        </div>
                        <div>
                            <h3>Inserisci il nuovo nome:</h3>
                            <input
                                type="text"
                                className="formSpace formDetails"
                                name="nome"
                                value={userData.nome}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <h3>Inserisci il nuovo cognome:</h3>
                            <input
                                type="text"
                                className="formSpace formDetails"
                                name="cognome"
                                value={userData.cognome}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <h3>Inserisci la nuova biografia:</h3>
                            <textarea
                                className="formSpace formDetails"
                                id="biografy"
                                name="biografia"
                                value={userData.biografia}
                                onChange={handleChange}
                            />
                        </div>
                        <button className="submitButton formDetails" type="submit">
                            Invia
                        </button>
                    </form>

                    <h2>Aggiorna il tuo numero di telefono:</h2>
                    <form onSubmit={onChangePhoneData}>
                        <input
                            type="tel"
                            placeholder="Inserisci il vecchio numero di telefono:"
                            name="oldPhoneNumber"
                            value={phoneData.oldPhoneNumber}
                            onChange={handlePhoneChange}
                            required pattern='[0-9]{9,10}' title='Il numero di telefono deve avere 9 o 10 cifre numeriche!'
                            className="formSpace formDetails"
                        />
                        <input
                            type="tel"
                            placeholder="Inserisci il nuovo numero di telefono:"
                            name="newPhoneNumber"
                            value={phoneData.newPhoneNumber}
                            required pattern='[0-9]{9,10}' title='Il numero di telefono deve avere 9 o 10 cifre numeriche!'
                            onChange={handlePhoneChange}
                            className="formSpace formDetails"
                        />
                        <input
                            type="tel"
                            placeholder="Conferma il nuovo numero di telefono"
                            name="newPhoneNumberConferm"
                            required pattern='[0-9]{9,10}' title='Il numero di telefono deve avere 9 o 10 cifre numeriche!'
                            value={phoneData.newPhoneNumberConferm}
                            onChange={handlePhoneChange}
                            className="formSpace formDetails"
                        />
                        <button className="submitButton formDetails" type="submit">
                            Invia
                        </button>
                    </form>

                    {/* Pulsante per eliminare profilo */}
                    <h2>Cancella tutti i tuoi dati:</h2>
                    <button id="deleteButton" onClick={handleDelete}>
                        Elimina il tuo profilo
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChangeProfile;
