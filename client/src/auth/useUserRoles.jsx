import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const useUserRoles = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [roles, setRoles] = useState([]);
  
  useEffect(() => {
    const fetchRoles = async () => {
      if (user) {
        try {
          const token = await getAccessTokenSilently();
          const response = await fetch('https://dev-trjl8eirx68x8ei5.us.auth0.com/userinfo', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const userInfo = await response.json();
          setRoles(userInfo['roles'] || []);
        } catch (error) {
          console.error("Failed to fetch roles: ", error);
        }
      }
    };
    
    fetchRoles();
  }, [user, getAccessTokenSilently]);
  
  return roles;
};

export default useUserRoles;