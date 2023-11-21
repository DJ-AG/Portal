import React, { useState } from 'react';
import { useTypedSelector } from '../hooks/useTypeSelector'; // Adjust the import path as needed
import { useUserAction } from '../hooks/useAction'; // Adjust the import path as needed

interface LoginFormState {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formState, setFormState] = useState<LoginFormState>({ email: '', password: '' });
  const { userLogin } = useUserAction(); // Destructure the userLogin action creator
  const userState = useTypedSelector(state => state.user); // Access the user state from the Redux store

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    userLogin(formState.email, formState.password); // Dispatch the userLogin action
  };

  // Add logic to handle state changes, loading, errors, etc.

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formState.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formState.password}
          onChange={handleInputChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;