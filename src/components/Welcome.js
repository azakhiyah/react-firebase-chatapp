import React, {useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  getAuth
} from "firebase/auth";
import { toast } from "react-toastify";

const Welcome = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("login");
  const auth = getAuth(); // Initialize the Auth instance


  const emailLogIn = async (e) => {
    e.preventDefault();
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    
    console.log(signInMethods);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully");
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        toast.error("Wrong Email/Password");
      } else {
        toast.error(error.message);
      }
    }
  };

  const emailSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      toast.success("Signup successful");
      setActiveTab("login");
    } catch (error) {
      // Improved error handling
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already registered, please login");
      } else {
        toast.error("An error occurred during sign up. Please try again.");
      }
    }
  };

  return (
    <main className="welcome">
      <div className="sign-in-frame">
        <h2>Welcome</h2>
        <h2>React-Firebase Chat</h2>
        <img src="/logo512.png" alt="ReactJs logo" width={50} height={50} />
        <p>Start chatting with your partner</p>

        <div className="tab-menu">
          <button
            className={`tab-button ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`tab-button ${activeTab === "sign" ? "active" : ""}`}
            onClick={() => setActiveTab("sign")}
          >
            Sign Up
          </button>
        </div>

        {activeTab === "login" && (
          <form onSubmit={emailLogIn} className="sign-in-form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" onClick={emailLogIn} className="email-sign-in">
              Login
            </button>
            {/* <button type="button" onClick={googleSignIn} className="google-sign-in-button">
              Login with Google
            </button> */}
          </form>
        )}

        {activeTab === "sign" && (
          <form onSubmit={emailSignUp} className="sign-up-form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="email-sign-up">
              Sign Up
            </button>
            {/* <div className="divider">
              <span>OR</span>
            </div>
            <div className="google-sign-in" onClick={googleSignIn}>
              <img src={GoogleSignin} alt="sign in with Google" />
            </div> */}
          </form>
        )}
      </div>
    </main>
  );
};

export default Welcome;
