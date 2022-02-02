import { useEffect, useState } from "react";
import axios from "axios";

export const useUserAuth = () => {
  const [token] = useState(() => localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    try {
      let data = "";
      let config = {
        method: "post",
        headers: {
          Authorization: `Barear ${token}`,
        },
        data: data,
      };

      function getUserByToken() {
        axios("http://localhost:8080/user/login", config)
          .then(({ data }) => {
            data[0] === "Logged In" && setIsLoggedIn(true);
          })
          .catch((error) => {
            console.log(error.response.data);
            if (error.response.data.includes("expired")) {
              localStorage.removeItem("token");
            }
          });
      }
      token && getUserByToken();
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  return isLoggedIn;
};
