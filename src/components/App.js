/**
 * @fileoverview Contains the entry-point code.
 */
import React from "react";
import "../css/App.css";


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      message: ""
    };
  }

  setUUID(uuid) {
    return;
  }

  getUUID() {
    return;
  }

  setMessage(message) {
    return;
  }

  render() {
    return (
      <div className="App">
        <p>Hello</p>
      </div>
    );
  }
}

export default App;
