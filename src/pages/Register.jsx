import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import formValidation from "../utils/formValidation";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [registerErrors, setRegisterErrors] = useState({})

  const username = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    const validErrors = formValidation(
      username.current.value,
      email.current.value,
      password.current.value
    );

    if (validErrors) return setRegisterErrors(validErrors)

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      );
      console.log(userCredential.user);
      setRegisterErrors({});
    } catch (error) {
      setRegisterErrors({
        code: error.code,
        message: error.message,
      });
    }

    console.log(registerErrors);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-blue-200">
      <div className="w-100 bg-white p-8 flex flex-col gap-10 rounded-3xl">
        <h2 className="text-center font-bold text-2xl">Register Page</h2>

        <form onSubmit={handleRegister} noValidate className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label>Username</label>
            <input
              className="p-2 border rounded-xl"
              placeholder="Enter your username"
              type="text"
              ref={username}
            />
            {registerErrors.username && (
              <p className="text-red-500">{registerErrors.username}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label>Email</label>
            <input
              className="p-2 border rounded-xl"
              placeholder="Enter your email"
              type="email"
              ref={email}
            />
            {registerErrors.email && <p className="text-red-500">{registerErrors.email}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label>Password</label>
            <input
              className="p-2 border rounded-xl"
              placeholder="Enter your password"
              type="password"
              ref={password}
            />
            {registerErrors.password && (
              <p className="text-red-500">{registerErrors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-xl w-40 mx-auto cursor-pointer"
          >
            Register
          </button>
        </form>

        <p className="text-center">
          Already have an account?{" "}
          <Link to={"/"} className="text-blue-500 cursor-pointer">
            Login
          </Link>
        </p>
        {registerErrors.code && (
          <p className="text-red-500">{`${registerErrors.code} - ${registerErrors.message}`}</p>
        )}
      </div>
    </div>
  );
};

export default Register;