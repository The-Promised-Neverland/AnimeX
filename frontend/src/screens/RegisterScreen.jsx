import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { register } from "../actions/Actions";
import "./LoginCSS.css";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    navigate("/");
    dispatch(register({ email, password, displayName, phoneNumber, photoURL }));
  };

  const handleMouseMove = (event) => {
    const x = (event.clientX * 100) / window.innerWidth + "%";
    const y = (event.clientY * 100) / window.innerHeight + "%";
    setCursorPosition({ x, y });
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
              <p>Register using social media to get quick access</p>
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
                <h1>Register your account</h1>
              </div>
              <form onSubmit={submitHandler}>
              <label htmlFor="displayName">
                  <input
                    id="displayName"
                    name="displayName"
                    type="displayName"
                    placeholder=""
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                  <span className={displayName ? "focus-span" : ""}>Name</span>
                </label>

                <label htmlFor="email">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder=""
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span className={email ? "focus-span" : ""}>Email</span>
                </label>

                <label htmlFor="password">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder=""
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className={password ? "focus-span" : ""}>Password</span>
                </label>

                <label htmlFor="phone">
                  <input
                    id="phone"
                    name="phone"
                    type="phone"
                    placeholder=""
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <span className={phoneNumber ? "focus-span" : ""}>Phone Number</span>
                </label>

                <label htmlFor="photo">
                  <input
                    id="photo"
                    name="photo"
                    type="photo"
                    placeholder=""
                    onChange={(e) => setPhotoURL(e.target.value)}
                  />
                  <span className={photoURL ? "focus-span" : ""}>Profile Photo link</span>
                </label>

                

                
                <input type="submit" value="Register" />
              </form>
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

export default RegisterScreen;
