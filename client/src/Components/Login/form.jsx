import { useState } from "react";
import "./styles/login.style.scss";

export const Form = () => {
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
    // todo add an axios post method to the server and verify the user
    console.log(login);
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
