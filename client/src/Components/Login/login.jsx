import { Form } from "./form";
import { Link } from "react-router-dom";
import ROUTES from "../../constants/routes";
import { NavBar } from "../navBar/navBar";
import "./styles/login.style.scss";
export const LoginPage = () => {
  return (
    <>
      <NavBar />
      <div className="login-page">
        <div className="login-container">
          <Form />
          <p>Don't have an account? </p>
          <Link className="link" to={ROUTES.REGISTER}>
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
};
