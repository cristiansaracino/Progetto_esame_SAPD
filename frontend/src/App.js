import {Route, Routes} from 'react-router-dom';
import React, { useState } from 'react'; 
import Homepage from './pages/Homepage.jsx';
import OfferingGigs from './pages/OfferingGigs.jsx';
import Navbar from './components/Navbar.jsx';
import './App.css'
import Otp from './pages/Otp.jsx';
import Cardpage from './pages/Cardpage.jsx';
import CardpageDetails from './pages/CardpageDetails.jsx';
import Myprofile from './pages/Myprofile.jsx';
import { ToastContainer, toast, Bounce  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 
function App(){

  const [buttonState, setButtonState] = useState(false);
  const [hasClickedProfile, sethasClickedProfile] = useState(false)
  
  const toggleButtonState = () => {
    setButtonState(!buttonState);
  };
  const visitingGig = require("./assets/image.png")
  const offeringGig = require("./assets/homepage.png")
  const otpGig = require("./assets/otp.png")


  const handleClick = () => {
    sethasClickedProfile(true);
    sessionStorage.setItem('hasClickedProfile', true);
  };


  const notifySuccess = (message) => {
    toast.success(message, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  }

  const notifyError = (message) => {
    toast.error(message, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  }


  

  return (
    <>
      <Navbar notifySuccess={notifySuccess} notifyError={notifyError} toggleButtonState={toggleButtonState}/>
      <Routes>
        <Route path="/otp" element={<Otp buttonText={'Invia'} backgroundImage={otpGig} toggleButtonState={toggleButtonState} buttonState={buttonState} />}/>
        <Route path="/" element={<Homepage notifySuccess={notifySuccess} notifyError={notifyError} buttonText={'Cerca'} backgroundImage={visitingGig} toggleButtonState={toggleButtonState} buttonState={buttonState} />} />
        <Route path="/offeringGigs" element={<OfferingGigs notifySuccess={notifySuccess} notifyError={notifyError} buttonText={'Offri'} backgroundImage={offeringGig} toggleButtonState={toggleButtonState} buttonState={buttonState}/>} />
        <Route path="/profile" element={<CardpageDetails  handleClick={handleClick} toggleButtonState={toggleButtonState} buttonState={buttonState}/>} />
        <Route path="/cardPage" element={<Cardpage buttonState={buttonState} toggleButtonState={toggleButtonState}/>} />
        <Route path="/cardPageDetails" element={<CardpageDetails hasClickedProfile ={hasClickedProfile} handleClick={handleClick} toggleButtonState={toggleButtonState} buttonState={buttonState}/>} />
        <Route path ="/myProfile" element={<Myprofile notifyError={notifyError} notifySuccess={notifySuccess} buttonState={buttonState} toggleButtonState={toggleButtonState}/>}/>
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />

    </>
  );
};
 
export default App;