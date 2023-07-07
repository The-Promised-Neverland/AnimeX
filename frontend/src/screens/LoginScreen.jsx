import React, { useState } from "react";
import "./LoginCSS.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../actions/Actions";

const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmailFocused] = useState("");
  const [password, setPasswordFocused] = useState("");
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    const x = (event.clientX * 100) / window.innerWidth + "%";
    const y = (event.clientY * 100) / window.innerHeight + "%";
    setCursorPosition({ x, y });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/");
    dispatch(login({ email, password }));
  };

  return (
    <div className="wrapper" onMouseMove={handleMouseMove}>
      <main className="login-main">
        <section>
          <div className="face">
            <img
              src="https://assets.codepen.io/9277864/PF.png"
              alt="Face"
              width="250"
              height="250"
            />
            <div className="eye-cover1">
              <div
                style={{
                  left: cursorPosition.x,
                  top: cursorPosition.y,
                  transform: `translate(-${cursorPosition.x}, -${cursorPosition.y})`,
                }}
                id="eyes1"
              ></div>
            </div>

            <div className="eye-cover2">
              <div
                style={{
                  left: cursorPosition.x,
                  top: cursorPosition.y,
                  transform: `translate(-${cursorPosition.x}, -${cursorPosition.y})`,
                }}
                id="eyes2"
              ></div>
            </div>
          </div>

          <div className="login-container">
            <div className="social-login">
              <div className="logo">
                <img
                  src="https://assets.codepen.io/9277864/robot-face-3.svg"
                  alt="Animechan"
                  width="100"
                  height="100"
                />
                <p>Animechan</p>
              </div>
              <p>Login using social media to get quick access</p>
              <div className="social-grp">
                <div className="loginBtn">
                  <a href="#">
                    <img
                      src="https://assets.codepen.io/9277864/social-media-twitter.svg"
                      alt=""
                      width="32"
                      height="32"
                    />
                    <span>Twitter</span>
                  </a>
                </div>
                <div className="loginBtn">
                  <a href="#">
                    <img
                      src="https://assets.codepen.io/9277864/social-media-facebook.svg"
                      alt=""
                      width="32"
                      height="32"
                    />
                    <span>Facebook</span>
                  </a>
                </div>
                <div className="loginBtn">
                  <a href="#">
                    <img
                      src="https://assets.codepen.io/9277864/social-media-google.svg"
                      alt=""
                      width="32"
                      height="32"
                    />
                    <span>Google</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="email-login">
              <div className="login-h-container">
                <h1>Login to your account</h1>
              </div>
              <form onSubmit={submitHandler}>
                <label htmlFor="email">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder=""
                    autoComplete="off"
                    onChange={(e) => setEmailFocused(e.target.value)}
                  />
                  <span className={email ? "focus-span" : ""}>Email</span>
                </label>

                <label htmlFor="password">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder=""
                    onChange={(e) => setPasswordFocused(e.target.value)}
                  />
                  <span className={password ? "focus-span" : ""}>Password</span>
                </label>

                <div className="recovery">
                  <div>
                    <input type="checkbox" id="remember" name="remember" />
                    <label htmlFor="remember">Remember me</label>
                  </div>
                  <a href="">Forgot Password?</a>
                </div>

                <input type="submit" value="Login with Firebase Auth" />
              </form>

              <Button
                style={{
                  backgroundColor: "skyBlue",
                  padding: "10px 120px",
                  color: "#fff",
                  fontSize: "20px",
                  border: "1px solid transparent",
                  borderRadius: "3px",
                  margin: "30px auto",
                  boxShadow: "0.3rem 0.3rem #111827",
                  cursor: "pointer",
                  transitionDuration: "0.2s",
                  display: "flex",
                }}
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </div>
          </div>
        </section>
        <div className="vector-1"></div>
        <div className="vector-2"></div>
        <div className="vector-3"></div>
      </main>
    </div>
  );
};

export default LoginScreen;
