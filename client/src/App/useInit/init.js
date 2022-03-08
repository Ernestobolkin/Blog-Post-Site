import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../constants/routes";
import myApi from "../api/myApi";

export const useUserAuth = () => {
  const [token] = useState(() => localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDataAuth, setUserDataAuth] = useState("");
  const navigate = useNavigate();

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
            data[0] === "Logged In" && setUserDataAuth(data[1]);;
            data[0] === "Logged In" && setIsLoggedIn(true);
          })
          .catch((error) => {
            console.log(error.response.data);
            if (error.response.data.includes("expired")) {
              localStorage.removeItem("token");
              setIsLoggedIn(false)
              navigate(ROUTES.TRAILING_PATH);
              window.location.reload(false);
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
