import React, { useState, useEffect } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { toast } from 'react-toastify';

const SearchCityInput = ({ setCitta}) => {
  const [comuni, setComuni] = useState([]);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Recupera il valore salvato in sessionStorage
  useEffect(() => {
    const città = sessionStorage.getItem('città');
    if (città) {
      setQuery(città); // Imposta la query con il valore di sessionStorage
    }
  }, []);

  // Carica i comuni dal file JSON al montaggio della componente
  useEffect(() => {
    fetch('/comuni_italiani.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Errore nel caricamento del file JSON');
        }
        return response.json();
      })
      .then((data) => {
        setComuni(data);
      })
      .catch((error) => console.error('Errore nel caricamento dei dati:', error));
  }, []);

  // Gestisce il cambiamento dell'input
  const handleChange = (e) => {
    const userInput = e.target.value;
    setQuery(userInput);
    

    if (userInput.length > 0) {
      const filteredSuggestions = comuni.filter((comune) =>
        comune.comune.toLowerCase().startsWith(userInput.toLowerCase())
      );
      setSuggestions(filteredSuggestions);

    } else {
      setSuggestions([]);
    }
  };

  // Gestisce il clic su un suggerimento
  const handleSuggestionClick = (comune) => {
    const selectedComune = `${comune.comune} (${comune.provincia})`;
    setQuery(selectedComune);
    setSuggestions([]);
    setCitta(selectedComune); // Passa il comune selezionato al genitore
    sessionStorage.setItem('città', selectedComune )
  };

  return (
    <div>
      <FaLocationDot className='icon'/>
      
      <input
        type="text"
        value={query} // Usa query come valore dell'input
        onChange={handleChange}
        placeholder="Inserisci il nome di un comune"
        className='formSpace'
      />


      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((comune, index) => (
            <div className='singleSuggestion'
              key={index}
              onClick={() => handleSuggestionClick(comune)}
            >
              {comune.comune} ({comune.provincia})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchCityInput;