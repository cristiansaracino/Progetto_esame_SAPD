import axios from "axios"
import { useState } from "react";
import { GiGardeningShears} from "react-icons/gi"
import { useNavigate } from "react-router-dom";
import SearchCityInput from "./SearchCityInput";

function SearchForm({buttonVisitorStyle, buttonText, notifyError}){
    const navigate = useNavigate();
    const [città, setCitta] = useState('');
    const [tipoLavoro, setTipoLavoro] = useState('');

    //gestisce la ricerca degli annunci
    const handleSearch = async (event) => {
        event.preventDefault();
        const data = {
            città: città,
            tipoLavoro: tipoLavoro
        };

        sessionStorage.removeItem('città')
        sessionStorage.removeItem('lavoro')

        //verifica la validità del lavoro inserito
        const lavoriDisponibili = [
            "Fotografo",
            "Tutor per ripetizioni",
            "Giardiniere",
            "Baby-sitter",
            "Pet-sitter"
        ];

        if(!lavoriDisponibili.includes(tipoLavoro)){
            notifyError("Il lavoro inserito non è valido")
            return
        }
        //richiesta di listing degli annunci in base a città e lavoro
        try{
            const response = await axios.get('http://localhost:5000/annunci/listing', {
                params: data
            });


            if(response.status === 200){
                navigate('/cardPage', { state: { annunci: response.data.annunci } });
            }
        }catch (error) {
            if(error.status === 400){
                notifyError("Il comune inserito o il lavoro selezionato non sono corretti")
            }
            if(error.status === 404){
                notifyError("Nessun annuncio è stato trovato con queste caratteristiche")
            }
        }

    }

    return(
        <>
        <form onSubmit={handleSearch} className="HomepageForm"> 
            <div className="textContainer">
                <div>
                    <div>
                        <SearchCityInput notifyError={notifyError} setCitta={setCitta}/>
                    </div>
                </div>
                <div>
                    <GiGardeningShears className="icon" />
                    <input type="text" placeholder="Inserisci Lavoretto da cercare:" list="jobs" className="formSpace" value={tipoLavoro} onChange={(e) => setTipoLavoro(e.target.value)}/>
                    <datalist id="jobs">
                        <option value="Fotografo" />
                        <option value="Tutor per ripetizioni" />
                        <option value="Giardiniere" />
                        <option value="Baby-sitter" />
                        <option value="Pet-sitter" />
                    </datalist>
                </div>
            </div>
            <button type="submit" className="submitButton" style={buttonVisitorStyle}>{buttonText}</button>
        </form>
        </>
    )
}
export default SearchForm