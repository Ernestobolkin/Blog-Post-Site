import { LoginPage } from "../Components/Login/login";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../Components/HomePage";
import ROUTES from "../constants/routes";
import { RegisterPage } from "../Components/Signup/Signup";
import { UserProfile } from "../Components/HomePage/components/userPage/userPage";
import { useEffect, useState } from "react";
import { useUserAuth } from "./useInit/init";
import { LogOutContext, PostsContext } from "./context/context";
import axios from "axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [postsData, setPostsData] = useState(null);
  const loggedIn = useUserAuth();

  const getData = () => {
    let config = {
      method: "get",
      url: "http://localhost:8080/posts",
      data: "",
    };
    axios(config)
      .then(({ data }) => {
        setPostsData(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
        console.log("Error");
      });
  };

  useEffect(() => {
    getData();
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, [loggedIn]);

  const logOut = () => setIsLoggedIn(false);

  return (
    <>
      <LogOutContext.Provider value={{ logOut, isLoggedIn }}>
        <PostsContext.Provider value={{ postsData, setPostsData }}>
          <Routes>
            <Route path="/post/*" element={<UserProfile />} />
            <Route
              path={ROUTES.LOGIN}
              element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path={ROUTES.REGISTER}
              element={<RegisterPage setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path={ROUTES.TRAILING_PATH} element={<HomePage />} />
          </Routes>
        </PostsContext.Provider>
      </LogOutContext.Provider>
      ƒ
    </>
  );
}

export default App;
