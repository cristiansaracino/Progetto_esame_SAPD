import { useEffect, useState } from "react";
import Footer from "../components/Footer.jsx";
import HomepageContainer from "../components/HomepageContainer.jsx";

function Otp({buttonText, backgroundImage, toggleButtonState, buttonState}){

    return(
        <>
            <HomepageContainer buttonText={buttonText} backgroundImage ={backgroundImage} formType="otp" toggleButtonState={toggleButtonState} buttonState={buttonState}/>
            <Footer></Footer>
        </>
    )
}

export default Otp