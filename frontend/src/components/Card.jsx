import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom"

function Card({ annuncio }) {
  const user = annuncio.userId;
  const imageUrl = `http://localhost:5000${user.profileImageUrl}`;

  const getBadgeInfo = (score) => {
    const rating = Math.round(score);
    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);

    if (rating >= 3) {
      return { label: stars, color: "#dcfce7", text: "#166534" };
    } 
    else if(rating == 3){
      return { label: stars, color: "#fef9c3", text: "#166534" };
    }
    else{
      return { label: stars, color: "#fee2e2", text: "#991b1b" };
    }
  };

  const navigate = useNavigate();
  const viewProfile = () =>{
    navigate('/profile', { state: { annuncio: annuncio } })
  }

  const badge = getBadgeInfo(annuncio.previsione);

  return (
    
    <div className="cardSlot">
      {/* Immagine dell'annuncio */}
      <div className="cardImageSlot">
        <Link to="/cardpageDetails" state={{ annuncio }}>
          <img src={imageUrl} className="cardImage" alt={annuncio.userId.profileImageUrl} />
        </Link>
      </div>

      {/* Autore dell'annuncio */}
      <div className="cardAuthor">
        <p>Annuncio di <b>{annuncio.userId.nome} {annuncio.userId.cognome}</b></p>
      </div>

      {/* Titolo dell'annuncio */}
      <div className="cardTitle">
        <Link to="/cardpageDetails" state={{ annuncio }}><h3>{annuncio.titolo}</h3></Link>
      </div>
      
            {/* Tariffa dell'annuncio */}
      <div className="cardPrice">
        <p>A partire da &euro;{annuncio.tariffa}</p>
      </div>

      <div className = "convenienceStars">
        <span 
          style={{ 
            backgroundColor: badge.color, 
            color: badge.text, 
          }}
        >
          <p style={{ margin: "0", padding: "0", lineHeight: "1" }}>Convenienza: {badge.label}</p>
        </span>
      </div>
    </div>
  );
}

export default Card;
