import React from 'react';
import { useTypedSelector } from '../hooks/useTypeSelector'; // Adjust the import path as needed
import { useUserAction } from '../hooks/useAction'; // Adjust the import path as needed

const LandingPage: React.FC = () => {
  const userState = useTypedSelector(state => state.user.currentUser);
  const { logoutUser } = useUserAction();

  return (
    <div className="landing-page">
      <div className="user-info">
        <p>Name: {userState.name}</p>
        <p>Email: {userState.email}</p>
        <p>Role Level: {userState.roleLevel}</p>
      </div>
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
};

export default LandingPage;