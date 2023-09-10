import api from '../../../utils/api';

import React from 'react';
import styles from './AddPet.module.css';

import { useNavigate } from 'react-router-dom';

/* components */
import PetForm from '../../form/PetForm';

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage';

const AddPet = () => {
  const [token] = React.useState(localStorage.getItem('token') || '');
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  async function registerPet(pet) {
    let msgType = 'success';

    const formData = new FormData();

    Object.keys(pet).forEach((key) => {
      if (key === 'images') {
        pet.images.forEach((img) => {
          formData.append('images', img);
        });
      } else {
        formData.append(key, pet[key]);
      }
    });

    const data = await api
      .post('pets/create', formData, {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data',
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType = 'error';
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);

    if (msgType !== 'error') {
      navigate('/pet/mypets');
    }
  }

  return (
    <section className={styles.addpet_header}>
      <div>
        <h1>Cadastre um Pet</h1>
        <p>Depois ele ficará disponível para adoção</p>
      </div>
      <PetForm handleSubmit={registerPet} btnText="Cadastrar Pet" />
    </section>
  );
};

export default AddPet;
