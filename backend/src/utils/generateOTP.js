// Funzione per generare un codice OTP
function generateOTP() {
    //const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otp = 123456;
    const otpExpiresAt = new Date(Date.now() + 60000);
    return { otp, otpExpiresAt };
}

module.exports = generateOTP;