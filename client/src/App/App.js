import { LoginPage } from "../Components/Login/login";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../Components/HomePage";
import ROUTES from "../constants/routes";
import { RegisterPage } from "../Components/Signup/Signup";
import { UserProfile } from "../Components/HomePage/components/userPage/userPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/post/*" element={<UserProfile />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.TRAILING_PATH} element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
