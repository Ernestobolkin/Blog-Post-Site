import { useState } from "react";
import "./styles/login.style.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Form = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    name === "email" && setLogin({ ...login, email: value });
    name === "psw" && setLogin({ ...login, password: value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    let config = {
      method: "post",
      url: "http://localhost:8080/user/login",
      data: login,
    };
    axios(config)
      .then(({ data }) => {
        navigate("/home");
        setIsLoggedIn(true);
        tokenToLocalStorage(data[2]);
      })
      .catch((error) => {
        console.log(error);
        console.log("Error");
      });
  };

  const tokenToLocalStorage = (token) => {
    window.localStorage.setItem("token", token);
  };

  return (
    <>
      <form className="form-container">
        <label className="label" htmlFor="email">
          <b>Email</b>
        </label>
        <input
          className="input"
          onChange={handleChange}
          type="email"
          placeholder="Enter Email"
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
          required
        />
        <button className="btn" onClick={handleClick} type="submit">
          Login
        </button>
      </form>
    </>
  );
};
