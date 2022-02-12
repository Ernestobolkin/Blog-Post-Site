import "./navBar.style.scss";
import "./mobileNav.style.scss";
import { Link } from "react-router-dom";
import ROUTES from "../../constants/routes";
import { useEffect, useContext, useState } from "react";
import { LogOutContext } from "../../App/context/context";
import myApi from "../../App/api/myApi";
import BackgroundLetterAvatars from "./avatar";

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
  }, [token]);

  const onClickLogout = () => {
    let config = {
      method: "post",
      url: "/user/logout",
      headers: {
        Authorization: `Barear ${token}`,
      },
      data: "",
    };
    myApi(config)
      .then(({ data }) => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("email");
        logOut(true);
      })
      .catch((error) => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("email");
        logOut(true);
        console.log(error.response.data);
      });
  };

  return (
    <nav className={classes.container}>
      <div className={classes.flout.left}>
        <Link className="items mobile-item" to={`${ROUTES.HOME_PAGE}`}>
          <span className="logo">
            <span className="post">
              Post<span className="me">Me</span>
            </span>
          </span>
        </Link>
      </div>

      <div className="mobileLeft">
        <div className={classes.flout.right}>
          {isLoggedIn && <BackgroundLetterAvatars />}
          {!isLoggedIn && (
            <Link className={`${classes.item} items`} to={`${ROUTES.LOGIN}`}>
              login
            </Link>
          )}
          {isLoggedIn && (
            <Link
              onClick={() => onClickLogout()}
              className={`${classes.item} items`}
              to={`${ROUTES.LOGIN}`}
            >
              Logout
            </Link>
          )}
        </div>
        <div className="logout-mobile"></div>
      </div>
    </nav>
  );
};
