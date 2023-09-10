import api from '../../../utils/api';

import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Pets.module.css';

const Pets = ({ page, setInfinite }) => {
  const [pets, setPets] = React.useState([]);

  React.useEffect(() => {
    const total = 8;

    api.get(`/pets?page=${page}&total=${total}`).then((response) => {
      setPets(response.data.pets);

      if (response.data.pets.length < total) {
        setInfinite(false);
      }
    });
  }, [page, setInfinite]);

  return (
    <>
      {pets.map((pet) => (
        <div className={styles.pet_card} key={pet._id}>
          <div
            style={{
              backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${pet.images[0]})`,
            }}
            className={styles.pet_card_image}
          ></div>
          <h3>{pet.name}</h3>
          <p>
            <span className="bold">Peso:</span> {pet.weight}kg
          </p>
          {pet.available ? (
            <Link to={`pet/${pet._id}`}>Mais detalhes</Link>
          ) : (
            <p className={styles.adopted_text}>Adotado</p>
          )}
        </div>
      ))}

      {pets.length === 0 && (
        <p>Não há pets cadastrados ou disponíveis para adoção no momento!</p>
      )}
    </>
  );
};

export default Pets;
