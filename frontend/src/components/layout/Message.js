import React from 'react';
import styles from './Message.module.css';
import bus from '../../utils/bus';

const Message = () => {
  const [visibility, setVisibility] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const [type, setType] = React.useState('');

  React.useEffect(() => {
    bus.addListener('flash', ({ message, type }) => {
      setVisibility(true);
      setMessage(message);
      setType(type);

      setTimeout(() => {
        setVisibility(false);
      }, 3000);
    });
  }, []);

  return (
    visibility && (
      <div className={`${styles.message} ${styles[type]}`}>{message}</div>
    )
  );
};

export default Message;
