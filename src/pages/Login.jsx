import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";


const Login = () => {
  const [loginErrors, setLoginErrors] = useState({})

  const email = useRef(null)
  const password = useRef(null)

  const handleLogin = async (e) => {
    e.preventDefault();

    const validErrors = formValidation(email.current.value, password.current.value)
    if(validErrors) return setLoginErrors(validErrors)

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        console.log(userCredential.user)
        setLoginErrors({})
      } catch (error) {
        setLoginErrors({
          code: error.code,
          message: error.message,
        });
      }
      console.log(loginErrors);
      
    }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-blue-200">
      <div className="w-100 bg-white p-8 flex flex-col gap-10 rounded-3xl">
        <h2 className="text-center font-bold text-2xl">Login Page</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label>Email</label>
            <input
              className="p-2 border rounded-xl"
              placeholder="Enter your email"
              type="email"
              ref={email}
            />
              {loginErrors.email && <p className="text-red-500">{loginErrors.email}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label>Password</label>
            <input
              className="p-2 border rounded-xl"
              placeholder="Enter your password"
              type="password"
              ref={password}
            />
              {loginErrors.password && <p className="text-red-500">{loginErrors.password}</p>}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-xl w-40 mx-auto cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-center">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-blue-500 cursor-pointer">Register</Link>
        </p>

        {loginErrors.code && (
          <p className="text-red-500">{`${loginErrors.code} - ${loginErrors.message}`}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
