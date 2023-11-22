import React,{useEffect} from 'react';
import { useTypedSelector } from '../hooks/useTypeSelector'; 
import { useUserAction } from '../hooks/useAction'; 
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const LandingPage: React.FC = () => {
  const userState = useTypedSelector(state => state.user.currentUser);
  const state = useTypedSelector(state => state.user);
  const { logoutUser } = useUserAction();

  const navigate = useNavigate();
  const cookies = new Cookies();

 const PortalCookie = cookies.get("PortalToken");
 console.log(state.alertText)

  useEffect(() => {
     if(!PortalCookie ) {
      console.log("navigating to login")
      navigate('/login')};
     
     }, [PortalCookie]);


     const handleAppRedirect = (appUrl: string) => {
      // Here you can add logic to handle cookie transfer if needed
      window.location.href = appUrl; // Redirects to the app URL
    };

    return (
      <div className="landing-page">
        <div className="user-info">
          <p>First Name: {userState.firstname}</p>
          <p>Last Name: {userState.lastname}</p>
          <p>Email: {userState.email}</p>
          <p>Role Level: {userState.role}</p>
        </div>
        <button onClick={logoutUser}>Logout</button>
  
        {/* App redirect buttons container */}
        <div className="app-redirect-container">
          <button onClick={() => handleAppRedirect('http://localhost:5122')}>App1</button>
          <button onClick={() => handleAppRedirect('http://localhost:5123')}>App2</button>
          <button onClick={() => handleAppRedirect('http://localhost:5000')}>App3</button>
        </div>
      </div>
    );
  };

export default LandingPage;