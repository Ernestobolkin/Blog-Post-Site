import { LoginPage } from "../Components/Login/login";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../Components/HomePage";
import ROUTES from "../constants/routes";
import { RegisterPage } from "../Components/Signup/Signup";
import { UserProfile } from "../Components/HomePage/components/userPage/userPage";
import { useEffect, useState } from "react";
import { useUserAuth } from "./useInit/init";
import { LogOutContext } from "./context/context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loggedIn = useUserAuth();
  useEffect(() => {
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, [loggedIn]);

  const logOut = () => setIsLoggedIn(false);

  return (
    <>
      <LogOutContext.Provider value={{ logOut, isLoggedIn }}>
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
      </LogOutContext.Provider>
      ƒ
    </>
  );
}

export default App;
