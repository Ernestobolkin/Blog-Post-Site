import "./navBar.style.scss";
import { Link } from "react-router-dom";
import ROUTES from "../../constants/routes";

const classes = {
  container: "navBar",
  item: "item",
  flout: { right: "right", left: "left" },
};

export const NavBar = () => {
  return (
    <nav className={classes.container}>
      <div className={classes.flout.left}>
        <Link className="item" to={`${ROUTES.HOME_PAGE}`}>
          Logo
        </Link>
      </div>
      <div className={classes.flout.right}>
        <div className={classes.item}>UserPhoto</div>
        <Link className={classes.item} to={`${ROUTES.LOGIN}`}>
          logout/login
        </Link>
      </div>
    </nav>
  );
};
