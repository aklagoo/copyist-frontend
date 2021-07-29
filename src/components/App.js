import React from "react";
import "../css/App.css";

/**
 * @classdesc This component manages socket communication and data storage.
 * @extends React.Component
 */
class App extends React.Component {
  constructor() {
    super();
    this.state = {
        message: "",
        uuid: null
    };
  }

  setUUID(uuid) {
    
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
