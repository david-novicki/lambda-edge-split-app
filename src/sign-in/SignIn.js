import React, { Component } from "react";

class SignIn extends Component {
  onSignIn() {
    console.log("signing in");
    document.cookie = "session-id=test;";
    window.location.replace("https://-/private/");
  }
  render() {
    return (
      <div>
        <header>
          <h1>Please sign in</h1>
        </header>
        <p>To get started, please sign in.</p>
        <input type="text" />
        <input type="password" />
        <button onClick={this.onSignIn.bind(this)}>Sign In</button>
      </div>
    );
  }
}

export default SignIn;
