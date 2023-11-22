import { useEffect } from "react";
import Cookies from "universal-cookie";
import { setToken } from "../Redux/actions/creators";
import { useUserAction } from "../hooks/useAction";

export const CookieChecker = () => {
  const { getUser } = useUserAction();
  const cookies = new Cookies();

  const autoLogin = async () => {
    const PortalCookie = cookies.get("PortalToken");
    setToken(PortalCookie);

    if (PortalCookie) {
      await getUser();
    }
  };

  useEffect(() => {
    console.log("Cookie exists", cookies.get("PortalToken") ? "yes" : "no");
    autoLogin();
  }, []);

  return null; // This component doesn't render anything
};