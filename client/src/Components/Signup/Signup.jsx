import { useState } from "react";
import "../Login/styles/login.style.scss";
import { NavBar } from "../navBar/navBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
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
        let name = data.user.name.charAt(0).toUpperCase() + data.user.name.slice(1);
        window.localStorage.setItem("token", data.token);
        window.localStorage.setItem("userName",name);
        window.localStorage.setItem("email", data.user.email);
        navigate("/home");
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log(error);
        console.log("Error");
      });
  };

  return (
    <>
      <NavBar />
      <div className="register-page">
        <div className="register-container">
          <form className="form-container">
            <br />
            <TextField
              style={{
                width: "225px",
                backgroundColor: "white",
                borderRadius: "5px",
              }}
              className="outlined-required"
              label="Username"
              size="small"
              onChange={handleChange}
              value={register.name}
              type="text"
              placeholder="Enter Username"
              name="uname"
              required
            />
            <br />
            <TextField
              style={{
                width: "225px",
                backgroundColor: "white",
                borderRadius: "5px",
              }}
              className="outlined-required"
              label="Email"
              size="small"
              onChange={handleChange}
              value={register.email}
              type="email"
              placeholder="Enter Email"
              name="email"
              required
            />
            <br />
            <TextField
              style={{
                width: "225px",
                backgroundColor: "white",
                borderRadius: "5px",
              }}
              className="outlined-adornment-password-required"
              label="Password"
              size="small"
              onChange={handleChange}
              type="password"
              value={register.password}
              placeholder="Enter Password"
              name="psw"
              minLength="8"
              required
            />
            <br />
            <br />
            <Button onClick={handleClick} variant="contained">
              Register
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
