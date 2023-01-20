import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { UserContext } from "./App";


function RoutesComp() {
  const userContext = useContext(UserContext);
  console.log(userContext);
  return (
    <>
      <Routes>
        {userContext.email && (
          <Route path="/" element={<Home />} />
        )}
        {!userContext.email && (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default RoutesComp;
