import { useParams, Navigate, useNavigate } from "react-router-dom"
import { useMemo } from 'react'
import getHeroById from "../../selectors/getHeroById";

export const heroImages = require.context('../../assets/', true)

const HeroScreen = () => {

  const { heroeId } = useParams();
  const navigate = useNavigate();

  const hero = useMemo( () => getHeroById(heroeId), [ heroeId ])
   
  const handleReturn = () => {
    navigate(-1)
  }

  if(!hero){
    return <Navigate to='/' />
  }

  const {
    id,
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters
  } = hero;


  return (
    <div className="row mt-5">
      <div className="col-4">
        <img 
          src={heroImages(`./${id}.jpg`)} 
          alt={superhero}
          className="img-thumbnail animate__animated animate__fadeInLeft"
        />
      </div>

      <div className="col-8">
        <h3>{ hero.superhero }</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <b>Alter ego:</b> {alter_ego}
          </li>
          <li className="list-group-item">
            <b>Publisher:</b> {publisher}
          </li>
          <li className="list-group-item">
            <b>First Appearance:</b> {first_appearance}
          </li>
        </ul>

          <h5 className="mt-3 ms-1">Characters</h5>
          <p className="ms-1">{ characters }</p>

          <button
            className="btn btn-outline-info"
            onClick={handleReturn}
          >
            Regresar
          </button>
      </div>
        
    </div>
  )
}

export default HeroScreen