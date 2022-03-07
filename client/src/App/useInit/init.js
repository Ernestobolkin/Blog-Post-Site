import { useEffect, useState } from "react";
import myApi from "../api/myApi";

export const useUserAuth = () => {
  const [token] = useState(() => localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDataAuth, setUserDataAuth] = useState(null);

  useEffect(() => {
    try {
      let data = "";
      let config = {
        method: "post",
        url: "/user/login",
        headers: {
          Authorization: `Barear ${token}`,
        },
        data: data,
      };
      function getUserByToken() {
        myApi(config)
          .then(({ data }) => {
            data[0] === "Logged In" && setIsLoggedIn(true);
            data[0] === "Logged In" && setUserDataAuth(data[1]);
            console.log("from here");
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

  return [isLoggedIn, userDataAuth];
};
