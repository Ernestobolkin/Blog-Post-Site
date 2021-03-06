import { useContext, useState } from "react";
import myApi from "../../App/api/myApi";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import ROUTES from "../../constants/routes";
import { ErrorMsg } from "../ErrorSnackBar/error";
import { UserDataContext } from "../../App/context/context";

export const Form = ({ setIsLoggedIn, setUserData }) => {
  const navigate = useNavigate();
  const { userData } = useContext(UserDataContext);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const [logged, setLogged] = useState(false);

  const [msg, setMsg] = useState({
    logged: "",
    err: "Please check your email and password",
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
      url: "/user/login",
      data: login,
    };
    myApi(config)
      .then(({ data }) => {
        setLogged(true);
        setIsLoggedIn(true);
        let name = data[1].name.charAt(0).toUpperCase() + data[1].name.slice(1);
        window.localStorage.setItem("token", data[2]);
        setUserData({ ...userData, email: data[1].email, name });
        setMsg({ ...msg, logged: `Welcome Back ${name}` });
        setTimeout(() => {
          navigate(ROUTES.TRAILING_PATH);
        }, 2000);
      })
      .catch((error) => {
        setError(true);
        console.log(error);
        console.log("Error");
      });
  };

  return (
    <>
      {logged && (
        <ErrorMsg string={msg.logged} setMsg={setLogged} type={"success"} />
      )}
      {error && <ErrorMsg string={msg.err} setMsg={setError} type={"error"} />}
      <form className="form-container" onSubmit={handleClick}>
        <h2 style={{ margin: "0px auto 2rem auto" }}>Login</h2>
        <TextField
          style={{
            width: "225px",
            backgroundColor: "white",
            borderRadius: "5px",
          }}
          required
          value={login.email}
          placeholder="Enter Your Email"
          type="email"
          id="outlined-required"
          name="email"
          onChange={handleChange}
          label="Email"
          size="small"
        />
        <br />
        <TextField
          style={{ backgroundColor: "white", borderRadius: "5px" }}
          required
          value={login.password}
          id="outlined-adornment-password-required"
          placeholder="Enter Your Password"
          type="password"
          name="psw"
          size="small"
          onChange={handleChange}
          label="Password"
        />
        <br />
        <Button
          style={{ margin: "0px auto" }}
          size="medium"
          variant="contained"
          onClick={handleClick}
          type="submit"
        >
          Login
        </Button>
      </form>
    </>
  );
};
