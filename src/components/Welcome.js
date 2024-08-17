import React, {useState } from "react";
import ReactModal from "react-modal";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail
} from "firebase/auth";
import { toast } from "react-toastify";

const Welcome = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("login");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const auth = getAuth(); // Initialize the Auth instance


  const emailLogIn = async (e) => {
    e.preventDefault();
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
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already registered, please login");
      } else {
        toast.error("An error occurred during sign up. Please try again.");
      }
    }
  };

  const forgotPassword = async () => {
    if (!resetEmail) {
      toast.error("Please enter your email address first");
      return;
    }
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, resetEmail);

      if (signInMethods.length > 0) {
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success("Password reset email sent!");
      } else {
      toast.error("Email not registered.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


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
            <button type="button" onClick={openModal}>
              Reset Password
            </button>
            <ReactModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Password Reset Modal"
          ariaHideApp={false}
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)'
            }
          }}
        >
          <h2>Reset Password</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
          />
          <button onClick={forgotPassword}>Reset Password</button>
          <button onClick={closeModal}>Cancel</button>
        </ReactModal>
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
