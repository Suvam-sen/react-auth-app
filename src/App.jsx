import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { auth } from "./utils/firebase";
import { addUser, removeUser } from "./store/userSlice";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in → store user data and navigate
        dispatch(
          addUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
        );
        navigate("/dashboard");    // Navigate to dashboard
      } else {
        // User is logged out → clear data and navigate to login
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();   // Cleanup listener on unmount
  }, [dispatch, navigate]);

  return (
    <div className="app min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element= {<Dashboard />}
        />
      </Routes>
    </div>
  );
};

export default App;
