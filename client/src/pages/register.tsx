import React, { useState } from 'react';
import { useTypedSelector } from '../hooks/useTypeSelector'; // Adjust the import path as needed
import { useUserAction } from '../hooks/useAction'; // Adjust the import path as needed

interface RegisterFormState {
    name: string;
    email: string;
    password: string;
}

const Register: React.FC = () => {
    const [formState, setFormState] = useState<RegisterFormState>({ name: '', email: '', password: ''});
    const { registerUser } = useUserAction(); // Destructure the createUser action creator
    const userState = useTypedSelector(state => state.user); // Access user state from Redux store

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = {name:formState.name, email:formState.email, password:formState.password}
        registerUser(data); // Dispatch the createUser action
        // If you have additional fields like name and roleLevel, include them in the action call
    };

    // Add logic to handle state changes, loading, errors, etc.

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formState.name}
                    onChange={handleInputChange}
                />
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;