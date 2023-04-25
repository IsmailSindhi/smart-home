import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="p-4 box flex flex-col items-center justify-center">
        <h2 className="mb-3 font-bold text-blue-500 text-lg">Firebase Auth Signup</h2>
        {error && alert(error)}
        <form className="flex flex-col items-center justify-center gap-3" onSubmit={handleSubmit}>
          {/* <Form.Group className="mb-3" controlId="formBasicEmail"> */}
            <input
              type="email"
              className="bg-blue-100 text-blue-700 font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
              
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="bg-blue-100 text-blue-700 font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
              
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

          <div className="d-grid gap-2">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " type="Submit">
              Sign up
            </button>
          </div>
        </form>
      </div>
      <div className="p-4 box mt-3 text-center">
        Already have an account? <Link className="hover:text-blue-600 text-lg" to="/">Log In</Link>
      </div>
    </>
  );
};

export default Signup;
