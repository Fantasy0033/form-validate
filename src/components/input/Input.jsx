import PropTypes from "prop-types";
import "./Input.scss";

export default function Input({
  label,
  value,
  onChange,
  className,
  placeholder,
  type,
  maxLength,
  isError,
  error,
  isPhoneNumberError,
  isEmptyNameError,
  isEmptyPhoneNumberError,
}) {
  return (
    <div>
      {label && <label>{label}</label>}
      <input
        type={type}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
      ></input>
      {isEmptyNameError && (
        <p className="error-message">Введіть будь ласка ваше імя</p>
      )}
      {isEmptyPhoneNumberError && (
        <p className="error-message">Введіть будь ласка ваш номер телефону</p>
      )}
      {isPhoneNumberError && (
        <p className="error-message">Введіть корректний номер телефону</p>
      )}
      {isError && <p className="error-message">{error}</p>}
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  isError: PropTypes.bool,
  isEmptyError: PropTypes.bool,
  maxLength: PropTypes.number,
  isPhoneNumberError: PropTypes.bool,
  isEmptyNameError: PropTypes.bool,
  isEmptyPhoneNumberError: PropTypes.bool,
};
