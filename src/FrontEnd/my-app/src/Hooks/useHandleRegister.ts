import { useState, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { initialsColorGenerator } from '../Functions/InitialsColorGenerator';

const useHandleRegister = () => {
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [initialsColor, setInitialsColor] = useState(initialsColorGenerator());

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent, username: string, password: string, confirmPassword: string, email: string, employerType: string) => {
    e.preventDefault(); 
    if (username.length < 3) {
      setUsernameError('Nazwa użytkownika musi mieć co najmniej 3 znaki.');
      return;
    }

    if (password.length < 8) {
      setPasswordError('Hasło musi mieć co najmniej 8 znaków.');
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Hasła nie pasują do siebie.');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(emailPattern)) {
      setEmailError('Nieprawidłowy adres email.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8080/newUser', {
        username,
        password,
        employerType,
        email,
        initialsColor,
      });

      navigate('/signIn');
    } catch (error) {
      console.error('Błąd rejestracji:', error);
    }
  };

  return {
    handleSubmit,
    usernameError,
    passwordError,
    confirmPasswordError,
    emailError,
  };
};

export default useHandleRegister;