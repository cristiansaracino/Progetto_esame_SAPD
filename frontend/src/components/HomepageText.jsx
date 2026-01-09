function HomepageText({formType}){
    return(
        <div className="HomepageText">
            {formType === 'offer' && (
                <div>
                    <h1 className="title">Offri un Lavoretto nella tua zona:</h1>
                    <h2 className=" subtitle">Guadagna aiutando i tuoi vicini</h2>
                </div>
            )}

            {formType === 'search' && (
                <div>
                    <h1 className="title">Cerca un Lavoretto nella tua zona:</h1>
                    <h2 className=" subtitle">Indica il tipo di lavoro di cui hai bisogno e trova qualcuno nella tua zona pronto a darti una mano.</h2>
                </div>
            )}

            {formType === 'otp' && (
                <div className="otpText">
                    <h1 className="titleOtp">Inserisci codice OTP:</h1>
                </div>
            )}
        </div>
    )
}

export default HomepageText