import { LoginPage } from "../Components/Login/login";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../Components/HomePage";
import ROUTES from "../constants/routes";
import { RegisterPage } from "../Components/Signup/Signup";
import { UserProfile } from "../Components/HomePage/components/userPage/userPage";
import { useEffect, useState } from "react";
import { useUserAuth } from "./useInit/init";
import {
  LogOutContext,
  PostsContext,
} from "./context/context";
import axios from "axios";
import "./style/app.style.scss";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [postsData, setPostsData] = useState([]);
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
  }, [loggedIn]); // eslint-disable-line

  const logOut = () => setIsLoggedIn(false);

  return (
    <>
      <LogOutContext.Provider value={{ logOut, isLoggedIn }}>
        <PostsContext.Provider value={{ postsData }}>
        
            <Routes>
              <Route path="/post/*" element={<UserProfile getData={getData} postsData={postsData} />}/>
              <Route
                path={ROUTES.LOGIN}
                element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
              />
              <Route
                path={ROUTES.REGISTER}
                element={<RegisterPage setIsLoggedIn={setIsLoggedIn} />}
              />
              <Route path={"/*"} element={<HomePage getData={getData} />} />
            </Routes>
       
        </PostsContext.Provider>
      </LogOutContext.Provider>
    </>
  );
}

export default App;
