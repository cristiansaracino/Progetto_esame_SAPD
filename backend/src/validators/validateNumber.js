// Funzione che verifica se un numero di telefono è valido
function validateNumber(number) {
    
    // Verifica se il numero è una stringa
    if (typeof number !== 'string') {
        return false;
    }

    // Rimuove tutti i caratteri non numerici
    let plain = number.replace(/\D/g, '');
    plain = plain.substring(2);

    const isValid = /^3\d{8,9}$/.test(plain);

    return isValid;
}

module.exports = validateNumber;