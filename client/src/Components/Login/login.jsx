import { Form } from "./form";
import { Link } from "react-router-dom";
import ROUTES from "../../constants/routes";
import "./styles/login.style.scss";

export const LoginPage = ({ setIsLoggedIn, setUserData }) => {
  return (
    <>
      <div className="login-page">
        <div className="login-container">
          <Form setIsLoggedIn={setIsLoggedIn} setUserData={setUserData} />
          <p>Don't have an account? </p>
          <Link className="link" to={ROUTES.REGISTER}>
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
};
