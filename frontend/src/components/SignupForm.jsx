import axios from "axios"
import { useState } from "react"
import { FaPhoneAlt } from "react-icons/fa"
import { GiGardeningShears } from "react-icons/gi"
import SearchCityInput from "./SearchCityInput"

function SignupForm({formData, buttonGigStyle, buttonText, navigate, handleChange, setCitta, notifyError}){
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const prefixedNumber = addPrefix(phoneNumber);
        
        sessionStorage.setItem('città', formData.città);
        sessionStorage.setItem('lavoro', formData.lavoro);
        sessionStorage.setItem('number', prefixedNumber);
    
    
        const data = {
            number: prefixedNumber
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
            const response = await axios.post('http://localhost:5000/users/verify', data, { withCredentials: true });
      
            if (response.status === 200) {
              navigate('/otp');
            } else {
              console.error('Errore durante la verifica:', response.status, response.statusText);
            }
          } catch (error) {
            console.error('Error submitting form:', error.response ? error.response.data : error.message);
          }
    }
    
    function addPrefix(phoneNumber) {
        const prefix = '+39';
        return `${prefix}${phoneNumber}`;
    }

    return(
        <form className="HomepageForm" onSubmit={handleSubmit}>
            <div className="textContainer">
                <div >
                    <FaPhoneAlt className="icon" />
                    <input type="tel" placeholder="Inserisci numero:" className="formSpace" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required pattern='[0-9]{9,10}' title='Il numero di telefono deve avere 9 o 10 cifre numeriche!'/>
                </div>

                <div>
                    <SearchCityInput setCitta={setCitta}/>
                </div>
                <div>
                    <GiGardeningShears className="icon" />
                    <input type="text" placeholder="Inserisci Lavoretto da offrire:" list="jobs" className="formSpace" name="lavoro" value={formData.lavoro} onChange={handleChange} required/>
                    <datalist id="jobs">
                        <option value="Fotografo" />
                        <option value="Tutor per ripetizioni" />
                        <option value="Giardiniere" />
                        <option value="Baby-sitter" />
                        <option value="Pet-sitter" />
                    </datalist>
                </div>
            </div>

            

            <button action="submit" className="submitButton" style={buttonGigStyle}>{buttonText}</button>
        </form>
    )
}
export default SignupForm