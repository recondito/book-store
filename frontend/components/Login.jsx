import React from "react";
import "../styles.css";

const Login = () => {
  return (
    <div class="loginContainer">
      <h1>Login</h1>
      <form>
        <label>
          Username
          <input type="text" name="name" />
        </label>
        <label>
          Password
          <input type="password" name="password" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
