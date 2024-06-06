import { useState } from "react";
import Button from "../components/button/button";
import Input from "../components/input/Input";
import SubmitMessage from "../components/submitMessage/SubmitMessage";
import "./Home.scss";

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState("+380");
  const [name, setName] = useState("");
  const [submittedNumbers, setSubmittedNumbers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");
  const [isEmptyError, setIsEmptyError] = useState(false);
  const [isEmptyNameError, setIsEmptyNameError] = useState(false);
  const [isEmptyPhoneNumberError, setIsEmptyPhoneNumberError] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isPhoneNumberError, setIsPhoneNumberError] = useState(false);

  const handlePhoneNumberChange = (newPhoneNumber) => {
    setPhoneNumber(newPhoneNumber);
    const isValidPhone = /^\+380\d{9}$/.test(newPhoneNumber);
    setIsValid(isValidPhone);
    setIsPhoneNumberError(!isValidPhone && newPhoneNumber !== "");
    setError("");
    setIsEmptyPhoneNumberError(false);
    setIsEmptyError(false);
    setIsError(false);
  };

  const handleNameChange = (newName) => {
    setName(newName);
    setError("");
    setIsEmptyNameError(false);
    setIsEmptyError(false);
    setIsError(false);
  };

  const handleSubmit = async () => {
    if (!phoneNumber.trim()) {
      setIsEmptyPhoneNumberError(true);
    }
    if (!name) {
      setIsEmptyNameError(true);
      return;
    }

    if (phoneNumber.length < 0) {
      setIsPhoneNumberError(false);
    }

    if (phoneNumber.length > 0) {
      setIsPhoneNumberError(false);
    }

    if (!isValid || phoneNumber.length <= 11) {
      setIsPhoneNumberError(true);
      return;
    }
    try {
      const encodedPhoneNumber = encodeURIComponent(phoneNumber);
      const response = await fetch(
        `http://localhost:5000/submittedNumbers?phoneNumber=${encodedPhoneNumber}`
      );

      if (!response.ok) {
        throw new Error("Помилка при відправки запросу.");
      }

      const data = await response.json();

      if (data.length > 0) {
        setError("Цей номер телефону вже зареєстрований");
        setIsError(true);
      } else {
        await fetch("http://localhost:5000/submittedNumbers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, phoneNumber }),
        });
        setSubmittedNumbers([...submittedNumbers, phoneNumber]);
        setIsSubmitted(true);
        setName("");
        setPhoneNumber("+380");
        setError("");
        setIsEmptyError(false);
        setIsEmptyPhoneNumberError(false);
        setIsPhoneNumberError(false);
      }
    } catch (error) {
      console.error("Помилка при відправці запросу:", error);
    }
  };

  return (
    <div className="container">
      {!isSubmitted && (
        <div className="form">
          <Input
            onChange={handleNameChange}
            label="Ваше ім'я"
            placeholder="Ім'я"
            className={
              isEmptyError || isEmptyNameError
                ? "to-do-input input-error"
                : "to-do-input"
            }
            isEmptyNameError={isEmptyNameError}
            value={name}
            maxLength={20}
          />
          <Input
            type="tel"
            onChange={handlePhoneNumberChange}
            label="Ваш номер телефону"
            placeholder="Номер телефону"
            className={
              isPhoneNumberError || isError || isEmptyPhoneNumberError
                ? "to-do-input input-error"
                : "to-do-input"
            }
            isPhoneNumberError={isPhoneNumberError}
            value={phoneNumber}
            isValid={isValid}
            error={error}
            isEmptyPhoneNumberError={isEmptyPhoneNumberError}
            isError={isError}
            isEmptyError={isEmptyError}
            maxLength={13}
          />
          <Button onClick={handleSubmit} className="button_send">
            Відправити
          </Button>
        </div>
      )}
      {isSubmitted && (
        <div className="success-message">
          <SubmitMessage
            label="Ваші данні успішно відправлені!"
            className="button_submit"
            onClick={() => setIsSubmitted(false)}
          >
            Добре
          </SubmitMessage>
        </div>
      )}
    </div>
  );
}
