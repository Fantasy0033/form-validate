import PropTypes from "prop-types";
import "./SubmitMessage.scss";

export default function SubmitMessage({ label, className, onClick, children }) {
  return (
    <div className="error-form">
      <label>{label}</label>
      <button className={className} onClick={onClick}>
        {children}
      </button>
    </div>
  );
}

SubmitMessage.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.string,
};
