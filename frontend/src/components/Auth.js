import React, { useState } from 'react';
import styles from './Auth.module.css';

function Auth() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const handleSignUpClick = () => setIsRightPanelActive(true);
  const handleSignInClick = () => setIsRightPanelActive(false);

  return (
    <div className={`${styles.container} ${isRightPanelActive ? styles.rightPanelActive : ''}`}>
      {/* Sign-In Form */}
      <div className={`${styles.formContainer} ${styles.signInContainer}`}>
        <form>
          <h1>Sign In</h1>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <a href="#">Forgot your password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>

      {/* Sign-Up Form */}
      <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
        <form>
          <h1>Create Account</h1>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      {/* Overlay Panels */}
      <div className={styles.overlayContainer}>
        <div className={styles.overlay}>
          <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
            <h1>Welcome Back!</h1>
            <p>Login with your personal info to stay connected</p>
            <button className={styles.ghost} onClick={handleSignInClick}>
              Sign In
            </button>
          </div>
          <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
            <h1>Hello, Friend!</h1>
            <p>Enter your details to start your journey</p>
            <button className={styles.ghost} onClick={handleSignUpClick}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
