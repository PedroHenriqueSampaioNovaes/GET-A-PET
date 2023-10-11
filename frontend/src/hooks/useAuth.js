import api from '../utils/api';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFlashMessage from './useFlashMessage';

const useAuth = () => {
  const [authenticated, setAuthenticated] = React.useState(false);
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function autoLogin() {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          await api.get('/users/token/verify', {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          });

          api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
          setAuthenticated(true);
        } catch (error) {
          window.localStorage.removeItem('token');
        }
      }
    }
    autoLogin();
  }, []);

  async function register(user) {
    let msgText = 'Cadastro realizado com sucesso!';
    let msgType = 'success';

    try {
      const data = await api.post('/users/register', user).then((response) => {
        return response.data;
      });

      authUser(data);
    } catch (error) {
      msgText = error.response.data.message;
      msgType = 'error';
    }

    setFlashMessage(msgText, msgType);
  }

  async function login(user) {
    let msgText = 'Login realizado com sucesso';
    let msgType = 'success';

    try {
      const data = await api.post('/users/login', user).then((response) => {
        return response.data;
      });

      await authUser(data);
    } catch (error) {
      msgText = error.response.data.message;
      msgType = 'error';
    }

    setFlashMessage(msgText, msgType);
  }

  async function authUser(data) {
    setAuthenticated(true);
    window.localStorage.setItem('token', JSON.stringify(data.token));

    navigate('/');
  }

  function logout() {
    const msgText = 'Logout realizado com sucesso!';
    const msgType = 'success';

    setAuthenticated(false);
    window.localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;
    navigate('/');

    setFlashMessage(msgText, msgType);
  }

  return { authenticated, register, logout, login };
};

export default useAuth;
