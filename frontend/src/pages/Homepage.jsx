import HomepageContainer from "../components/HomepageContainer.jsx";
import Footer from "../components/Footer.jsx";

function Homepage({buttonText, backgroundImage, toggleButtonState, buttonState, notifyError}){
  return(
    <>
      <HomepageContainer buttonText={buttonText} backgroundImage ={backgroundImage} formType="search" toggleButtonState={toggleButtonState} buttonState={buttonState} notifyError={notifyError}/>

      <Footer></Footer>
    </>
  )
}

export default Homepage