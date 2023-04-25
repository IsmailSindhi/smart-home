import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";
import { getRedirectResult } from "firebase/auth";
import { auth } from "../firebase";
const Login = () => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error.message);
    }
  };
  
  useEffect(() => {
    async function result (){
      try{

        const response = await getRedirectResult(auth);
        if(response){
          navigate("/home");
          
        }else{
          setLoading(false)
          
        }
        
      } catch (error) {
        setLoading(false)
        console.log(error.message)
      }
    }
    result()
    console.log(loading)
  },[loading,navigate])

  return ( loading ?<div className="flex items-center justify-center ">
  <div className="w-40 h-40 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
</div> :
    <>
      <div className="p-4 box flex flex-col items-center justify-center ">
        <h2 className="mb-3 font-bold text-blue-500 text-lg">Firebase Auth Login</h2>
        {error && alert({error})}
        <form className="flex flex-col items-center justify-center gap-3" onSubmit={handleSubmit}>
            <input
              className="bg-blue-100 text-blue-700 font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              />

            <input
              className="bg-blue-100 text-blue-700 font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " type="Submit">
              Log In
            </button>
        </form>
        <hr />
        <div className="mt-5">
          <button
            onClick={handleGoogleSignIn}
          >
            Sign In With Google
          {/* <GoogleButton
            className=""
            type="dark"
            /> */}
            </button>
        </div>
      </div>
      <div className="p-4 box mt-3 text-center">
        Don't have an account? <Link className="hover:text-blue-600 text-lg" to="/signup">Sign up</Link>
      </div>
    </>
  );
};

export default Login;
