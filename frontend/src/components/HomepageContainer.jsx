import HomepageBox from "./HomepageBox"
import LoginPage from "./LoginPage"

function HomepageContainer({buttonState, oldPhoneNumber, newPhoneNumber, newPhoneNumberConferm, OtpChangeNumber,  toggleButtonState, backgroundImage, formType, buttonText, notifySuccess, notifyError}){


    return(
        <>
            <div className={`overlay ${buttonState ? 'active' : ''}`}>
            </div>

            <div className="HomepageContainer">
                <HomepageBox OtpChangeNumber={OtpChangeNumber} oldPhoneNumber={oldPhoneNumber} newPhoneNumber={newPhoneNumber} newPhoneNumberConferm={newPhoneNumberConferm} notifySuccess={notifySuccess} notifyError={notifyError} formType={formType} backgroundImage ={backgroundImage} buttonState={buttonState} buttonText={buttonText}/>
                <LoginPage toggleButtonState={toggleButtonState} buttonState={buttonState}/>
            </div>
        </>
    )
}

export default HomepageContainer