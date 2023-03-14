import React, { useState, useEffect } from "react";
import Auth from "../Auth";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
  const [currentActualUser, setCurrentActualUser] = useState();



  useEffect(() => {
    const fetchData = async () => {
      const response = await Auth.getActualUser();
      const data = response && await response.json();
      setCurrentActualUser(data);
    };

    fetchData();
  }, []);

  const value = {currentActualUser};

  return(
    <UserContext.Provider value = {value}>
        {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
