import styles from './TextArea.module.css';

const TextArea = ({
  text,
  name,
  handleOnChange,
  value,
  placeholder,
  ...props
}) => {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}</label>
      <textarea
        name={name}
        id={name}
        onChange={handleOnChange}
        value={value}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default TextArea;
