import axios from 'axios';
import { toast } from 'react-toastify';

function OtpForm({ buttonVisitorStyle, buttonText, navigate, setIsAuthenticated}){

    //permette di scorrere lungo gli input ogni volta che viene inserita una nuova cifra
    function goToNext(event, nextInputId) {
        const currentInput = event.target;
        if (currentInput && currentInput.value.length === currentInput.maxLength) {
            const nextInput = document.getElementById(nextInputId);
            if (nextInput) {
                nextInput.focus();
            }
        }
    }

    const phoneData = JSON.parse(sessionStorage.getItem('phoneData')) || null;
    
    //permette di tornare all'input precedente quando si preme backspace
    function goToPrevious(event, prevInputId) {
        const currentInput = event.target;
        
        if (currentInput && currentInput.value.length === 0 && event.key === 'Backspace') {
            const prevInput = document.getElementById(prevInputId);
            if (prevInput) {
                prevInput.focus();
            }
        }
    }

    const handleOtpSubmit = async (event) => {
        event.preventDefault();
        let otp = '';
        for (let i = 1; i <= 6; i++) {
            const input = document.getElementById(`input${i}`);
            if (input) {
                otp += input.value; //permette la costruzione della stringa otp finale.
            }
        }


        if(!phoneData){
        const prefixedNumber = sessionStorage.getItem('number');
        const data = {
            number: prefixedNumber,
            otp: otp
          };

          try {
            const response = await axios.post('http://localhost:5000/users/authenticate', data , { withCredentials: true });
            if (response.status === 200) {

                const responseData = response.data;
                if(responseData.isRegistered === true){
                    sessionStorage.setItem('isRegistered', 'true')
                    

                }
                else if(responseData.isRegistered === false){
                    sessionStorage.setItem('isRegistered', 'false')
                }

                const isLoggedResponse = await axios.get('http://localhost:5000/users/loggedin', { withCredentials: true });
                
                if (isLoggedResponse.status === 200) {
                    sessionStorage.setItem('isAuthenticated', 'true')
                    navigate('../OfferingGigs')
                } 
                else {
                    sessionStorage.setItem('isAuthenticated', 'false')
                  }
            } else {
                console.error('Errore durante la verifica:', response.status, response.statusText);
            }
          } catch (error) {
            toast.error("Il codice OTP inserito è errato.")
            console.error('Error submitting form:', error.response ? error.response.data : error.message);
          }
        }

        if (phoneData) {
            try {
                const response = await axios.post("http://localhost:5000/users/updateAccount", phoneData, { withCredentials: true });
        
                if (response.status === 200) {
                    const data1 = {
                        number: '+39' + phoneData.newPhoneNumber,
                    };
        
                    try {
                        const response2 = await axios.post('http://localhost:5000/users/verify', data1, { withCredentials: true });
                        
                        if (response2.status === 200) {
                            try {
                                const data2 = {
                                    number: '+39' + phoneData.newPhoneNumber,
                                    otp: otp
                                };
                                
                                const response3 = await axios.post('http://localhost:5000/users/authenticate', data2, { withCredentials: true });
                                
                                if (response3.status === 200) {
                                    try {
                                        sessionStorage.setItem('phoneData', null);
                                        const responseLogout = await axios.get('http://localhost:5000/users/logout', { withCredentials: true });
        
                                        if (responseLogout.status === 200) {
                                            setIsAuthenticated(false)
                                            sessionStorage.setItem("isRegistered", false)
                                            sessionStorage.setItem("isAuthenticated", false)
                                            toast.success("Il numero di telefono è stato cambiato correttamente. Effettuare nuovamente l'accesso.");
                                            navigate('/');
                                        } else {
                                            console.error('Errore durante il logout:', responseLogout.status, responseLogout.statusText);
                                        }
                                    } catch (error) {
                                        toast.error("Si è verificato un errore durante il logout.");
                                        console.error('Errore durante il logout:', error.response ? error.response.data : error.message);
                                    }
                                } else {
                                    console.error('Errore durante l\'autenticazione:', response3.status, response3.statusText);
                                }
                            } catch (error) {
                                toast.error("Il codice OTP inserito è errato.");
                                console.error('Errore durante l\'autenticazione OTP:', error.response ? error.response.data : error.message);
                            }
                        }
                    } catch (error) {
                        toast.error("Errore durante la verifica del numero di telefono.");
                        console.error('Errore durante la verifica del numero:', error.response ? error.response.data : error.message);
                    }
                }
            } catch (error) {
                toast.error("Errore durante l'aggiornamento del numero di telefono. Verifica di aver inserito correttamente il numero attuale");
                console.error('Errore durante l\'aggiornamento del numero:', error.response ? error.response.data : error.message);
            }
        }

    }

    return(
    <form className="HomepageFormOtp" onSubmit={handleOtpSubmit}>
        <div className="textContainerOtp">
            <div className="otpInputSpace">
                <input type="text" title="Inserisci una singola cifra tra 0 e 9." pattern="^[0-9]$" className="otpInput" id="input1" maxLength="1" onInput={(e) => goToNext(e, 'input2')} required/>
                <input type="text" title="Inserisci una singola cifra tra 0 e 9." pattern="^[0-9]$" className="otpInput" id="input2" maxLength="1" onInput={(e) => goToNext(e, 'input3')} onKeyDown={(e) => goToPrevious(e, 'input1')} required/>
                <input type="text" title="Inserisci una singola cifra tra 0 e 9." pattern="^[0-9]$" className="otpInput" id="input3" maxLength="1" onInput={(e) => goToNext(e, 'input4')} onKeyDown={(e) => goToPrevious(e, 'input2')} required/>
                <input type="text" title="Inserisci una singola cifra tra 0 e 9." pattern="^[0-9]$" className="otpInput" id="input4" maxLength="1" onInput={(e) => goToNext(e, 'input5')} onKeyDown={(e) => goToPrevious(e, 'input3')} required/>
                <input type="text" title="Inserisci una singola cifra tra 0 e 9." pattern="^[0-9]$" className="otpInput" id="input5" maxLength="1" onInput={(e) => goToNext(e, 'input6')} onKeyDown={(e) => goToPrevious(e, 'input4')} required/>
                <input type="text" title="Inserisci una singola cifra tra 0 e 9." pattern="^[0-9]$" className="otpInput" id="input6" maxLength="1" onKeyDown={(e) => goToPrevious(e, 'input5')} required/>
            </div>
        </div>

            

        <button action="submit" className="submitButton" style={buttonVisitorStyle}>{buttonText}</button>
    </form>
    )    
}
export default OtpForm