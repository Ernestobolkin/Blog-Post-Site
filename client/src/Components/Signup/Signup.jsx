import { useState } from "react";
import "../Login/styles/login.style.scss";
import { NavBar } from "../navBar/navBar";
export const RegisterPage = () => {
  const [login, setLogin] = useState({
    uname: "",
    email: "",
    password: "",
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    name === "email" && setLogin({ ...login, email: value });
    name === "psw" && setLogin({ ...login, password: value });
    name === "uname" && setLogin({ ...login, uname: value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    // todo add an axios post method to the server and verify the user
    console.log(login);
  };

  return (
    <>
      <NavBar />
      <div className="register-page">
        <div className="register-container">
          <form className="form-container">
            <label className="label" htmlFor="uname">
              <b>Username</b>
            </label>
            <input
              className="input"
              onChange={handleChange}
              type="text"
              placeholder="Enter Username"
              name="uname"
              required
            />
            <label className="label" htmlFor="email">
              <b>Email</b>
            </label>
            <input
              className="input"
              onChange={handleChange}
              type="text"
              placeholder="Enter Username"
              name="email"
              required
            />
            <label className="label" htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              className="input"
              onChange={handleChange}
              type="password"
              placeholder="Enter Password"
              name="psw"
              minLength="8"
              required
            />
            <button className="btn" onClick={handleClick} type="submit">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
