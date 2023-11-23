import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypeSelector'; 
import { useUserAction } from '../hooks/useAction';
import Cookies from "universal-cookie"; 

interface RegisterFormState {
    firstname: string;
    lastname:string;
    email: string;
}

const Register: React.FC = () => {
    const [formState, setFormState] = useState<RegisterFormState>({ firstname: '', lastname:'', email: ''});
    const { registerUser } = useUserAction(); // Destructure the createUser action creator

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = {firstname:formState.firstname, lastname:formState.lastname, email:formState.email}
        registerUser(data); // Dispatch the createUser action
        // If you have additional fields like name and roleLevel, include them in the action call
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    value={formState.firstname}
                    onChange={handleInputChange}
                />
                                <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    value={formState.lastname}
                    onChange={handleInputChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formState.email}
                    onChange={handleInputChange}
                />
                <button type="submit">Create User</button>
            </form>
            <p>
    <Link to="/">return to landing</Link>
  </p>
        </div>
    );
};

export default Register;