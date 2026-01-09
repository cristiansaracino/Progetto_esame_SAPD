import { useState } from "react";
import { GiGardeningShears } from "react-icons/gi";
import { FaRegIdCard } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa";
import SearchCityInput from "./SearchCityInput";

function PartialProfileJobForm({ notifyError, handleisNotRegisteredSubmit, formData, handleChange, buttonGigStyle, buttonText, setCitta, setFormData }) {
    const [step, setStep] = useState(1);
    const [selectedFile, setSelectedFile] = useState({});

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };


    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('fotoProfilo', selectedFile);
        for (let key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        setFormData({
            fotoProfilo: '',
            nome: '',
            cognome: '',
            città: '',
            lavoro: '',
            titolo: '',
            descrizione: '',
            tariffa: '',
            orario: '',
        })
        handleisNotRegisteredSubmit(formDataToSend);
    };

    return (
        <form className="HomepageForm" onSubmit={handleSubmit}>
            {step === 1 && (
                <div className="textContainer">
                    <input type="file" onChange={handleFileChange} className="fileFormSpace" id="fileFormSpaceGigs" required title="Aggiungi un'immagine di profilo." />
                    <FaRegIdCard className="icon" />
                    <input type="text" placeholder="Nome" name="nome" value={formData.nome} onChange={handleChange} className="formSpace" required title="Aggiungi un nome." />
                    <FaRegIdCard className="icon" />
                    <input type="text" placeholder="Cognome" name="cognome" value={formData.cognome} onChange={handleChange} className="formSpace" required title="Aggiungi un cognome." />

                    <div>
                        <SearchCityInput notifyError={notifyError} setCitta={setCitta} formData={formData} />
                    </div>

                    <GiGardeningShears className="icon" />
                    <input type="text" placeholder="Inserisci Lavoretto da offrire:" list="jobs" className="formSpace" name="lavoro" value={formData.lavoro} onChange={handleChange} required title="Inserisci la tipologia di lavoro." />
                    <datalist id="jobs">
                        <option value="Fotografo" />
                        <option value="Tutor per ripetizioni" />
                        <option value="Giardiniere" />
                        <option value="Baby-sitter" />
                        <option value="Pet-sitter" />
                    </datalist>
                    <button type="button" onClick={nextStep} id="nextButton">Avanti&gt;</button>
                </div>
            )}

            {step === 2 && (
                <div>
                    <FaDatabase className="icon" />
                    <input type="text" placeholder="Inserisci titolo dell'annuncio" name="titolo" value={formData.titolo} onChange={handleChange} className="formSpace" required title="Inserisci il titolo dell'annuncio" />
                    <FaDatabase className="icon" />
                    <textarea id="description" placeholder="Inserisci descrizione dell'annuncio" name="descrizione" value={formData.descrizione} onChange={handleChange} className="formSpace" required title="Inserisci la descrizione dell'annuncio" />
                    <FaDatabase className="icon" />
                    <input type="number" placeholder="Inserisci tariffa oraria:" name="tariffa" value={formData.tariffa} onChange={handleChange} className="formSpace" required title="Inserisci una tariffa oraria" />
                    <FaDatabase className="icon" />
                    <input type="text" placeholder="Inserisci orario di disponibilità:" name="orario" value={formData.orario} onChange={handleChange} className="formSpace" required title="Inserisci un orario di disponibilità indicativo" />
                    <button type="button" onClick={prevStep} id="prevButton">&lt;Indietro</button>
                    <button type="submit" className="submitButton" style={buttonGigStyle}>{buttonText}</button>
                </div>
            )}
        </form>
    );
}

export default PartialProfileJobForm;

