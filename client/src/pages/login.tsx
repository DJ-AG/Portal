import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAction } from '../hooks/useAction';
import Cookies from "universal-cookie";
import { useTypedSelector } from '../hooks/useTypeSelector';


interface LoginFormState {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formState, setFormState] = useState<LoginFormState>({ email: '', password: '' });
  const { loginUser, getUser } = useUserAction(); // Destructure the userLogin action creator
  const user = useTypedSelector(state => state.user); // Destructure the userLogin action creator

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {email:formState.email, password:formState.password}
    await loginUser(data); // Dispatch the userLogin action
    await getUser()
  };

  const navigate = useNavigate();
  const cookies = new Cookies();

 const PortalCookie = cookies.get("PortalToken");

  useEffect(() => {
     if(PortalCookie) {
      console.log("cookie exists, navigating to landing")

      navigate('/')};
     
     }, [PortalCookie]);

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
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
      <p>
    Don't have an account? <Link to="/register">Register here</Link>
  </p>
    </div>
  );
};

export default Login;