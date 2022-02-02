import "./navBar.style.scss";
import { Link } from "react-router-dom";
import ROUTES from "../../constants/routes";
import { useEffect, useContext, useState } from "react";
import { LogOutContext } from "../../App/context/context";
import axios from "axios";

const classes = {
  container: "navBar",
  item: "item",
  flout: { right: "right", left: "left" },
};

export const NavBar = () => {
  const [token, setToken] = useState("");
  const { logOut, isLoggedIn } = useContext(LogOutContext);
  useEffect(() => {
    let localToken = localStorage.getItem("token");
    setToken(localToken);
  }, []);

  const onClickLogout = () => {
    let data = "";
    let config = {
      method: "post",
      url: "http://localhost:8080/user/logout",
      headers: {
        Authorization: `Barear ${token}`,
      },
      data: data,
    };
    axios(config)
      .then(({ data }) => {
        logOut(true);
        localStorage.removeItem("token");
      })
      .catch((error) => {
        localStorage.removeItem("token");
        logOut(true);
        console.log(error.response.data);
      });
  };

  return (
    <nav className={classes.container}>
      <div className={classes.flout.left}>
        <Link className="item" to={`${ROUTES.HOME_PAGE}`}>
          Logo
        </Link>
      </div>
      <div className={classes.flout.right}>
        <div className={classes.item}>UserPhoto</div>
        {!isLoggedIn && (
          <Link className={classes.item} to={`${ROUTES.LOGIN}`}>
            login
          </Link>
        )}
        {isLoggedIn && (
          <Link
            onClick={() => onClickLogout()}
            className={classes.item}
            to={`${ROUTES.LOGIN}`}
          >
            Logout
          </Link>
        )}
      </div>
    </nav>
  );
};
