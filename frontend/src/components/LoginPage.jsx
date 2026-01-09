import React, { useState } from 'react'
import { FaPhoneAlt } from "react-icons/fa"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function LoginPage({toggleButtonState, buttonState}){
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();
  const handleClick = (event) => {
    event.preventDefault();
    toggleButtonState();
  };

  function addPrefix(phoneNumber) {
    const prefix = '+39';
    return `${prefix}${phoneNumber}`;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const prefixedNumber = addPrefix(phoneNumber);
    sessionStorage.setItem('number', prefixedNumber);
    const data = {
        number: prefixedNumber
      };
  
      try {
        const response = await axios.post('http://localhost:5000/users/verify', data, { withCredentials: true });
  
        if (response.status === 200) {
          toggleButtonState();
          navigate('/otp');
        } else {
          console.error('Errore durante la verifica:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error submitting form:', error.response ? error.response.data : error.message);
      }
}

  const buttonLoginStyle = {
    backgroundColor: 'rgba(60, 94, 104, 0.996)',               
  };
  
    return (
        <div>
          <aside className={`loginPage ${buttonState ? 'open' : ''}`}>
            <button id="closeButton" onClick={handleClick}>X</button>
            <div className="loginSubPage">
              <div>
                  <img id="loginImage" src={require("../assets/login.png")} />
              </div>
              <h2>Effettua il login:</h2>
              <form id="loginInput" onSubmit={handleSubmit}>
                <FaPhoneAlt className="icon" />
                <input type="tel" placeholder="Inserisci numero:" className="formSpace" id="formSpaceLogin" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required pattern='[0-9]{9,10}' title='Il numero di telefono deve avere 9 o 10 cifre numeriche!'/>
                <button className="submitButton" id="submitButtonLogin" style={buttonLoginStyle}>Accedi</button>
              </form>
            </div>
          </aside>
        </div>
      );
    
}

export default LoginPage

