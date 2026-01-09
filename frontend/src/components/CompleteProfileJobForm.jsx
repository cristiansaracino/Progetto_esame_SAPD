import { GiGardeningShears } from "react-icons/gi"
import SearchCityInput from "./SearchCityInput"
import { useState } from "react";

function CompleteProfileJobForm({formData, buttonGigStyle, buttonText, setCitta, handleisRegisteredSubmit, handleChange}){

    const [step, setStep] = useState(1);

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    return(               
        <form className="HomepageForm" onSubmit={handleisRegisteredSubmit}>
            <div className="textContainer">
                {step === 1 && (
                    <>
                    <div>
                        <SearchCityInput setCitta={setCitta} formData={formData}/>
                    </div>
                    <div>
                        <GiGardeningShears className="icon" />
                        <input type="text" placeholder="Inserisci Lavoretto da offrire:"  name="lavoro" onChange={handleChange} value={formData.lavoro} list="jobs" className="formSpace"/>
                        <datalist id="jobs">
                            <option value="Fotografo" />
                            <option value="Tutor per ripetizioni" />
                            <option value="Giardiniere" />
                            <option value="Baby-sitter" />
                            <option value="Pet-sitter" />
                        </datalist>
                        <button type="button" onClick={nextStep} id="nextButton">Avanti&gt;</button>
                    </div>
                    </>
                )}
                {step === 2 && (
                    <>
                        <input type="text" placeholder="Inserisci titolo dell'annuncio:" name="titolo" onChange={handleChange} value={formData.titolo} className="formSpace"/>
                        <textarea id="description" placeholder="Inserisci descrizione dell'annuncio:" name="descrizione" onChange={handleChange}  value={formData.descrizione} className="formSpace"/>
                        <input type="number" placeholder="Inserisci tariffa oraria:" onChange={handleChange} name="tariffa"  value={formData.tariffa} className="formSpace"/>
                        <input type="text" placeholder="Inserisci orario di disponibilità:" onChange={handleChange} name="orario" value={formData.orario} className="formSpace"/>
                        <button type="button" onClick={prevStep} id="prevButton">&lt;Indietro</button>
                        <button type="submit" className="submitButton" style={buttonGigStyle}>{buttonText}</button>
                    </>
                )}                                    
            </div>
        </form>
    )
}
export default CompleteProfileJobForm