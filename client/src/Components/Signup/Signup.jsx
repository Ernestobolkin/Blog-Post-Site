import { useState } from "react";
import "../Login/styles/login.style.scss";
import { NavBar } from "../navBar/navBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const RegisterPage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    name === "email" && setRegister({ ...register, email: value });
    name === "psw" && setRegister({ ...register, password: value });
    name === "uname" && setRegister({ ...register, name: value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    let config = {
      method: "post",
      url: "http://localhost:8080/user/add",
      data: register,
    };
    axios(config)
      .then(({ data }) => {
        setIsLoggedIn(true);
        navigate("/home");
        console.log("registerd");
        window.localStorage.setItem("token", data.token);
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log("Error");
      });
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
