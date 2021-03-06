import { useContext, useState } from "react";
import "../Login/styles/login.style.scss";
import myApi from "../../App/api/myApi";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import ROUTES from "../../constants/routes";
import { ErrorMsg } from "../ErrorSnackBar/error";
import { UserDataContext } from "../../App/context/context";

export const RegisterPage = ({ setIsLoggedIn, setUserData }) => {
  const navigate = useNavigate();
  const { userData } = useContext(UserDataContext);
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const [logged, setLogged] = useState(false);
  const [isSendData, setIsSendData] = useState(false);

  const [msg, setMsg] = useState({
    logged: "",
    err: "",
    time: null,
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    name === "email" && setRegister({ ...register, email: value });
    name === "psw" && setRegister({ ...register, password: value });
    name === "uname" && setRegister({ ...register, name: value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsSendData(false);
    if (register.password.length <= 8) {
      setError(true);
      setMsg({
        ...msg,
        err: "The password must be more than 8 characters",
        time: 3000,
      });
    } else {
      setIsSendData(true);
    }
    let config = {
      method: "post",
      url: "/user/add",
      data: register,
    };

    isSendData &&
      myApi(config)
        .then(({ data }) => {
          setLogged(true);
          setIsLoggedIn(true);
          let name =
            data.user.name.charAt(0).toUpperCase() + data.user.name.slice(1);
          window.localStorage.setItem("token", data.token);
          setUserData({ ...userData, email: data.user.email, name });
          setMsg({ ...msg, logged: `Welcome ${name}` });
          setTimeout(() => {
            navigate(ROUTES.TRAILING_PATH);
          }, 1000);
        })
        .catch((error) => {
          setError(true);
          setMsg({
            ...msg,
            err: "Somthing went Wrong, Please check the fields, might be the email",
            time: 3000,
          });
          console.dir(error);
          console.log("Error");
        });
  };

  return (
    <>
      {logged && (
        <ErrorMsg string={msg.logged} setMsg={setLogged} type={"success"} />
      )}
      {error && (
        <ErrorMsg
          string={msg.err}
          setMsg={setError}
          type={"error"}
          time={msg.time}
        />
      )}
      <form onSubmit={handleChange}>
        <div className="register-page">
          <div className="register-container">
            <h2 style={{ margin: "0px auto 2rem auto" }}>Sign up</h2>
            <form className="form-container" onSubmit={handleClick}>
              <br />
              <TextField
                style={{
                  width: "225px",
                  backgroundColor: "white",
                  borderRadius: "5px",
                }}
                className="outlined-required"
                label="Full Name"
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
              <div style={{ textAlign: "center" }}>
                <p>Have an account?</p>
                <Link className="link" to={ROUTES.LOGIN}>
                  Login
                </Link>
              </div>
              <br />
              <Button onClick={handleClick} type="submit" variant="contained">
                Register
              </Button>
            </form>
          </div>
        </div>
      </form>
    </>
  );
};
