import { LoginPage } from "../Components/Login/login";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../Components/HomePage";
import ROUTES from "../constants/routes";
import { RegisterPage } from "../Components/Signup/Signup";
import { UserProfile } from "../Components/HomePage/components/userPage/userPage";
import { useEffect, useState } from "react";
import { useUserAuth } from "./useInit/init";
import "./style/normalize.css";
import {
  LogOutContext,
  PostsContext,
  UserDataContext,
} from "./context/context";
import "./style/app.style.scss";
import myApi from "./api/myApi";
import { NavBar } from "../Components/navBar/navBar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });
  const authMW = useUserAuth();

  const getData = () => {
    let config = {
      method: "get",
      url: "/posts",
      data: "",
    };
    myApi(config)
      .then(({ data }) => {
        setPostsData(data);
      })
      .catch((error) => {
        console.log(error.message);
        console.log("Error");
      });
  };

  useEffect(() => {
    getData();
    if (authMW[0]) {
      setUserData({
        ...userData,
        email: authMW[1].email,
        name: authMW[1].name,
      });
      setIsLoggedIn(true);
    }
  }, [authMW[0]]); // eslint-disable-line

  const logOut = () => setIsLoggedIn(false);

  return (
    <>
      <LogOutContext.Provider value={{ logOut, isLoggedIn }}>
        <PostsContext.Provider value={{ postsData }}>
          <UserDataContext.Provider value={{ userData }}>
            <NavBar setUserData={setUserData} />
            <Routes>
              <Route
                path={ROUTES.USER_POST_PAGE}
                element={
                  <UserProfile getData={getData} postsData={postsData} />
                }
              />
              <Route
                path={ROUTES.LOGIN}
                element={
                  <LoginPage
                    setUserData={setUserData}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                }
              />
              <Route
                path={ROUTES.REGISTER}
                element={<RegisterPage setIsLoggedIn={setIsLoggedIn} />}
              />
              <Route
                path={ROUTES.TRAILING_PATH}
                element={<HomePage getData={getData} />}
              />
            </Routes>
          </UserDataContext.Provider>
        </PostsContext.Provider>
      </LogOutContext.Provider>
    </>
  );
}

export default App;
